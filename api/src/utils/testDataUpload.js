const { Language, HowFound } = require ('../db');
const { languagesData, howFoundData } = require('./testData');

const dataUploader = async () => {
    try {
        const Languages = await Language.bulkCreate(languagesData, {ignoreDuplicates: true});
        const howFound = await HowFound.bulkCreate(howFoundData, {ignoreDuplicates: true});
    } catch (error) {
        console.log(error);
    }
}

const dataCheck = async () => {
    const languageCheck = await Language.count();
    const howFoundCheck = await HowFound.count();
    return {languageCheck, howFoundCheck};
}

module.exports = {
    dataUploader,
    dataCheck
}