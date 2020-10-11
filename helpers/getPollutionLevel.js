const { key } = require('../config/default.json');
const axios = require('axios');

const getPollutionLevel = async (lat, lon) =>  {
    try {
        let res = await axios.get(`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${parseFloat(lat)}&lon=${parseFloat(lon)}&key=${key}&features=breezometer_aqi`);
        return res.data.data.indexes.baqi.aqi;
    }
    catch (e) {
        throw e;
    }
}

module.exports = {getPollutionLevel};