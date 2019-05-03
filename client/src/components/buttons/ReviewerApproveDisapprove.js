import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

class ReviewerApproveDisapprove extends Component {
  constructor (props) {
    super(props)
  }

  approveTask () {
    fetch(`http://serverbrogrammers.herokuapp.com/api/reviewer/getTasks/approve/${this.props.compid}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      console.log(response)
      alert(sessionStorage.getItem('lang') === 'en' ? 'Task Approved!!... Now the company is established!!' : 'تم قبول الشركه  ... الان تم انشاء الشركه  '
      )
      this.forceUpdate()
    })
  }

  disapproveTask () {
    fetch(`http://serverbrogrammers.herokuapp.com/api/reviewer/getTasks/disapprove/${this.props.compid}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.token
      }
    }).then(response => {
      console.log(response)
      alert(sessionStorage.getItem('lang') === 'en' ? 'Task Approved!!... Dont forget to write a comment!!' : 'تم رفض الشركه  ... لا تنس اضافه التعليق  ')
      window.location.reload()
    })
  }

  render () {
    // console.log(this.props.compid)
    //  console.log(this.props.token)
    // onClick={this.claimTask.bind(this)}

    return (
      <div>
        <Button variant='contained' color='primary' size='medium' onClick={this.approveTask.bind(this)} > { sessionStorage.getItem('lang') === 'en' ? 'Accept Company' : 'قبول الشركه '}
        </Button>

        <Button variant='contained' color='secondary' size='medium' onClick={this.disapproveTask.bind(this)}>{ sessionStorage.getItem('lang') === 'en' ? 'Reject Company' : 'رفض الشركه '}</Button>

      </div>
    )
  }
}
export default ReviewerApproveDisapprove
