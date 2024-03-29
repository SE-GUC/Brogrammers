import React, { Component } from 'react'

import Button from '@material-ui/core/Button'

class ReviewerButton extends Component {
  constructor (props) {
    super(props)
  }

  claimTask () {
    fetch(`https://serverbrogrammers.herokuapp.com/api/reviewer/assignFreeTask/${this.props.compid}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      console.log(response)
      alert(sessionStorage.getItem('lang') === 'en' ? 'Task claimed' : 'قبول المهمه ')
      window.location.reload()
    })
  }

  render () {
    return (
      <div>
        <Button variant='contained' color='primary' size='medium' onClick={this.claimTask.bind(this)}>{ sessionStorage.getItem('lang') === 'en' ? 'Claim Task ' : 'قبول المهمه '}</Button>

      </div>
    )
  }
}
export default ReviewerButton
