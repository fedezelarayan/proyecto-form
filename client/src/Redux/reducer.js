import { BYNAME, HOWFOUND, LANGUAGES, SURVEYS } from './actions';

const initialState = {
    surveys: [],
    languages: [],
    howfound: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case SURVEYS:
            return {
                ...state,
                surveys: action.payload,
            }
        case LANGUAGES:
            return {
                ...state,
                languages: action.payload,
            }
        case HOWFOUND:
            return {
                ...state,
                howfound: action.payload,
            }
        case BYNAME:
            return {
                ...state,
                surveys: action.payload
            }

        default:
            return { ...state };
    }
}

export default rootReducer;