const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');
const logger = require('./middlewares/logger'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger); 


app.use('/api/schools', schoolRoutes);


app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
