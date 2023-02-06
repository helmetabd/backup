const dataMedic = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MEDIC':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataMedic;