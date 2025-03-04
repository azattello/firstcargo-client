import React, { useState } from "react";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const NewBookmark = ({ notFoundBookmarks}) => {
    const [showDetail, setShowDetail] = useState(false);

    const userId = useSelector(state => state.user.currentUser.id)

    const removeBookmark = async (trackNumber) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить эту закладку?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://first-cargo.kz:3001/api/bookmark/${userId}/delete/${trackNumber}`, {
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
        <div className="status-detail">
             <div className="status-client" onClick={() => setShowDetail(!showDetail)}>    
                <p className="status__title">Дата регистрации клиентом</p>
                <div className="quantity"><p className="quantity__p">{notFoundBookmarks.length}</p></div>
            </div>
            
            {showDetail && (
                    
                        <ul className="ul-detail">    
                          <div className="title detail-header">
                                <p>Дата регистрации клиентом</p>
                                <div className="close-detail" onClick={() => setShowDetail(!showDetail)}></div>
                            </div>

                            <div className="li-container">     
                                {notFoundBookmarks.map((bookmark, index) => (
                                <ul className="ul-detail-border">
                                    <li key={index} className="li-track-detail" >
                                        <div className="li-header">
                                            <p>{bookmark.trackNumber}</p>
                                            <div className="removeLiTrack" onClick={() => removeBookmark(bookmark.trackNumber)}></div>
                                        </div>
                                        <div className="description-li">
                                            <b>Описание: </b>{bookmark.description}
                                        </div>
                                        <ul className="date-li">
                                            <b className="date-text">Дата регистрации клиентом:</b>  
                                        
                                            <li >{formatDate(bookmark.createdAt)}</li>
                                        
                                        </ul>
                                    </li>
                                </ul>

                                ))}
                            </div>

                        </ul>

            )}
        </div>
    );
};

export default NewBookmark;
