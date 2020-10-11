const { User} = require('./src/model');
const { Op } = require("sequelize");

module.exports.getUserByName = async function (username, password) {
    return await User.findOne({where : { [Op.and] : [{name:  username}, {password:password}]}});
};

module.exports.saveUser = async function (name, password, age, city) {
    const userResult = await User.findOne({where: {name: name}})
    if (userResult) throw new Error('name is taken');
    const newUserToCreate = {
        name: name,
        password: password,
        age: age,
        city: city
    };
    try {
        await User.create({ 
            name: newUserToCreate.name, 
            password: newUserToCreate.password, 
            age: newUserToCreate.age, 
            city: newUserToCreate.city});
    }
    catch (error) {
        throw new Error(`error creating the user in the database ${error}`);
    }
};