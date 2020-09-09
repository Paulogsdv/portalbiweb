/* eslint-disable no-shadow, react/prop-types */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GithubPicker } from 'react-color';
import FiAlertCircle from '@meronex/icons/fi/FiAlertCircle';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { DIV, FORMGROUP, INPUTGROUP, INPUT, ERROR, INPUTGROUPTEXT, SPAN } from './styles';

export default function InputColor({ name, icon, onChange, colorDefault, ...rest }) {
   const { fieldName, defaultValue, registerField, error } = useField(name);
   const [isFocused, setIsFocused] = useState(false);
   const [isField, setIsField] = useState(false);
   const [displayColorPicker, setDisplayColorPicker] = useState(false);
   const [color, setColor] = useState('#FF0');
   const inputRef = useRef(null);

   function handleClick() {
      setDisplayColorPicker(displayColorPicker => !displayColorPicker);
   }

   function handleClose() {
      setDisplayColorPicker(false);
   }

   function handleChange(colors) {
      setColor(colors.hex);
      inputRef.current.value = colors.hex.replace(/[^a-z0-9]/gi, '');
   }

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   useEffect(() => {
      setColor(colorDefault);
   }, [colorDefault]);

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

   const styles = {
      color: {
         width: '15px',
         height: '15px',
         borderRadius: '50px',
         background: `${color || '#FF0'}`,
      },
      swatch: {
         margin: '0px',
         padding: '1px',
         background: '#fff',
         borderRadius: '50px',
         boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
         display: 'inline-block',
         cursor: 'pointer',
      },
      popover: {
         position: 'absolute',
         zIndex: '1',
      },
      cover: {
         position: 'fixed',
         top: '0px',
         right: '0px',
         bottom: '0px',
         left: '0px',
      },
   };

   return (
      <DIV className="label-float">
         <FORMGROUP isfocused={isFocused} iserrored={!!error} isfield={isField}>
            <INPUTGROUP>
               {error ? (
                  <INPUTGROUPTEXT isfield={isField} iserrored={!!error}>
                     <ERROR title={error}>
                        <FiAlertCircle color="#fff" size={24} />
                     </ERROR>
                  </INPUTGROUPTEXT>
               ) : null}
               <SPAN>
                  <DIV style={styles.swatch} onClick={handleClick}>
                     <DIV style={styles.color} />
                  </DIV>
                  {displayColorPicker ? (
                     <DIV style={styles.popover}>
                        <DIV style={styles.cover} onClick={handleClose} />
                        <GithubPicker color={color} onChange={handleChange} width="100%" />
                     </DIV>
                  ) : null}
               </SPAN>
               <INPUT
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  ref={inputRef}
                  defaultValue={defaultValue}
                  {...rest}
                  readOnly
               />
            </INPUTGROUP>
         </FORMGROUP>
      </DIV>
   );
}

InputColor.propTypes = {
   name: PropTypes.string.isRequired,
};
