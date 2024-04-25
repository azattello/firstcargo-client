import React, { useEffect, useState } from "react";
import './css/admin.css';
import search from "../../assets/img/search.png"
import axios from 'axios';

const UserList = () => {

        const [users, setUsers] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [perPage, setPerPage] = useState(50);
       
        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('https://first-cargo.kz:3001/api/user/users', {
                        params: {
                            page: currentPage,
                            limit: perPage
                        }
                    });
    
                    setUsers(response.data.users);
                } catch (error) {
                    console.error('Ошибка при получении пользователей:', error.message);
                }
            };
    
            fetchUsers();
        }, [currentPage, perPage]);
    
    
        const handlePageChange = (e) => {
            setCurrentPage(e.target.value);
        };
    
        const handlePerPageChange = (e) => {
            setPerPage(e.target.value);
        };
    
      return (
      
        <div className="users-container">
                <div className="header-bar">
                    <div className="search-bar">
                        <img src={search} alt="" className="searchIcon"/>
                        <input type="text" className="searchInput" placeholder="Поиск..."  />
                    </div>

                    <div className="filter-bar">
                        <div className="filter-point">
                            Все пользователи
                        </div>
                        <div className="filter-point">
                            Сортировать по дате
                        </div>

                        <div  className="page-point">
                            <label htmlFor="page">Номер страницы: </label>
                            <input type="number" id="page" value={currentPage} onChange={handlePageChange} />
                        </div>
                        <div  className="page-point">
                            <label htmlFor="perPage">Кол-во: </label>
                            <input type="number" id="perPage" value={perPage} onChange={handlePerPageChange} />
                        </div>

                    </div>
                </div>

                <div className="table-user">
                    <table className="table">
                        <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>ФИО</th>
                            <th>Номер</th>
                            {/* <th>Дата регистрации</th> */}
                            <th>Роль</th>
                            {/* <th>Действия</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                            {/* <td>{user._id}</td> */}
                            <td>{user.name + ' ' + user.surname}</td>
                            <td>{user.phone}</td>
                            {/* <td>{user.createdAt}</td> */}
                            <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    

                </div>
        </div>

    )
}

export default UserList;