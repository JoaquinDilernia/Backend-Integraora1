import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils/utils';

const app = express();

app.engine('handlebars', handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);