import React, { useState } from "react";
import './css/Sidebar.css';
// import apps from '../../assets/img/apps.png';
import track from '../../assets/img/track2.png';
import list from '../../assets/img/list.png';
import users from '../../assets/img/users.png';
import stats from '../../assets/img/stats.png';
import truck from '../../assets/img/truck.png';
import message from '../../assets/img/message.png';
import logo from '../../assets/img/logo.jpg'

const namecargo = "First-Cargo"

const Sidebar = ({ onNavItemClick }) => {
    const [selectedNavItem, setSelectedNavItem] = useState(sessionStorage.getItem('selectedNavItem') || "addTrack");
    
    
    const role = localStorage.getItem('role')

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
        onNavItemClick(navItem);
      };
      
      
    return (
      
        <div className="sidebar">
        <div className="header-admin">
          <img src={logo} className="logo-admin" alt="" />
          <p>{namecargo}</p>
        </div>
  
        <div className="navigation-admin">
       
        {/* <div className={`nav-link ${selectedNavItem === "mainAdmin" && "nav-active"}`} onClick={() => handleNavItemClick("mainAdmin")}>
            <img src={apps} alt="" className="nav-icon" />
            <h5 className="nav-title">Админ</h5>
          </div> */}
  
          <div className={`nav-link ${selectedNavItem === "addTrack" && "nav-active"}`} onClick={() => handleNavItemClick("addTrack")}>
            <img src={track} alt="" className="nav-icon" />
            <h5 className="nav-title">Добавить трек</h5>
          </div>
  
          <div className={`nav-link ${selectedNavItem === "trackList" && "nav-active"}`} onClick={() => handleNavItemClick("trackList")}>
            <img src={list} alt="" className="nav-icon" />
            <h5 className="nav-title">Список треков</h5>
          </div>
  
          <div className={`nav-link ${selectedNavItem === "allUsers" && "nav-active"}`} onClick={() => handleNavItemClick("allUsers")}>
            <img src={users} alt="" className="nav-icon" />
            <h5 className="nav-title">Все пользователи</h5>
          </div>
          {role !== 'filial' && 
          <div className={`nav-link ${selectedNavItem === "myCargo" && "nav-active"}`} onClick={() => handleNavItemClick("myCargo")}>
            <img src={truck} alt="" className="nav-icon" />
            <h5 className="nav-title">Мой карго</h5>
          </div>
          }
          {role !== 'filial' && 
          <div className={`nav-link ${selectedNavItem === "statistics" && "nav-active"}`} onClick={() => handleNavItemClick("statistics")}>
            <img src={stats} alt="" className="nav-icon" />
            <h5 className="nav-title">Статистика</h5>
          </div>
          }
         
         {role !== 'filial' && 
          <div className={`nav-link ${selectedNavItem === "mailing" && "nav-active"}`} onClick={() => handleNavItemClick("mailing")}>
            <img src={message} alt="" className="nav-icon" />
            <h5 className="nav-title">Рассылка</h5>
          </div>
          }
          </div>
      </div>

    )
}

export default Sidebar;