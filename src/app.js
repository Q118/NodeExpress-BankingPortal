const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

// set directory where views are located
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to public
app.use(express.static(path.join(__dirname, 'public')));

// express middleware to handle POST data
app.use(express.urlencoded({ extended: true }));

// read the contents of the file at src/json/accounts.json
const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    });
});

app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    });
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
});

app.get('/transfer', (req, res) => {
    res.render('transfer');
});

app.post('/transfer', (req, res) => {
    // calculate the new balances for the account we are transferring from.
    const fromBalance = req.body.from - parseInt(req.body.amount);
    const toBalance = req.body.to + parseInt(req.body.amount);


});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});