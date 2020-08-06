const express = require('express');
const connectDB = require('./config/db');
const config = require('config');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const dbGrid = config.get('mongoGridURI');
var telegram = require('telegram-bot-api');

const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const Grid = require('gridfs-stream');

const Post = require('./models/Post');
const axios = require('axios');

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

var api = new telegram({
  token: '1233667834:AAHz_bng0VaZaI8UxLH6QXHpBC8wU-04WIY',
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

// @route GET /image/:filename
// @desc  Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists',
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'img/png') {
      // Read output to browser
      let readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});

// @route POST /
// @desc Loads form
app.post('/', upload.single('photo'), async (req, res) => {
  try {
    const newPost = new Post({
      name: req.body.name,
      phone: req.body.phone,
      text: req.body.comment,
      postImage:
        req.protocol + '://' + req.get('host') + '/image/' + req.file.filename,
    });
    await newPost.save();
    console.log(req.body);
    res.send(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  // Send text message
  //   api.on('update', (update) => {
  //     const chat_id = update.message.chat.id

  //     // Send text message
  //     api.sendMessage({
  //       chat_id: 440657814,
  //       text: 'I got following message from you via Webhook: *' + '*',
  //       parse_mode: 'Markdown',
  //       reply_markup: {
  //         inline_keyboard: [
  //           [
  //             {
  //               text: 'Visit us!',
  //               url: 'https://github.com/mast/telegram-bot-api',
  //             },
  //           ],
  //         ],
  //       },
  //     });

  //   // api.sendPhoto({
  //   //   chat_id: 440657814,
  //   //   caption: 'My cute picture',
  //   //   photo: 'https' + '://' + req.get('host') + '/image/' + newPost.postImage,
  //   // });
});

async function sendMessage(text) {
  try {
    console.log(text);
    await api.sendMessage(440657814, 'hello!');
  } catch (error) {
    console.error(error);
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
