const fs = require('fs');
const path = require('path');

// read the contents of the file at src/json/accounts.json
const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), 'utf8');
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8');
const users = JSON.parse(userData);

const writeJSON = () => {
    let accountsJSON = JSON.stringify(accounts);
    //write the variable accountsJSON to the json file
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
};

module.exports = {
    accounts,
    users,
    writeJSON
};