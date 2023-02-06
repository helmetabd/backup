const dataDiagnose = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DIAG':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataDiagnose;