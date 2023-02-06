const dataDoctor = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOCTOR':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataDoctor;