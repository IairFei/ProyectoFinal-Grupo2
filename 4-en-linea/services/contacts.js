const BASE_URL = 'https://us-central1-api-nt2-ejemplo.cloudfunctions.net/app/api/'

// const nombres = ['Carlos', 'Paula', 'Lionel', 'Elena', 'Mateo', `Enzo`]
// const apellidos = ['Messi', 'Perez', 'Romero', 'Gomez', 'Di Maria', `Martinez`]

// const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;


// const generaNombre = () => `${nombres[random(0, nombres.length - 1)]}`
// const generaApellido = () => `${apellidos[random(0, apellidos.length - 1)]}`


// //Telefono seria: 55-555-555
// const generarTelefono = () => `${random(10, 99)}-${random(100, 999)}-${random(100, 999)}`

// const crearContacto = () => {
//   return {
//     fullName: `${generaApellido()}, ${generaNombre()}`,
//     phone: generarTelefono(),
//     age: random(18, 99)
//   }
// }


const getContacts = () => {
    return new Promise((resolve, reject)=> {
         fetch(`${BASE_URL}read`, {
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