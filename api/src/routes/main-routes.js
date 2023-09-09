const  { Router } = require('express');
const {getLanguages, getHowFound} = require('../controllers/languagecontroller')
const {getSurveyByName, createSurvey, editSurvey} = require('../controllers/surveyControllers')

const router = Router();

router.post('/survey/create', createSurvey);
router.put('/survey/edit', editSurvey)
router.get('/survey', getSurveyByName)
router.get('/languages', getLanguages)
router.get('/howfound', getHowFound)

module.exports = router;