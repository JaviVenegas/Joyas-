//para almacenar congiguraciones y valores sensibles en este caso los datos del servidor 
require('dotenv').config();  //paquete envi 
const app = require('./src/app');
const {PORT} = process.env; //informando que se esta usando env 


//servdor a usar y que se importa desde env
app.listen(PORT || 3001 , () => {
    console.log(`Server running on http://localhost:${PORT}`)
})