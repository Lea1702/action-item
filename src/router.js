const express = require('express');
const bodyParser = require('body-parser');
const {sequelize, Workout} = require('./model');
const {getPollutionLevel} = require('../helpers/getPollutionLevel');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

const { Op } = require("sequelize");
const router = express.Router();

const cors=require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/workout', async (req, res) =>{
    try {
        const {type, lat, lon, duration, comments} = req.body;
        if (!type || !lat || !lon || !duration){
            res.status(404).json({ message: "Fields missing" });
        }
        let pollutionLevel = await getPollutionLevel(lat, lon);
        let newWorkout = await Workout.create({user: req.auth.user, type:  type, lat: lat, lon: lon, duration: duration, pollutionLevel: pollutionLevel, comments: comments});
        res.json({"id" : newWorkout.id}); 
    }
    catch(err){
        res.status(404).json({ message: `${err}` });
    }
})

router.put('/workout/:id', async (req, res) =>{
    try {
        const {type, lat, lon, duration, comments} = req.body;
        let pollutionLevel;
        if (lat || lon) {
            pollutionLevel = await getPollutionLevel(lat, lon);
        }
        let update = await Workout.update({type: type, lat: lat, lon: lon, duration: duration, pollutionLevel: parseInt(pollutionLevel), comments: comments} ,{where: {id: req.params.id}});
        if (update < 1) {
            res.status(404).json({ message: 'id does not exist' });
        }
        let updatedWorkout = await Workout.findOne({where : {id: req.params.id}});
        res.json("updated"); 
    }
    catch(err){
        res.status(404).json({ message: `${err}` });
    }
})

router.delete('/workout/:id', async (req, res) =>{
    try {
        await Workout.destroy({where: {id: req.params.id}});
        res.json({ message:"Successfully deleted"}); 
    }
    catch(err){
        res.status(404).json({ message: `${err}` });
    }
})

router.get('/workouts', async (req, res) =>{
    try {
        const {startDate, endDate, minPollution, maxPollution} = req.body;
        let workouts = await Workout.findAll({where : { [Op.and] : [
            {user: req.auth.user}, 
            {createdAt:  
                    {   [Op.between]: [startDate, endDate] }
            },
            {pollutionLevel:        
                    {   [Op.between]: [minPollution, maxPollution] }
            }
        ]}});
        res.json(workouts); 
    }
    catch(err){
        res.status(404).json({ message: `${err}` });
    }
})

module.exports = router;