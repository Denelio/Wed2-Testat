import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {indexRoutes} from './routes/indexRoutes';
import {orderRoutes} from './routes/orderRoutes';

const app = express();

const router = express.Router();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.use(bodyParser.json());

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});


app.use("/", indexRoutes);
app.use("/orders", orderRoutes);


app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});