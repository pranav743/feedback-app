import express from 'express';
import http from 'http';
import { feedbackDataManager } from './data/dataManager.js';
import router from './router.js';
import { requestLogger } from './middleware/requestLogger.js';



const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(requestLogger);
app.use('/api', router);

feedbackDataManager.initialize();

app.get('/', (req, res) => {
    res.send('Welcome to the Feedback API');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});  
