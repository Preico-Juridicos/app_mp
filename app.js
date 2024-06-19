const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use('/static', express.static(__dirname + 'node_modules'));


app.use('/', indexRouter);

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
