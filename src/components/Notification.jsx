import React, {useState} from "react";
import { Link } from 'react-router-dom';
import './styles/notification.css';
import gifImage from '../assets/gif/progress.gif';

import Tab from './Tab'
const titlePage = "Уведомление"; 


const Notification = () => {

    return (
      
        <div className="main">
                <div className="title">
                    {titlePage}
                </div>
            <div className="notiofication">
                <img className="gif" src={gifImage} alt="" />
                <br />
                <br />
                Функция еще в разработке...
            </div>
            <Tab/>
        </div>

    )
}

export default Notification;