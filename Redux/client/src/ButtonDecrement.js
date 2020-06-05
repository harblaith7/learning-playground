import React, { Component } from 'react'
import {decrementCounter} from "./redux/actions/counter"
import {connect} from "react-redux"

 class ButtonDecrement extends Component {
    render() {
        return (
            <button onClick = {() => {this.props.decrementCounter()}}>
                Decrease Count
            </button>
        )
    }
}

export default connect(null, {decrementCounter})(ButtonDecrement)
