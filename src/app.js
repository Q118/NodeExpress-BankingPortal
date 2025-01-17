const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { accounts, users } = require('./data');

const accountRoutes =  require('./routes/accounts');
const servicesRoutes = require('./routes/services');


// set directory where views are located
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to public
app.use(express.static(path.join(__dirname, 'public')));

// express middleware to handle POST data
app.use(express.urlencoded({ extended: true }));

//!! set up routes for use
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});


app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});