/* eslint-disable no-unused-expressions, no-return-assign, no-nested-ternary */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import FiAlertCircle from '@meronex/icons/fi/FiAlertCircle';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { DIV, FORMGROUP, INPUTGROUP, INPUTGROUPTEXT, INPUT, ERROR, LABEL } from './styles';

export default function Input({ name, icon, hidden, handlePassword, option, ...rest }) {
   const { fieldName, defaultValue, registerField, error } = useField(name);

   const [isFocused, setIsFocused] = useState(false);
   const [isField, setIsField] = useState(false);

   const inputRef = useRef(null);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
         getValue: ref => {
            const { value } = ref;

            if (option === 'value') {
               return Number(value.replace('.', '').replace(',', '.'));
            }

            return value;
         },
      });
   }, [fieldName, registerField]);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      if (inputRef.current?.value) {
         setIsField(true);
      } else {
         setIsField(false);
      }
   }, []);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   function handleIcon() {
      if (handlePassword) {
         handlePassword();
      }
   }

   function maskValue() {
      let v = inputRef.current.value.replace(/\D/g, '');
      v = `${(v / 100).toFixed(2)}`;
      v = v.replace('.', ',');
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
      v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
      return (inputRef.current.value = v);
   }

   function maskDate() {
      const v = inputRef.current.value;
      if (v.match(/^\d{2}$/) !== null) {
         return (inputRef.current.value = `${v}/`);
      }
      if (v.match(/^\d{2}\/\d{2}$/) !== null) {
         return (inputRef.current.value = `${v}/`);
      }
      return '';
   }

   function maskPercentage() {
      let v = inputRef.current.value.replace(/\D/g, '');
      v = `${(v / 100).toFixed(2)}`;
      v = v.replace('.', ',');
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
      v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
      return (inputRef.current.value = v);
   }

   return (
      <DIV hidden={hidden} className="label-float">
         <FORMGROUP isfocused={isFocused} iserrored={!!error} isfield={isField}>
            <INPUTGROUP>
               <DIV onClick={() => handleIcon()}>
                  <INPUTGROUPTEXT isfocused={isFocused} iserrored={!!error} isfield={isField}>
                     {error ? (
                        <ERROR title={error}>
                           <FiAlertCircle size={24} />
                        </ERROR>
                     ) : (
                        icon
                     )}
                  </INPUTGROUPTEXT>
               </DIV>
               <INPUT
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyUp={() => {
                     option === 'value'
                        ? maskValue()
                        : option === 'date'
                        ? maskDate()
                        : option === 'percentage'
                        ? maskPercentage()
                        : null;
                  }}
                  defaultValue={defaultValue}
                  ref={inputRef}
                  autoComplete="off"
                  {...rest}
               />
               <LABEL isfocused={isFocused} iserrored={!!error} isfield={isField}>
                  {rest.placeholder}
               </LABEL>
            </INPUTGROUP>
         </FORMGROUP>
      </DIV>
   );
}

Input.propTypes = {
   name: PropTypes.string.isRequired,
   icon: PropTypes.element,
   hidden: PropTypes.bool,
   handlePassword: PropTypes.func,
   option: PropTypes.string,
};

Input.defaultProps = {
   icon: null,
   hidden: false,
   handlePassword: null,
   option: null,
};
