import React from 'react'
import {connect} from 'react-redux'
import {addTodo} from './../stores/actions/index'

let AddTodo = ({ dispatch,subscribe,getState}) => {
    let input;
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTodo(input.value));
                    // console.log(subscribe);
                    input.value = ''
                }}
            >
                <input
                    ref={node => {
                        input = node
                    }}
                />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
};
AddTodo = connect()(AddTodo);

export default AddTodo