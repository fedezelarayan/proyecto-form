import axios from 'axios';
export const SURVEYS = "SURVEYS";
export const LANGUAGES = "LANGUAGES";
export const HOWFOUND = "HOWFOUND";
export const BYNAME = "BYNAME";

const URL = "http://localhost:3001";

export function getSurveys() {
    return async function (dispatch) {
        const apiSurveys = await axios.get(`${URL}/surveys`);
        const surveys = apiSurveys.data;
        dispatch({ type: SURVEYS, payload: surveys })
    }
}

export function getLanguages() {
    return async function (dispatch) {
        const apiLang = await axios.get(`${URL}/languages`);
        const lang = apiLang.data;
        dispatch({ type: LANGUAGES, payload: lang })
    }
}
export function getHowFound() {
    return async function (dispatch) {
        const apiHF = await axios.get(`${URL}/howfound`);
        const HF = apiHF.data;
        dispatch({ type: HOWFOUND, payload: HF })
    }
}
export function getByName(name) {
    return async function (dispatch) {
        try {
            const byName = await axios.get(`${URL}/survey?name=${name}`)
            const gName = byName.data;
            return dispatch({ type: BYNAME, payload: gName })
        } catch (error) {
            alert((error) => error.message)
        }

    }
}