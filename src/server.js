const express = require("express");
const bodyParser = require("body-parser");
const {sequelize} = require('./model')

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

const cors=require('cors');
app.use(cors());
const Users = require('../users');

const basicAuth = require('express-basic-auth')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const workoutRoute =  require('./router');

app.post('/register', async function (req, res) {
    const { name, password, age, city } = req.body;
    try {
        await Users.saveUser(name, password, age, city);
        res.status(200).json({
            message: 'Succeffuly signed up'
        })
    }
    catch (err) {
        res.status(404).json({ message: `Failed at registration, ${err}` });
    }
});   

app.use('/workout', basicAuth({
    authorizer: async (username, password, cb) =>  {
        const user = await Users.getUserByName(username, password);
    if (user) {
        return cb(null, true);
    } else {
        return cb(null, false);
    } },
    authorizeAsync: true,
  }), workoutRoute);
app.listen(3002, () => console.log(`Example app listening at http://localhost:3002`));