import express from 'express';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes';
import {registerHelpers} from './utils/handlebar-util'
import {overrideMiddleware} from "./utils/method-override";
import {registerTimes} from './utils/helpers'
import {registerEqual} from './utils/helpers'
import momentHandler from 'handlebars.moment';


const app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);
registerTimes(hbs);
registerEqual(hbs);

momentHandler.registerHelpers(hbs);

const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});