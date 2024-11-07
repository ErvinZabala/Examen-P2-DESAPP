const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Aseguramps las rutas correctas
const autentificacionRoutes = require('./Routes/autentificacion');
const proyectoRoutes = require('./Routes/proyectos'); 
const tareasRoutes = require('./Routes/tareas'); 


dotenv.config();


const app = express();
app.use(express.json());

console.log("MongoDB URI:", process.env.MONGODB_URI);

// Configuramos CORS
app.use(cors({
    origin: 'http://localhost:5173', // Permitir solo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));




// Nuestra conexion a nuestra base de datos utilizando la variable de entorno
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



// Usar las rutas
app.use('/api/auth', autentificacionRoutes);
app.use('/api/proyectos', proyectoRoutes); 
app.use('/api/tareas', tareasRoutes);


// Ruta de prueba INICIAL donde verificamos que nuestro servidor esta funcionando correctametne
app.get('/', (req, res) => {
    res.send('Bienvenido a mi Servidorcito');
});

//Esto simplemente es para que corra el servidor 
const port = process.env.port || 3000; //llamamos a la variable de entorno y en caso de que no responda o no exista el servidor correra en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
