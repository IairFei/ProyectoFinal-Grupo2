const BASE_URL = 'https://04a2-190-19-190-107.ngrok-free.app/'
//const BASE_URL = 'https://us-central1-api-nt2-ejemplo.cloudfunctions.net/app/api/'




const getContacts = () => {
    return new Promise((resolve, reject)=> {
         fetch(`${BASE_URL}api/rooms`, {
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
              return reject('Error al obtener contactos')
            }
          })
     
      })
}

const getContactsById = (id) => {
  return new Promise((resolve, reject)=> {
       fetch(`${BASE_URL}read/${id}`, {
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
            return reject('Error al obtener contactos')
          }
        })
   
    })
}


export default {
    getContacts,
    getContactsById
}



