import React from 'react'
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  render () {
  return (
    <div>
      <p>{this.props.todo.title}</p>
    </div>
  )
  }
}

//PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
}

export default TodoItem;
