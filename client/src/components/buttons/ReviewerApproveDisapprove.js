import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class ReviewerApproveDisapprove extends Component {
  constructor(props) {
    super(props)
  }

  approveTask() {
    fetch(
      `https://serverbrogrammers.herokuapp.com/api/reviewer/getTasks/approve/${
        this.props.compid
      }`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.props.token
        }
      }
    ).then(response => {
      console.log(response)
      alert(
        sessionStorage.getItem('lang') === 'en'
          ? 'Task Approved!!... Now the company is established!!'
          : 'تم قبول الشركه  ... الان تم انشاء الشركه  '
      )
      window.location.reload()
      this.forceUpdate()
    })
  }

  disapproveTask() {
    if (!this.props.comment) {
      alert('Please Leave a Comment')
      //   return <Snackbar message="Please leave a comment" variant="warning" />
      //   return <Snackbar variant='warning' message={sessionStorage.getItem('lang') === 'en' ? 'There are no requests' : 'لا يوجد شركات'} />
    } else {
      console.log(this.props.comment)
      fetch(
        `https://serverbrogrammers.herokuapp.com/api/reviewer/getTasks/disapprove/${
          this.props.compid
        }`,
        {
          method: 'PUT',
          body: JSON.stringify({ comment: this.props.comment }),
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.props.token
          }
        }
      ).then(response => {
        console.log(response)
        window.location.reload()
        this.forceUpdate()
        //  alert(sessionStorage.getItem('lang') === 'en' ? 'Task Approved!!... Dont forget to write a comment!!' : 'تم رفض الشركه  ... لا تنس اضافه التعليق  ')
        //   window.location.reload()
      })
    }
  }

  render() {
    // console.log(this.props.compid)
    //  console.log(this.props.token)
    // onClick={this.claimTask.bind(this)}

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={this.approveTask.bind(this)}
        >
          {' '}
          {sessionStorage.getItem('lang') === 'en'
            ? 'Accept Company'
            : 'قبول الشركه '}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={this.disapproveTask.bind(this)}
        >
          {sessionStorage.getItem('lang') === 'en'
            ? 'Reject Company'
            : 'رفض الشركه '}
        </Button>
      </div>
    )
  }
}
export default ReviewerApproveDisapprove
