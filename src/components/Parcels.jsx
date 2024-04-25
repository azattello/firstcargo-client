import React, {useEffect, useState} from "react";
import './styles/parcels.css';
import {getStatus } from "../../src/action/status";
import { useSelector } from 'react-redux';
import { addBookmark } from "../action/bookmark";
import StatusDetail from './StatusDetail'; // Импортируем новый компонент
import NewBookmark from "./NewBookmark";
import { getFilials } from "../action/filial";
import FilialBookmark from "./FilialBookmark";

import Tab from './Tab'
import axios from 'axios';
const titlePage = 'Мои посылки'

// const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     return `${year}-${month}-${day}`;
// };

const Parcels = () => {
    const [statuses, setStatuses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [moreText, setMoreText] = useState('');
    const [trackText, setTrackText] = useState('');

    const [notFoundBookmarks, setNotFoundBookmarks] = useState([]);
    const [updatedBookmarks, setUpdatedBookmarks] = useState([]);

    const [archive, setArchive] = useState([]);
    const [showArchive, setShowArchive] = useState(false);

    const [filial, setFilial] = useState([]);
    const userId = useSelector(state => state.user.currentUser.id);
    
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`https://first-cargo.kz:3001/api/bookmark/${userId}/getBookmarks`);
                const { notFoundBookmarks, updatedBookmarks } = response.data;
                setNotFoundBookmarks(notFoundBookmarks);
                setUpdatedBookmarks(updatedBookmarks);
                
            } catch (error) {
                console.error('Ошибка при получении закладок:', error.message);
            }
        };

        fetchBookmarks();
    }, [userId]);

    useEffect(() => {
        // Получаем статусы при загрузке компонента
        fetchStatuses();
        getFilial();
    }, []);

    const fetchStatuses = async () => {
        try {
            const statusesData = await getStatus();
            setStatuses(statusesData);
            
            
        } catch (error) {
            console.error('Ошибка при получении статусов:', error);
        }
    };

    const getFilial = async () => {
        try {
            const filialData = await getFilials();
            setFilial(filialData);
            console.log(filial);
        } catch (error) {
            console.log(error.message);
        }
    };


    const handleOpenModal = () => {
        setModalOpen(!modalOpen);
      }



    
    const handleAddBookmark = async () => {
        try {
            await addBookmark(userId, moreText, trackText);
            setMoreText('')
            setTrackText('')
        } catch (error) {
            console.error('Ошибка:', error.message);
        } finally {
            handleOpenModal()
        }
    };


    useEffect(() => {
        const fetchArchive = async () => {
            try {
                const response = await axios.get(`https://first-cargo.kz:3001/api/archive/${userId}/getArchive`);
                setArchive(response.data);
            } catch (error) {
                console.error('Ошибка при получении архива:', error.message);
            }
        };

        fetchArchive();
    }, [userId]);
    

    const removeBookmark = async (trackNumber) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту закладку?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://first-cargo.kz:3001/api/archive/${userId}/delete/${trackNumber}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении закладки');
                }

                console.log('Закладка успешно удалена');
                // Перезагрузить страницу или обновить список закладок
                window.location.reload();
            } catch (error) {
                console.error('Произошла ошибка при удалении закладки:', error.message);
            }
        }
    };

    return (
      
        <div className="main__parcels">
                <div className="title">
                    {titlePage}
                </div>
                <div className="parcels">
                <div>
                   
                </div>
              
                        <div className="statuses-client">
                            <NewBookmark notFoundBookmarks = {notFoundBookmarks} />
                            {statuses.map(status => (
                                status.statusText !== "Получено" &&
                                <StatusDetail 
                                    key={status._id} 
                                    statusId={status._id} 
                                    statusText={status.statusText} 
                                    updatedBookmarks={updatedBookmarks} 
                                />
                            ))}

                            {Array.isArray(filial) && filial.map(filial => {
                                const filialId = filial.filial._id;
                                const filteredBookmarks = updatedBookmarks.filter(bookmark => bookmark.currentStatus === filialId);
                                if (filteredBookmarks.length > 0) {
                                    return (
                                        <FilialBookmark 
                                            key={filialId} 
                                            filialId={filialId} 
                                            filialText={filial.filial.filialText} 
                                            updatedBookmarks={updatedBookmarks} 
                                        />
                                    );
                                }
                                return null;
                            })}



                            {statuses.map(status => (
                                status.statusText === "Получено" &&
                                <StatusDetail 
                                    key={status._id} 
                                    statusId={status._id} 
                                    statusText={status.statusText} 
                                    updatedBookmarks={updatedBookmarks} 
                                />
                            ))}
                            
                        </div>

                        {modalOpen && (
                            <div className="modalAdd">
                                <div className="modalAdd-header">
                                    <h2>Добавить трек номер</h2>
                                    <div className="close" onClick={handleOpenModal}></div>
                                </div>
                                <label className="labelTrack" htmlFor="">Описание посылки</label>
                                <input
                                    type="text"
                                    value={moreText}
                                    onChange={(e) => setMoreText(e.target.value)}
                                    placeholder="Введите текст статуса"
                                    className="input-trackAdd"
                                />
                                <label className="labelTrack"  htmlFor="">Трек номер посылки</label>
                                <input
                                    type="text"
                                    value={trackText}
                                    onChange={(e) => setTrackText(e.target.value)}
                                    placeholder="Введите текст статуса"
                                    className="input-trackAdd"
                                />
                                <div className="button__addTrack" onClick={handleAddBookmark}>Добавить посылку</div>
                            </div>
                             )}
                             {modalOpen && (
                                <div className="overflow"></div>
                            )}
                       
                        <div className="archive-container"  onClick={() => setShowArchive(!showArchive)}>
                            <div className="archive-icon"></div>
                            <p>Посылки в Архиве</p>
                            <div className="quantity-archive"><div className="quantity__p-archive">{archive.length}</div></div>
                        </div>
                    
                    <div className="area"></div>

                    <div className="button__container">
                        <div className="add__track" onClick={handleOpenModal}>Добавить трек номер</div>
                    </div>

                    {showArchive && (
                    
                    <ul className="ul-detail">    
                        <div className="title detail-header">
                            <p>Архив посылок</p>
                            <div className="close-detail" onClick={() => setShowArchive(!showArchive)}></div>
                        </div>         
                        <div className="li-container">
                            {archive.map((item, index) => (
                                <div className="ul-detail-border" key={index}>
                                    <li className="li-track-detail">
                                        <div className="li-header">
                                            <p>{item.trackNumber}</p>
                                            <div className="removeLiTrack" onClick={() => removeBookmark(item.trackNumber)}></div>

                                        </div>
                                        <div className="description-li">
                                            <b>Описание: </b>{item.description}
                                        </div>
                                        {/* <ul className="date-li">
                                            <b className="date-text"> История:</b>
                                            {item.history.map((historyItem, historyIndex) => (
                                                <li key={historyIndex}>{formatDate(historyItem.date)}</li>
                                            ))} 
                                        </ul> */}
                                    </li>
                                </div>
                            ))}
                    <div className="area"></div>

                        </div>
                       

                    </ul>

                    )}

                   
                </div>

            <Tab/>
        </div>

    )
}

export default Parcels;