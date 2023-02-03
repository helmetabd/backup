// reducer adalah function biasa yang menerima 2 parameter, yaitu state dan action
const profileReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return true
            break;
        case 'SET_UNPROFILE':
            return false
            break;
        default:
            return state;
            break;
    }
}

export default profileReducer;