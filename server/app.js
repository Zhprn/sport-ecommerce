const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./Routes/AuthRoutes.js');
const categoryRoutes = require('./Routes/CategoryRoutes.js');
const productRoutes = require('./Routes/ProductRoutes.js');

app.use('/api', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);

// const db = require('./models');
// db.sequelize.sync({ alter: true })
//   .then(() => console.log('✅ Database synced'))
//   .catch(err => console.error('❌ Database sync error:', err));

// Jalankan server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
