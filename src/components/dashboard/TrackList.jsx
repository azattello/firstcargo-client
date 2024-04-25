import React, { useState, useEffect } from 'react';
import './css/admin.css';
import Title from "./title";
import search from "../../assets/img/search.png"
import axios from 'axios';

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

const TrackList = () => {
    const [tracks, setTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(50);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('https://first-cargo.kz:3001/api/track/tracks', {
                    params: {
                        page: currentPage,
                        limit: perPage
                    }
                });

                setTracks(response.data.tracks);
            } catch (error) {
                console.error('Ошибка при получении трек-кодов:', error.message);
            }
        };

        fetchTracks();
    }, [currentPage, perPage]);

    const handlePageChange = (e) => {
        setCurrentPage(e.target.value);
    };

    const handlePerPageChange = (e) => {
        setPerPage(e.target.value);
    };

    
    console.log(tracks)

    return (
        <div className="mainAdmin">
            <Title text="Список посылок"/>
                    <div className="users-container">
                    <div className="header-bar">
                        <div className="search-bar">
                            <img src={search} alt="" className="searchIcon"/>
                            <input type="text" className="searchInput" placeholder="Поиск..."  />
                        </div>

                        <div className="filter-bar">
                            <div className="filter-point">
                                Все треки
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
                                    <th>Трек-код</th>
                                    {/* <th>Статус</th> */}
                                    {/* <th>Пользователь</th> */}
                                    {/* <th>Дата создания</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {tracks.map((track, index) => (
                                    <tr key={index}>
                                        {/* <td>{track._id}</td> */}
                                        <td>{track.track}</td>
                                        {/* <td>{track.status}</td> Assuming status has a "statusText" field */}
                                        {/* <td>"Не известен"</td> */}
                                        {/* <td>{formatDate(track.createdAt)}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default TrackList;