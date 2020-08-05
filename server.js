const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const dbGrid = config.get('mongoGridURI');

const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Grid = require('gridfs-stream');

// Init Middleware
app.use(express.json({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static('src/'));

//Connect DB
connectDB();

// Create mongo connection
const conn = mongoose.createConnection(dbGrid, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('MongoGrid Connected...');
});

// Create storage object
const storage = new GridFsStorage({
  url: dbGrid,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

// @route POST /
// @desc Loads form
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('post');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
