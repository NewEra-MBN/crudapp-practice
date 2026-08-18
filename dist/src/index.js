import express from 'express';
import AuthRoutes from './routes/auth.routes.js';
import cors from 'cors';
import './config/config.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', AuthRoutes);
app.use(errorConverter);
app.use(errorHandler);
app.listen(5000, () => {
    console.log(`Server running on port port http://localhost:5000`);
});
//# sourceMappingURL=index.js.map