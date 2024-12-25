import express from 'express';
import bodyParser from 'body-parser';
import AdminRouter from './routes/admin.routes.js';
import CategoryRouter from './routes/category.routes.js';
import ProductRouter from './routes/product.routes.js';
// import CartRouter from './routes/cart.routes.js';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './db/dbConfig.js';
const app = express();
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'hghjghfgdfsdsxfdfcbvvmnbjhj', 
  resave: false,  
  saveUninitialized: true, 
}));

app.use('/admin', AdminRouter);
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
// app.use('/cart', CartRouter);

connection();

app.listen(3006, () => {
  console.log('Server started....');
});
