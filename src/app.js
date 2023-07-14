import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import __dirname from './utils.js';
//import  viewsRouter  from './routes/views.router.js';
import companiesRouter from './routes/companies.routes.js';

const app = express();
const conection = await mongoose.connect('mongodb+srv://jdilernia99:coder@cluster0.dlkrswm.mongodb.net/?retryWrites=true&w=majority');
app.engine('handlebars', handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//app.use("/", viewsRouter);
app.use("/api/companies", companiesRouter);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);