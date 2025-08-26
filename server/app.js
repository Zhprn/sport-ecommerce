const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const upload = multer();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./Routes/AuthRoutes.js');
const categoryRoutes = require('./Routes/CategoryRoutes.js');
const productRoutes = require('./Routes/ProductRoutes.js');
const cartRoutes = require('./Routes/CartRoutes.js');
const orderRoutes = require('./Routes/OrderRoutes.js');

app.use('/api', authRoutes);  
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const db = require('./models');
db.sequelize.sync({ alter: true })
  .then(() => console.log('✅ Database synced'))
  .catch(err => console.error('❌ Database sync error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
