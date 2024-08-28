const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Kết nối MongoDB
mongoose.connect('mongodb://mongo:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Định nghĩa model
const Item = mongoose.model('Item', { name: String });

// API route để thêm item vào database
app.post('/api/items', (req, res) => {
  const newItem = new Item({ name: req.body.name });
  newItem.save().then(() => res.status(201).send(newItem));
});

// API route để lấy danh sách items từ database
app.get('/api/items', (req, res) => {
  Item.find().then(items => res.json(items));
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
