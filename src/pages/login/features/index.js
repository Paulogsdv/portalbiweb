import React, { useState } from 'react';
import { SemipolarLoading } from 'react-loadingg';
import { useDispatch, useSelector } from 'react-redux';
import MdAccountCircle from '@meronex/icons/md/MdAccountCircle';
import MdVisibilityOff from '@meronex/icons/md/MdVisibilityOff';
import MdVisibility from '@meronex/icons/md/MdVisibility';
import FaInstagram from '@meronex/icons/fa/FaInstagram';
import FaFacebookF from '@meronex/icons/fa/FaFacebookF';
import FaWhatsapp from '@meronex/icons/fa/FaWhatsapp';
import FaHeadset from '@meronex/icons/fa/FaHeadset';
import FaLink from '@meronex/icons/fa/FaLink';

import { signInRequest } from '../../../hooks/modules/auth/actions';

import schema from '../../../validations/form/Login';

import logoBranco from '../../../assets/images/logoBranco.png';

import { BUTTON, BUTTONSAVE, CARD, COL, CONTAINER, FORM, INPUT, ROW, NAVLINK, DIV, IMG } from './styles';
import { getPackageJsonInfo } from '../../../utils/functions';

export default function Login() {
   const dispatch = useDispatch();
   const [viewPassword, setViewPassword] = useState(false);
   const loading = useSelector(state => state.auth.loading);

   // Envio das informações do login para o redux
   function handleSubmit(data) {
      const { email, senha } = data;

      dispatch(signInRequest(email, senha));
   }

   function handlePassword() {
      setViewPassword(!viewPassword);
   }

   return (
      <DIV className="main-content">
         <CONTAINER>
            <ROW className="justify-content-center">
               <COL lg="8" md="7">
                  <CARD>
                     <DIV className="text-muted text-center">
                        <IMG className="img-fluid" src={logoBranco} alt="logo" style={{ width: '65%' }} />
                     </DIV>
                     <DIV className="text-center text-white mt-2 mb-5">Bem-vindo, informe suas credenciais!</DIV>
                     <FORM schema={schema} submit={handleSubmit}>
                        <INPUT
                           autoFocus
                           icon={<MdAccountCircle size={24} color="#ccc" />}
                           placeholder="Email"
                           name="email"
                           type="text"
                        />
                        <INPUT
                           icon={
                              viewPassword ? (
                                 <MdVisibility size={24} color="#ccc" />
                              ) : (
                                 <MdVisibilityOff size={24} color="#ccc" />
                              )
                           }
                           placeholder="Senha"
                           name="senha"
                           type={viewPassword ? 'text' : 'password'}
                           handlePassword={handlePassword}
                        />
                        <DIV className="text-center mt-5">
                           <BUTTONSAVE type="submit">
                              {loading ? <SemipolarLoading color="#21c7c2" /> : 'ACESSAR'}
                           </BUTTONSAVE>
                        </DIV>
                     </FORM>
                     <ROW className="mt-3">
                        <NAVLINK href="https://linktr.ee/precisafabricadesoftware" target="_blank">
                           <BUTTON type="submit">
                              <FaWhatsapp size={18} color="#fff" />
                              <FaInstagram size={18} color="#fff" />
                              <FaFacebookF size={18} color="#fff" />
                              <FaLink size={18} color="#fff" />
                           </BUTTON>
                        </NAVLINK>
                        <NAVLINK
                           href="https://servidorseguro.mysuite2.com.br/client/login.php?sl=prcs&h=&inf=&lf="
                           target="_blank"
                        >
                           <BUTTON type="submit">
                              <FaHeadset size={18} color="#fff" />
                           </BUTTON>
                        </NAVLINK>
                     </ROW>
                     <DIV className="text-center text-muted mt-3">{getPackageJsonInfo().author}</DIV>
                     <DIV className="text-center text-muted">
                        Versão {getPackageJsonInfo().version} - {getPackageJsonInfo().publisher}
                     </DIV>
                  </CARD>
               </COL>
            </ROW>
         </CONTAINER>
      </DIV>
   );
}
