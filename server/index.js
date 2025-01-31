import express, { urlencoded, json } from 'express';
import cors from 'cors';
import multer, { diskStorage } from 'multer';
import { appendFile, readFile, readdir, unlink } from 'fs';
import { extname } from 'path';

const app = express();

// Используем CORS
app.use(cors({
  origin: 'http://localhost:5173' // Разрешаем запросы с вашего фронтенда
}));

// Делаем папку uploads статической
app.use('/uploads', express.static('uploads'));

// Настройка хранилища для multer
const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для сохранения изображений
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage: storage });

// Парсинг данных формы
app.use(urlencoded({ extended: true }));
app.use(json());

// Маршрут для загрузки данных
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const data = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Изображение не было загружено.' });
    }

    // Сохраняем данные
    const savedData = {
      name: data.name,
      description: data.description,
      imagePath: file.path,
    };

    appendFile('data.json', JSON.stringify(savedData) + '\n', (err) => {
      if (err) {
        console.error('Ошибка при сохранении данных:', err);
        return res.status(500).json({ message: 'Ошибка при сохранении данных.' });
      }

      res.status(200).json({ message: 'Данные успешно сохранены!' });
    });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    res.status(500).json({ message: 'Ошибка сервера.' });
  }
});

// Маршрут для получения данных
app.get('/data', (req, res) => {
  readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return res.status(500).json({ message: 'Ошибка при чтении данных.' });
    }

    if (!data.trim()) {
      return res.json([]);
    }

    const lines = data.trim().split('\n');
    const records = lines.map(line => JSON.parse(line));

    res.json(records);
  });
});

// Обработка preflight-запросов
app.options('/upload', cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
});


