const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/v1', (req, res) => {
  res.json({ message: 'StudyAI API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
