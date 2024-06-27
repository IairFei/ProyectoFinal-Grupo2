const BASE_URL = 'https://71cf-190-19-190-107.ngrok-free.app/'
//const BASE_URL = 'https://us-central1-api-nt2-ejemplo.cloudfunctions.net/app/api/'




// const getContacts = () => {
//     return new Promise((resolve, reject)=> {
//       fetch(`${BASE_URL}api/users`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Baerer xxxx'
//         }
//       })
//       .then(res => {
//         if(res.status === 201){
//                return resolve(res.json())
//             }else{
//               return reject('Error al obtener contactos')
//             }
//           })
     
//       })
// }

const getContacts = () => {
  return new Promise((resolve, reject) => {
      fetch(`${BASE_URL}api/users`, {
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
  return new Promise((resolve, reject)=> {
       fetch(`${BASE_URL}api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Baerer xxxx'
        }
       })
       .then(res => {
          if(res.status === 200){
             return resolve(res.json())
          }else{
            return reject('Error al obtener contactooooo')
          }
        })
   
    })
}


export default {
    getContacts,
    getContactsById
}



