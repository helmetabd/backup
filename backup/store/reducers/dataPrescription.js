const dataPrescription = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PRES':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataPrescription;