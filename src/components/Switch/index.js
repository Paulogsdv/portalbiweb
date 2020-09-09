import React from 'react';
import PropTypes from 'prop-types';

import { CONTAINER, SWITCH, TEXT } from './styles';

export default function PrecisaSwitch({ submit, check, firstText, lastText }) {
   async function handleSubmit() {
      await submit();
   }

   return (
      <CONTAINER>
         <TEXT>{firstText}</TEXT>
         <SWITCH
            className="react-switch"
            onChange={() => {
               handleSubmit();
            }}
            checked={check}
            checkedIcon={false}
            uncheckedIcon={false}
            height={18}
            width={40}
            handleDiameter={15}
            offHandleColor="#fff"
            onHandleColor="#fff"
            offColor="#0A1433"
            onColor="#21C7C2"
         />
         <TEXT>{lastText}</TEXT>
      </CONTAINER>
   );
}

PrecisaSwitch.propTypes = {
   submit: PropTypes.func,
   check: PropTypes.bool,
   firstText: PropTypes.string.isRequired,
   lastText: PropTypes.string.isRequired,
};

PrecisaSwitch.defaultProps = {
   submit: {},
   check: false,
};
