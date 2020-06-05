

export const count = (state = 0, action) => {
    const {type, payload} = action;

    switch(type){
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state
    }
}