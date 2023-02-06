const dataConsult = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CONSULT':
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dataConsult;