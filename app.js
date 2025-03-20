//Express
const express = require('express');
const app = express();
//Mongoose
const mongoose = require('mongoose');
//Dotenv
const dotenv = require('dotenv');
dotenv.config()

//Configurações
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//Handlebars
const { engine } = require('express-handlebars');
app.engine('hbs', engine({
    extname: '.hbs', 
    partialsDir: 'views/partials',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'

}));
app.set('view engine', 'hbs');
app.set('views', 'views');

//Rotas
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


//Inicio do servidor
const port = process.env.PORT || 5500;
mongoose.connect(process.env.CONNECTION_STRING)
.then(result => {
    app.listen(port, (() => console.log('Servidor rodando na porta '+ port)))
})
.catch(error => console.error('Erro ao conectar ao MongoDB: ', error));
