import express from 'express'
import AuthRoutes from './routes/auth.routes.js';
import cors from 'cors'
import config from './config/config.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import passport from 'passport';
import { JwtStrategy } from './config/passport.js';
import morgan from './config/morgan.js';

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///jwt authentication
app.use(passport.initialize());
passport.use('jwt', JwtStrategy)

app.use('/api/auth', AuthRoutes)



app.use(errorConverter)
app.use(errorHandler)

app.listen(5000, ()=> {
    console.log(`Server running on port port http://localhost:5000`)
})