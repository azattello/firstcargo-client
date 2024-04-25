import React, { useEffect, useState } from "react";
import './styles/profile.css';
import {useDispatch} from "react-redux";
import { logout } from "../reducers/userReducer";
import profile from '../assets/img/profile.png'
import {useNavigate} from "react-router-dom";

import Tab from './Tab'
import { Link } from "react-router-dom";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Profile = () => {
    const dispatch = useDispatch()

    const [userData, setUserData] = useState(null);
    const titlePage = 'Профиль';

    useEffect(() => {
        // Функция для получения данных профиля пользователя
        const fetchUserProfile = async () => {
            try {
                // Отправляем GET запрос на сервер для получения данных профиля
                const response = await fetch('https://first-cargo.kz:3001/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Передаем токен в заголовке запроса
                    }
                });

                // Проверяем, успешно ли выполнен запрос
                if (response.ok) {
                    // Если запрос успешен, получаем данные профиля из ответа
                    const data = await response.json();
                    setUserData(data.user); // Сохраняем данные профиля в состоянии
                } else {
                    // Если произошла ошибка, выводим сообщение об ошибке
                    console.error('Failed to fetch user profile:', response.statusText);
                }
            } catch (error) {
                // Если произошла ошибка при выполнении запроса, выводим сообщение об ошибке
                console.error('Error fetching user profile:', error.message);
            }
        };

        // Вызываем функцию для получения данных профиля пользователя
        fetchUserProfile();
    }, []); // Запрос будет выполнен только при первом рендере компонента

    const navigate  = useNavigate();
    

    return (
      
        <div className="profile">
        <div className="title">
          {titlePage}
        </div>
        <div className="section__profile">
          <img src={profile} alt="" className="profile__img" />
          {userData ? (
            <div>
              <p className="name info-el">{userData.name} {userData.surname}</p>
              <p className="info-el">Телефон номер: {userData.phone}</p>
              <p className="info-el">Аккаунт создан: {formatDate(userData.createdAt)}</p>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}
          <div className="verify">Пройти верификацию</div>
          {userData && userData.role === 'admin' && (
            <Link to="/dashboard" className="verify">Панель управления</Link>
          )}
          {userData && userData.role === 'filial' && (
            <Link to="/dashboard" className="verify">Панель управления</Link>
          )}
          <div className="logout" onClick={() => {
              dispatch(logout());
              navigate("/");
          }}>Выйти</div>
        </div>
        <div className="area"></div>
        <Tab />
      </div>

    )
}

export default Profile;