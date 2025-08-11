const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/upload', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', (req, res) => {
  res.json({ message: 'Auth API placeholder' });
});
app.use('/api/event', (req, res) => {
  res.json({ message: 'Event API placeholder' });
});

// const db = require('./models');
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log('✅ Database synced');
// }).catch(err => {
//   console.error('❌ Database sync error:', err);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
