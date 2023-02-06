const dataReferral = (state = {}, action) => {
    switch (action.type) {
        case 'SET_REFER':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataReferral;