import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { DIV, INPUT, LABEL } from './styles';

export default function InputCheckbox({ name, id, valueChecked, label, ...rest }) {
   const { fieldName, registerField } = useField(name);
   const [valueCheck, setValueCheck] = useState(valueChecked);
   const inputRef = useRef(null);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   useEffect(() => {
      setValueCheck(valueChecked);
   }, [valueChecked]);

   function handleClick() {
      if (valueCheck === 0) {
         inputRef.current.value = 1;
         setValueCheck(1);
      } else if (valueCheck === 1) {
         inputRef.current.value = 0;
         setValueCheck(0);
      }
   }

   return (
      <DIV>
         <DIV>
            <DIV className="custom-control custom-checkbox">
               <INPUT
                  type="checkbox"
                  ref={inputRef}
                  className="custom-control-input"
                  id={id}
                  name={name}
                  onClick={handleClick}
                  value={valueCheck}
                  {...rest}
               />
               <LABEL className="custom-control-label" htmlFor={id}>
                  {label}
               </LABEL>
            </DIV>
         </DIV>
      </DIV>
   );
}

InputCheckbox.propTypes = {
   name: PropTypes.string.isRequired,
   id: PropTypes.string.isRequired,
   label: PropTypes.string.isRequired,
   valueChecked: PropTypes.string.isRequired,
};
