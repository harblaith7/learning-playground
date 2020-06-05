import React, { Component } from 'react'
import {connect} from "react-redux"
import {incrementCounter} from "./redux/actions/counter"

 class ButtonIncrement extends Component {
    render() {
        return (
            <button>
                Increase count
            </button>
        )
    }
}

export default connect(null, {incrementCounter})(ButtonIncrement)
