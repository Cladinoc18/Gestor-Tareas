import express,{ Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from '../src/routes/task.routes';


dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});