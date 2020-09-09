/* eslint-disable no-lonely-if, no-unused-expressions  */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import FiAlertCircle from '@meronex/icons/fi/FiAlertCircle';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import makeAnimated from 'react-select/animated';

import { DIV, FORMGROUP, INPUT, INPUTGROUP, INPUTGROUPTEXT, LABEL, ERROR } from './styles';

const animatedComponents = makeAnimated();

export default function InputSearch({ options, name, icon, defaultValue, isMulti, isLoading, ...rest }) {
   const { fieldName, registerField, error } = useField(name);
   const [isFocused, setIsFocused] = useState(false);
   const [isField, setIsField] = useState(false);
   const [isDefaultValue, setIsDefaultValue] = useState(false);
   const [value] = useState();
   const inputRef = useRef(null);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   useEffect(() => {
      if (defaultValue?.value) {
         inputRef.current.value = defaultValue.value;
         setIsDefaultValue(true);
      }
   }, [defaultValue]);

   const colourStyles = {
      container: provided => ({
         ...provided,
         width: '80%',
         fontSize: 12,
         color: '#000',
         fontFamily: 'Mulish, sans-serif',
         fontWeight: 500,
      }),
      control: styles => ({
         ...styles,
         boxShadow: 'none',
         backgroundColor: 'transparent',
         border: 'none',
         borderColor: 'transparent',
         width: '100%',
         height: 60,
         zIndex: 1,
         fontSize: 14,
         color: '#000',
         fontFamily: 'Mulish, sans-serif',
         fontWeight: 500,
      }),
      multiValue: styles => ({
         ...styles,
         maxWidth: '5ch',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
         whiteSpace: 'nowrap',
      }),
   };

   function handleSubmit(values) {
      if (values?.length > 0) {
         inputRef.current.value = values.map(obj => obj.value).join(',');
      } else {
         // Verifica se é somente escolha de uma unica opção
         if (!isMulti && values !== '' && values !== null && values !== undefined) {
            inputRef.current.value = values.value;
         } else {
            inputRef.current.value = null;
         }
      }
   }

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);
      // quando sair do campo ja tiver algum valor
      if (inputRef.current?.value) {
         setIsField(true);
      } else {
         setIsField(false);
      }
   }, []);

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   return (
      <DIV className="label-float">
         <FORMGROUP isfocused={isFocused} iserrored={!!error} isfield={isField}>
            <INPUTGROUP isfocused={isFocused} isfield={isField || isDefaultValue}>
               <DIV>
                  <INPUTGROUPTEXT isfield={isField} iserrored={!!error}>
                     {error ? (
                        <ERROR title={error}>
                           <FiAlertCircle color="#fff" size={24} />
                        </ERROR>
                     ) : (
                        icon
                     )}
                  </INPUTGROUPTEXT>
               </DIV>
               <INPUT
                  className="select"
                  onChange={values => handleSubmit(values)}
                  components={animatedComponents}
                  styles={colourStyles}
                  closeMenuOnSelect
                  options={options}
                  isLoading={isLoading}
                  ref={inputRef}
                  value={value}
                  isMulti={!!isMulti}
                  placeholder=""
                  defaultValue={isMulti ? null : defaultValue}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
               />
               <LABEL isfocused={isFocused} iserrored={!!error} isfield={isField}>
                  {rest.placeholder}
               </LABEL>
            </INPUTGROUP>
         </FORMGROUP>
      </DIV>
   );
}

InputSearch.propTypes = {
   name: PropTypes.string.isRequired,
   options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
   icon: PropTypes.element.isRequired,
   isMulti: PropTypes.element.isRequired,
   defaultValue: PropTypes.element,
   isLoading: PropTypes.bool,
};

InputSearch.defaultProps = {
   defaultValue: {},
   isLoading: false,
};
