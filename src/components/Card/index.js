/* eslint-disable no-nested-ternary, no-shadow  */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MdcCalendarSearch from '@meronex/icons/mdc/MdcCalendarSearch';
import MdChevronLeft from '@meronex/icons/md/MdChevronLeft';
import MdChevronRight from '@meronex/icons/md/MdChevronRight';
import MdFirstPage from '@meronex/icons/md/MdFirstPage';
import MdLastPage from '@meronex/icons/md/MdLastPage';
import MdPlaylistAdd from '@meronex/icons/md/MdPlaylistAdd';
import MdCancel from '@meronex/icons/md/MdCancel';
import MdSearch from '@meronex/icons/md/MdSearch';
import MdRefresh from '@meronex/icons/md/MdRefresh';
import { Link } from 'react-router-dom';

import {
   CARD,
   CARDHEADER,
   CARDBODY,
   CARDFOOTER,
   CARDCOL,
   CARDBUTTON,
   DIV,
   TEXT,
   CARDPAGINATION,
   CARDPAGINATIONITEM,
   CARDPAGINATIONLINK,
   DATEPICKER,
   FORM,
   SINALOFF,
} from './styles';
// import { currentTime } from '../../utils/functions';

import { LOADING } from '..';

export default function PrecisaCard({
   title, // Titulo do card
   subTitle, // Subtitulo do card
   schema, // Validações do form
   submit, // Função para dar submit no form
   children, // Elementos para renderizar
   loading, // Spinner de carregamento
   typeLoading, // Estilo do loading
   searchDate, // Se tiver procura por datas
   uniqueDate, // Se tiver apenas um campo data
   filterFirstAndLastDay, // Permite selecionar somente o primeiro e o ultimo dia de cada mês
   filterMonth, // Permite selecionar somente o mês
   valueDateInitial, // Valor inicial da data
   valueDateEnd, // Valor final da data
   link, // Se houver link
   linkRoute, // Qual a rota para ser linkada
   linkTitle, // Descrição do link da rota
   pagination, // Ativa a paginação
   handlePage, // Função para a paginação
   page, // Página atual
   size, // Quantidade de registros por página
   totalRecords, // Total de registros
   backgroundColor, // Se quiser outra cor de card
   backgroundStreaming, // Caso tenha transmissão em segundo plano
   lastBackgroundStreaming, // Última transmissão em segundo plano
   noFooter, // Desativa o footer do card
}) {
   const [openForm, setOpenForm] = useState(false);

   // Função de submit do form de datas
   async function handleSubmit(data) {
      await submit(data);
      await setOpenForm(openForm => !openForm);
   }

   // Função para a paginação
   async function handleAlterPage(params) {
      if (params === 'firstPage') {
         if (totalRecords > 0) {
            await handlePage(1);
         }
      } else if (params === 'previousPage') {
         if (totalRecords > 0 && page > 1) {
            await handlePage(page - 1);
         }
      } else if (params === 'nextPage') {
         if (totalRecords > 0 && totalRecords > size * page) {
            await handlePage(page + 1);
         }
      } else if (params === 'lastPage') {
         if (totalRecords > size) {
            await handlePage(Math.round(totalRecords / size));
         }
      }
   }

   return (
      <CARD background={backgroundColor}>
         <CARDHEADER>
            <CARDCOL>
               <TEXT fontW={800} fontS={10}>
                  {title && 'Visão Geral'}
               </TEXT>
               <TEXT fontW={800} fontS={16}>
                  {title}
               </TEXT>
               {subTitle && (
                  <TEXT fontW={800} fontS={8}>
                     {subTitle}
                  </TEXT>
               )}
            </CARDCOL>
            {backgroundStreaming && (
               <CARDBUTTON type="button" background="#fff" color="#21C7C2" onClick={() => handleSubmit()}>
                  <MdRefresh size={30} color="#21C7C2" />
               </CARDBUTTON>
            )}
            {searchDate ? (
               openForm ? (
                  <FORM submit={handleSubmit} schema={schema} uniqueDate={!uniqueDate}>
                     <DATEPICKER
                        name="dataInicial"
                        valueDate={valueDateInitial}
                        filterFirstAndLastDay={filterFirstAndLastDay}
                        filterMonth={filterMonth}
                     />
                     {!uniqueDate && (
                        <DATEPICKER
                           name="dataFinal"
                           valueDate={valueDateEnd}
                           filterFirstAndLastDay={filterFirstAndLastDay}
                           filterMonth={filterMonth}
                        />
                     )}
                     <CARDBUTTON type="submit" background="#21C7C2" color="#fff">
                        <MdSearch size={24} />
                     </CARDBUTTON>
                     <CARDBUTTON
                        type="button"
                        background="#fff"
                        color="#21C7C2"
                        onClick={() => setOpenForm(openForm => !openForm)}
                     >
                        <MdCancel size={24} />
                     </CARDBUTTON>
                  </FORM>
               ) : (
                  <DIV>
                     <CARDBUTTON
                        type="button"
                        background="#fff"
                        color="#21C7C2"
                        onClick={() => setOpenForm(openForm => !openForm)}
                     >
                        <MdcCalendarSearch size={24} />
                     </CARDBUTTON>
                  </DIV>
               )
            ) : (
               link && (
                  <Link to={`${linkRoute}`}>
                     <CARDBUTTON color="#fff" type="button" background="#21C7C2">
                        <MdPlaylistAdd size={24} />
                        {linkTitle}
                     </CARDBUTTON>
                  </Link>
               )
            )}
         </CARDHEADER>
         <CARDBODY>
            {loading ? (
               <LOADING type={typeLoading} />
            ) : (
               <DIV>
                  {backgroundStreaming && (
                     <DIV>
                        <SINALOFF background="#5603ad">
                           <TEXT fontW={600} fontS={10} color="#fff">
                              Execução em segundo plano
                           </TEXT>
                           <TEXT
                              fontW={600}
                              fontS={10}
                              color="#fff"
                           >{`Última transmissão: ${lastBackgroundStreaming}`}</TEXT>
                        </SINALOFF>
                     </DIV>
                  )}
                  {children}
               </DIV>
            )}
         </CARDBODY>
         {!noFooter && (
            <CARDFOOTER>
               {pagination && totalRecords > 0 && (
                  <>
                     <CARDCOL>
                        <TEXT fontW={800} fontS={10}>
                           Página: {page}
                        </TEXT>
                        <TEXT fontW={800} fontS={10}>
                           Total de registros: {totalRecords}
                        </TEXT>
                     </CARDCOL>
                     <CARDPAGINATION>
                        <CARDPAGINATIONITEM>
                           <CARDPAGINATIONLINK onClick={() => handleAlterPage('firstPage')}>
                              <MdFirstPage color="#21C7C2" size={30} />
                           </CARDPAGINATIONLINK>
                        </CARDPAGINATIONITEM>
                        <CARDPAGINATIONITEM>
                           <CARDPAGINATIONLINK onClick={() => handleAlterPage('previousPage')}>
                              <MdChevronLeft color="#21C7C2" size={30} />
                           </CARDPAGINATIONLINK>
                        </CARDPAGINATIONITEM>
                        <CARDPAGINATIONITEM>
                           <CARDPAGINATIONLINK onClick={() => handleAlterPage('nextPage')}>
                              <MdChevronRight color="#21C7C2" size={30} />
                           </CARDPAGINATIONLINK>
                        </CARDPAGINATIONITEM>
                        <CARDPAGINATIONITEM>
                           <CARDPAGINATIONLINK onClick={() => handleAlterPage('lastPage')}>
                              <MdLastPage color="#21C7C2" size={30} />
                           </CARDPAGINATIONLINK>
                        </CARDPAGINATIONITEM>
                     </CARDPAGINATION>
                  </>
               )}
            </CARDFOOTER>
         )}
      </CARD>
   );
}

PrecisaCard.propTypes = {
   schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element]),
   children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.element]),
   title: PropTypes.string,
   subTitle: PropTypes.string,
   submit: PropTypes.func,
   loading: PropTypes.bool,
   typeLoading: PropTypes.string,
   searchDate: PropTypes.bool,
   uniqueDate: PropTypes.bool,
   filterFirstAndLastDay: PropTypes.bool,
   filterMonth: PropTypes.bool,
   valueDateInitial: PropTypes.instanceOf(Date),
   valueDateEnd: PropTypes.instanceOf(Date),
   link: PropTypes.bool,
   linkRoute: PropTypes.string,
   linkTitle: PropTypes.string,
   pagination: PropTypes.bool,
   handlePage: PropTypes.string,
   page: PropTypes.string,
   size: PropTypes.string,
   totalRecords: PropTypes.string,
   backgroundColor: PropTypes.string,
   backgroundStreaming: PropTypes.bool,
   lastBackgroundStreaming: PropTypes.string,
   noFooter: PropTypes.bool,
};

PrecisaCard.defaultProps = {
   schema: {},
   children: {},
   title: null,
   subTitle: null,
   submit: null,
   loading: false,
   typeLoading: null,
   searchDate: false,
   uniqueDate: false,
   filterFirstAndLastDay: false,
   filterMonth: false,
   valueDateInitial: null,
   valueDateEnd: null,
   link: false,
   linkRoute: null,
   linkTitle: null,
   pagination: false,
   handlePage: null,
   page: null,
   size: null,
   totalRecords: null,
   backgroundColor: null,
   backgroundStreaming: false,
   lastBackgroundStreaming: null,
   noFooter: false,
};
