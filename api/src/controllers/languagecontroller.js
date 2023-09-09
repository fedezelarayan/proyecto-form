const { Language, HowFound } = require('../db');

const getLanguages = async(req, res) => {
try {
    const lang = await Language.findAll();
    res.status(200).json(lang);  
} catch (error) {
    res.status(400).json({error: error.message})
}
}

const getHowFound = async(req, res) => {
    try {
        const hf = await HowFound.findAll();
        res.status(200).json(hf);  
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    }

module.exports = {getLanguages, getHowFound}