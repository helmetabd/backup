const dataPatient = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PATIENT':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataPatient;