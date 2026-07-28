import express from 'express'
import AuthRoutes from './routes/auth.routes.js';
import cors from 'cors'
import dotenv from 'dotenv'
import { errorConverter, errorHandler } from './middlewares/error.js';
dotenv.config();

const app = express();
app.use(cors());

app.use('/api/auth', AuthRoutes)

app.use(errorConverter)
app.use(errorHandler)

app.listen(5000, ()=> {
    console.log(`Server running on port port 5000`)
})