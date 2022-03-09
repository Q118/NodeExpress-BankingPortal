const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

// set directory where views are located
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Index' });
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});