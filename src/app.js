const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { accounts, users, writeJSON } = require('./data');

// set directory where views are located
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// point express to public
app.use(express.static(path.join(__dirname, 'public')));

// express middleware to handle POST data
app.use(express.urlencoded({ extended: true }));


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
    accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance - req.body.amount);
    //!!!
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance + req.body.amount);

    writeJSON();

    res.render('transfer', {
        message: "Transfer Completed"
    });
});


app.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

app.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount);

    writeJSON();

    res.render('payment', {
        message: 'Payment Successful',
        account: accounts.credit
    });
});


app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});