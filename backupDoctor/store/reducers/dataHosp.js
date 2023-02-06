const dataHospital = (state = {}, action) => {
    switch (action.type) {
        case 'SET_HOSP':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataHospital;