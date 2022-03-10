const express = require('express');
const router = express.Router();
const { accounts, users, writeJSON } = require('../data');

router.get('/transfer', (req, res) => {
    res.render('transfer');
});

router.post('/transfer', (req, res) => {
    // calculate the new balances for the account we are transferring from.
    accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance - req.body.amount);
    //!!!
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance + req.body.amount);
    writeJSON();
    res.render('transfer', {
        message: "Transfer Completed"
    });
});


router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    });
});

router.post('/payment', (req, res) => {
    accounts.credit.balance = parseInt(accounts.credit.balance - req.body.amount);
    accounts.credit.available = parseInt(accounts.credit.available + req.body.amount);
    writeJSON();
    res.render('payment', {
        message: 'Payment Successful',
        account: accounts.credit
    });
});

module.exports = router;