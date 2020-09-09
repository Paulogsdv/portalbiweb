import React from 'react';

import { FOOTER, ROW, NAV, NAVITEM, NAVLINK } from './styles';
import { getPackageJsonInfo } from '../../utils/functions';

export default function Footer() {
   return (
      <FOOTER className="footer">
         <ROW>
            <NAV>
               <NAVITEM>
                  <NAVLINK className="text-center" href="http://www.precisasoftware.com/" target="_blank">
                     {getPackageJsonInfo().author} - {getPackageJsonInfo().publisher}
                  </NAVLINK>
                  <NAVLINK className="text-center">Versão {getPackageJsonInfo().version}</NAVLINK>
               </NAVITEM>
            </NAV>
         </ROW>
      </FOOTER>
   );
}
