// Carga las variables de entorno del archivo .env
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// --- NUEVA LÍNEA: Importar rutas ---
const gameRoutes = require('./routes/gameRoutes');
// --- NUEVA LÍNEA ---
const reviewRoutes = require('./routes/reviewRoutes');

// Inicializa la aplicación Express
const app = express();

// --- CONEXIÓN A MONGODB (Mantenemos el código anterior) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado con éxito'))
  .catch(err => console.log('❌ Error de conexión a MongoDB:', err));
// ---------------------------------------------------------

// Middleware para parsear JSON
app.use(express.json()); 
// Middleware para CORS
app.use(cors()); 






// Endpoint de prueba (Ruta raíz)
app.get('/', (req, res) => {
  res.send('API de GameTracker en funcionamiento.');
});

// --- NUEVA LÍNEA: Conectar las rutas de los juegos ---
// Todas las rutas dentro de gameRoutes serán accesibles en /api/games
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor de GameTracker ejecutándose en el puerto ${PORT}`);
});