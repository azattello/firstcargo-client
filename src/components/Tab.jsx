import React from "react";
import { Link, useLocation  } from 'react-router-dom';
import './styles/tab.css';
import house from '../assets/img/house.png';
import house2 from '../assets/img/house2.png';

import box from '../assets/img/box.png';
import box2 from '../assets/img/box2.png';

import bell from '../assets/img/bell.png';
import bell2 from '../assets/img/bell2.png';

import user from '../assets/img/user.png';
import user2 from '../assets/img/user2.png';



const Tab = () => {
    const location = useLocation();


    return (
      
        <div className="Tab">
            <Link to="/main" className="tabbutton">
                <img src={location.pathname === '/main' ? house2 : house} alt="" />
                <p>Домой</p>
            </Link>

            <Link to="/parcels" className="tabbutton" >
                <img src={location.pathname === '/parcels' ? box2 : box}  alt="" />
                <p>Посылки</p>
            </Link>

            <Link to="/notification" className="tabbutton" >
                <img src={location.pathname === '/notification' ? bell2 : bell} alt="" />
                <p>Уведомление</p>
            </Link>

            <Link to="/profile" className="tabbutton" >
                <img src={location.pathname === '/profile' ? user2 : user}  alt="" />
                <p>Профиль</p>
            </Link>
            
        </div>

    )
}

export default Tab;