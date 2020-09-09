import React from 'react';
import PropTypes from 'prop-types';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

import { CONTAINER, TEXT } from './styles';

export default function Slider({ submit, value, max, min, step, firstText, lastText }) {
   return (
      <CONTAINER>
         <TEXT>{firstText || null}</TEXT>
         <RangeSlider
            value={value}
            step={step || 1}
            max={max || 100}
            min={min || 1}
            onChange={changeEvent => submit(changeEvent.target.value)}
            className="range-slider range-slider--dark"
         />
         <TEXT>{lastText || null}</TEXT>
      </CONTAINER>
   );
}

Slider.propTypes = {
   submit: PropTypes.func.isRequired,
   value: PropTypes.number.isRequired,
   max: PropTypes.number.isRequired,
   min: PropTypes.number,
   step: PropTypes.number,
   firstText: PropTypes.string,
   lastText: PropTypes.string,
};

Slider.defaultProps = {
   min: null,
   step: null,
   firstText: null,
   lastText: null,
};
