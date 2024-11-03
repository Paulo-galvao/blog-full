import express from 'express';
import {engine} from "express-handlebars";
import session from 'express-session';
import flash from 'connect-flash';

const app = express();
const port = 3021;

import admRouter from './routes/adm.js';

/**
 * Config
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
// Static
app.use(express.static('public'));
// Session
app.use(session({
    secret: "blogexpress",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

/**
 * Middleware
 */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

/**
 * Routes
 */
  
app.get('/', (req, res) => {
    res.render('home');
});

app.use('/adm', admRouter);

/**
 * Server
 */

app.listen(port, () => {
    console.log("Server running at port", port);
});