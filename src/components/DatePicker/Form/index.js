/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import FiAlertCircle from '@meronex/icons/fi/FiAlertCircle';
import { registerLocale } from 'react-datepicker';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import ptBR from 'date-fns/locale/pt-BR';
import MaskedTextInput from 'react-text-mask';

import { maskDate } from '../../../utils/functions';

import { REACTDATEPICKER, DIV, FORMGROUP, PFiCalendar, INPUTGROUP, INPUTGROUPTEXT, SPAN, ERROR } from './styles';

registerLocale('pt-BR', ptBR);

export default function PrecisaDatePicker({ name, valueDate, filterFirstAndLastDay, filterMonth, ...rest }) {
   const { fieldName, registerField, error } = useField(name);
   const [isFocused, setIsFocused] = useState(false);
   const [isField, setIsField] = useState(false);
   const [startDate, setStartDate] = useState(valueDate || null);
   const datepickerRef = useRef(null);
   const inputRef = useRef(null);

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: datepickerRef.current,
         path: 'props.selected',
         getValue: ref => {
            return maskDate(ref.props.selected);
         },
         clearValue: ref => {
            ref.clear();
         },
      });
   }, [fieldName, registerField]);

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

   const isFirstAndLastDay = date => {
      const day = date.getDate(date);

      // Recebe o ultimo dia do mês
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      // Primeiro dia do mês
      if (day === 1) {
         return true;
      }

      // Verifica se é o ultimo dia do mês
      if (day === lastDay.getDate()) {
         return true;
      }

      return false;
   };

   return (
      <SPAN>
         <FORMGROUP isfocused={isFocused} iserrored={!!error} isfield={isField}>
            <INPUTGROUP>
               <DIV>
                  {error ? (
                     <INPUTGROUPTEXT isfield={isField} iserrored={!!error}>
                        <ERROR title={error}>
                           <FiAlertCircle color="#fff" size={24} />
                        </ERROR>
                     </INPUTGROUPTEXT>
                  ) : (
                     <INPUTGROUPTEXT isfield={!!startDate}>
                        <PFiCalendar color="#aaa" />
                     </INPUTGROUPTEXT>
                  )}
               </DIV>

               <REACTDATEPICKER
                  ref={datepickerRef}
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  dateFormat={filterMonth ? 'MM' : 'dd/MM/yyyy'}
                  locale="pt-BR"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  // withPortal={!filterMonth}
                  peekNextMonth={!filterMonth}
                  showMonthDropdown={!filterMonth}
                  showYearDropdown={!filterMonth}
                  showMonthYearPicker={!!filterMonth}
                  filterDate={filterFirstAndLastDay ? isFirstAndLastDay : null}
                  customInput={
                     <MaskedTextInput type="text" mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]} />
                  }
                  {...rest}
               />
            </INPUTGROUP>
         </FORMGROUP>
      </SPAN>
   );
}

PrecisaDatePicker.propTypes = {
   name: PropTypes.string.isRequired,
   valueDate: PropTypes.instanceOf(Date),
   filterFirstAndLastDay: PropTypes.bool,
   filterMonth: PropTypes.bool,
};

PrecisaDatePicker.defaultProps = {
   valueDate: null,
   filterFirstAndLastDay: false,
   filterMonth: false,
};
