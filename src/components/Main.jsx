import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';
import guide from '../assets/img/guide.png';
import track from '../assets/img/track.png';
import geo from '../assets/img/geo.png';
import handshake from '../assets/img/handshake.png';
import logo from '../assets/img/logo.jpg'

import Tab from './Tab'

const titlePage = "Главная"; 
const namecargo = "First-Cargo"
const onas = 'Компания "Морская Група Логистики" является ведущим провайдером услуг в области морской логистики и перевозок грузов. Основанная более десяти лет назад, наша компания специализируется на организации перевозок рыбных продуктов по всему миру.'

const Main = () => {
    return (

            <div className="main">
                 <div className="title">
                        {titlePage}
                    </div>
                <header className="header">
                  
                    <div className="header__mini">
                    <div className="info__cargo">
                        <h1 className="namecargo">{namecargo}</h1>
                        <img src={logo} className="logo2" alt="" />

                    </div>

                   
                    </div>
                    
                      


                </header>
                <div className="section">

                        <div className="blocks__info">

                            <div className="block_info ">
                                <h3 className='text__block_info'>Инструкция</h3>
                                <img className="iconMain" src={guide} alt="" />

                            </div>
                            <Link to="/parcels">
                            <div className="block_info ">
                                <h3 className='text__block_info'>Отследить трек номер</h3>
                                <img className="iconMain" src={track} alt="" />
                            </div>
                            </Link>
                            

                            <div className="block_info ">
                                <h3 className='text__block_info'>Адрес Китайского склада</h3>
                                <img className="iconMain" src={geo} alt="" />

                            </div>

                            <div className="block_info ">
                                <h3 className='text__block_info'>Стать партнером</h3>
                                <img className="iconMain" src={handshake} alt="" />

                            </div>


                            
                    </div>


                    <div className="about">
                        <h3>О нас</h3>
                        <p>{onas}</p>
                    </div>

                    
                    <div className="about">
                        <h3>Товары, которые нельзя заказывать.</h3>
                        <p>
                        Список товаров, запрещенных к импорту из Китая:
                        <br /><br />1) Смартфоны, ноутбуки, планшеты;
                        <br /><br />2) Медицинские товары (лекарства, витамины, мази);
                        <br /><br />3) Военные товары (дроны, бинокли, ролики);
                        <br /><br />4) Оборудование для майнинга (оборудование для добычи биткоинов, электронные деньги, видеокарты);
                        <br /><br />5) Контрафактные товары (золото, серебро, норка/шубы);
                        <br /><br />6) Электронные сигареты;
                        <br /><br />7) Алкогольные напитки;
                        <br /><br />8) Наркотические средства;
                        <br /><br />9) Табак и табачные изделия;
                        <br /><br />10) Пищевые продукты;
                        <br /><br />11) Зеркало.
                        При заказе таких товаров они будут проверены на таможне, и в случае обнаружения товара, который нарушает эти условия, вся ответственность лежит на владельце товара.
                        Если вы согласны с этим условием, можете отправить товар, если не согласны, не отправляйте товар!
                        </p>
                    </div>
                    


            
                    
                    
                </div>

               

                <div className="area"></div>
                
                <Tab/>
                

                  
                
            </div>

    )
}

export default Main;