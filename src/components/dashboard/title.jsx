import React from "react";
import './css/admin.css';
import { Link } from 'react-router-dom';

const Title = ({text}) => {

    return (
      
            <div className="title-admin">
                <Link to="/main" className="linkToSite">Ваш сайт</Link>
                    <p>{text}</p>
                <div className="opacity">Ваш сайт</div>
            </div>

    )
}

export default Title;