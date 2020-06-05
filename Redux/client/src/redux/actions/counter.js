

export const incrementCounter = () => dispatch => {
    dispatch({
        type: "INCREMENT"
    })
}

export const decrementCounter = () => dispatch => {
    dispatch({
        type: "DECREMENT"
    })
}