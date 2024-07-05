import BASE_URL from '../services/conecction.js'

const getContacts = () => {
  return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}/api/users`, {
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
              return reject('Error al obtener contactos');
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

const getContactsById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/api/users/${id}`, {
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


export default {
    getContacts,
    getContactsById
}



