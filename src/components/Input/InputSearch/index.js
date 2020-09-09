import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function InputSearch({ options, name }) {
   const { fieldName, defaultValue, registerField } = useField(name);
   const [value] = useState();
   const inputRef = useRef(null);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: inputRef.current,
         path: 'value',
      });
   }, [fieldName, registerField]);

   const colourStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: 'transparent',
         borderColor: 'transparent',
         borderRadius: 50,
         width: 220,
         height: 46,
         zIndex: 1,
         fontSize: 12,
         boxShadow: 'none',
         '&:hover': {
            border: '1px solid transparent',
         },
      }),
      multiValue: styles => ({
         ...styles,
         backgroundColor: '#21C7C2',
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
         inputRef.current.value = null;
      }
   }

   return (
      <Select
         onChange={values => handleSubmit(values)}
         components={animatedComponents}
         defaultValue={defaultValue}
         styles={colourStyles}
         closeMenuOnSelect
         options={options}
         ref={inputRef}
         value={value}
         isMulti
         placeholder="Procurar"
      />
   );
}

InputSearch.propTypes = {
   name: PropTypes.string.isRequired,
   options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
