import axios from 'axios';

export const addFilial = async (filialText, userPhone) => {
  try {
    // Отправляем POST запрос на сервер для добавления нового филиала
    const response = await axios.post('https://first-cargo.kz:3001/api/filial/addFilial', {
      filialText,
      userPhone
    });

    // Если запрос выполнен успешно, возвращаем данные ответа
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
        const { message, errors } = error.response.data;
        console.log('Validation errors:', errors);
        alert(message);
      } else {
            // Если есть ошибка валидации, отображаем сообщение об ошибке
        if (error.response && error.response.status === 400) {
          const { message, errors } = error.response.data;
          console.log('Validation errors:', errors);
          alert(message);
        } else {
          // Если произошла другая ошибка, выводим сообщение об ошибке в консоль
          console.error('Error:', error.message);
        }
      }
  }
};

export const getFilials = async () => {
  try {
    // Отправляем GET запрос на сервер для получения данных о всех филиалах
    const response = await axios.get('https://first-cargo.kz:3001/api/filial/getFilial');

    // Если запрос выполнен успешно, возвращаем данные ответа
    return response.data;
  } catch (error) {
    // Если произошла ошибка, выводим её в консоль и возвращаем null
    console.error('Ошибка при получении данных о филиалах:', error);
    return null;
  }
};
  
export const fetchFilialByUserPhone = async (userPhone) => {
  try {
      const response = await axios.get('https://first-cargo.kz:3001/api/filial/getFilialByUserPhone', {
          params: {
              userPhone
          }
      });
      return response.data;
  } catch (error) {
      throw new Error(error.message);
  }
};


export const deleteFilial = async (filialId) => {
  try {
    const response = await axios.delete(`https://first-cargo.kz:3001/api/filial/deleteFilial/${filialId}`);
    return response.data.message;
  } catch (error) {
    // Если есть ошибка валидации, отображаем сообщение об ошибке
    if (error.response && error.response.status === 400) {
      const { message, errors } = error.response.data;
      console.log('Validation errors:', errors);
      alert(message);
    } else {
      // Если произошла другая ошибка, выводим сообщение об ошибке в консоль
      console.error('Error:', error.message);
    }
  }
};
  