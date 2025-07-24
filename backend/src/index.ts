import express from 'express';
import http from 'http';
import { feedbackDataManager } from './data/dataManager.js';
import router from './router.js';
import { requestLogger } from './middleware/requestLogger.js';
import cors from 'cors';
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4173';
const app = express();

app.use(cors({
  origin: [FRONTEND_URL],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(requestLogger);
app.use('/api', router);

feedbackDataManager.initialize();

app.get('/', (req, res) => {
    res.send('Welcome to the Feedback API');
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  
