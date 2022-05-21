const express = require('express')
const app = express()
const bodyParser = require("express");
const port = 5000;
const { Sequelize, DataTypes} = require('sequelize');

let path;

switch (process.env.NODE_ENV) {
    case "prod": path = `${__dirname}/.env.prod`;
    break;
    case "dev": path = `${__dirname}/.env.dev`;
    break;
    default: path = `${__dirname}/.env.local`;
}

require('dotenv').config({ path: path });

app.use(bodyParser.json());

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const sequelize = new Sequelize('practice', 'postgres', '1q2w3e4r', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = sequelize.define('User', {
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

const sequelizeSync = async () => {
    await sequelize.sync({force: true});

    const user = User.build({
        email: "test@test.com",
        password: "test11"
    })

    await user.save();


}

sequelizeSync();

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
