const dataDoctor = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DOCTOR':
            return action.payload;
            break;
        case 'SET_IMAGE':
            return {...state, coverImage: action.payload};
            break;
        case 'DELETE_FAVORITE':
            return state.filter(shiba => {
                if (shiba.id != action.payload.id) {
                    return state
                }
            })
            break;
        default:
            return state;
            break;
    }
}

export default dataDoctor;