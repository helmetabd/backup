const dataCart = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CART':
            return [ ...state, action.payload ]
            break;
        default:
            return state;
            break;
    }
}

export default dataCart;