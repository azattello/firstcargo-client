import React from "react";
import './css/admin.css';
import gifImage from '../../assets/gif/progress.gif';
import Title from "./title";


const Mailing = () => {

    return (
      
        <div className="process">
                          <Title text="Рассылка"/>

            <div className="notiofication">
                <img className="gif" src={gifImage} alt="" />
                <br />
                <br />
                Функция еще в разработке...
            </div>
        </div>

    )
}

export default Mailing;