const { Survey, Language, HowFound } = require('../db');
const { Op } = require('sequelize')
const { sequelize } = require('../db')


const getSurveyByName = async (req, res) => {
    const { name } = req.query;
    try {
        const surveys = await Survey.findAll({
            where: {
                full_name: {
                    [Op.iLike]: `${name}`
                }
            },
            include: [
                {
                    model: Language,
                    attributes: ["name"],
                    through: { attributes: [] }
                }, {
                    model: HowFound,
                    attributes: ["name"],
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200).json(surveys);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createSurvey = async (req, res) => {
    const { full_name, phone_number, start_date, preferred_language, how_found } = req.body;
    const existingSurvey = await Survey.findOne({ where: { full_name } })

    try {
        if (existingSurvey) {
            throw new Error("Ya realizaste esta encuesta!")
        } else {
            const newSurvey = await Survey.create({ full_name, phone_number, start_date, preferred_language, how_found })
            await newSurvey.addLanguage(preferred_language);
            await newSurvey.addHowFound(how_found);
            res.status(200).json('Gracias por responder la encuesta!');
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editSurvey = async (req, res) => {
    const { full_name, phone_number, start_date, Languages, HowFounds } = req.body
    try {
        const findSurvey = await Survey.findOne({
            where: {
                full_name: {
                    [Op.iLike]: `${full_name}`
                }
            },
            include: [
                {
                    model: Language,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }, {
                    model: HowFound,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }
            ]
        });
        console.log("Languages: ", Languages);
        console.log("HowFounds: ", HowFounds);

        if (!findSurvey) { throw new Error("Primero debes realizar la encuesta.") }
        const updateFields = {};

        if (full_name) updateFields.full_name = full_name
        if (phone_number) updateFields.phone_number = phone_number
        if (start_date) updateFields.start_date = start_date

        await findSurvey.update(updateFields);

        if (Languages) {
            const languageIds = Array.isArray(Languages) ? Languages : [Languages];
            await findSurvey.setLanguages(languageIds);
        }
        if (HowFounds) {
            const howFoundIds = Array.isArray(HowFounds) ? HowFounds : [HowFounds];
            await findSurvey.setHowFounds(howFoundIds);
        }
        res.status(200).json({ "Encuesta modificada con éxito": findSurvey });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSurveyByName,
    createSurvey,
    editSurvey
}