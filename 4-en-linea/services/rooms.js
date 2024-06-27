const BASE_URL = 'https://71cf-190-19-190-107.ngrok-free.app/'

const getRooms = () => {
  return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}api/rooms`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer xxxx'
          }
      })
      .then(res => {
          if (res.status === 201) { // Verifica si el estado es 200
              return res.json();
          } else {
              return reject('Error al obtener salas');
          }
      })
      .then(data => {
          resolve(data);
      })
      .catch(err => {
          reject(err);
      });
  });
};

const getRoomsById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}api/rooms/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer xxxx'
            }
        })
        .then(res => {
            if (res.status === 200) { // Verifica si el estado es 200
                return res.json();
            } else {
                return reject('Error al obtener el contacto');
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
};

const createRoom = (nombre) => {
    return new Promise((resolve, reject) => {
  
      fetch(`${BASE_URL}rooms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('No se pudo crear la sala');
        }
      })
      .then(authData => {
        AsyncStorage.storeData('authData', authData);
        resolve(authData);
      })
      .catch(error => {
        reject(error.message);
      });
    });
  };


export default {
    getRooms,
    getRoomsById,
    createRoom
}



