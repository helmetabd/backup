const dataProfile = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
            break;
        case 'SET_IMAGE':
            return {...state, coverImage: action.payload};
            break;
        default:
            return state;
            break;
    }
}

export default dataProfile;