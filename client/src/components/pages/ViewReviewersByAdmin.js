
import React, { Component } from 'react'
// import SimpleCard from '../cards/SimpleCard3'
import ViewReviewersByAdminCard from '../cards/ViewReviewersByAdminCard'

class ViewReviewersByAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewersOnSystem: []

    }
  }

  componentDidMount () {
    {
      fetch('http://serverbrogrammers.herokuapp.com/api/reviewer/', {
        headers: new Headers({
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          this.setState({
            reviewersOnSystem: json.data
          })
        })
    }
  }

  render () {
    const listItems = this.state.reviewersOnSystem.map((item, i) => (
      <div>
        <ViewReviewersByAdminCard key={i}
          token={this.props.token}
          id={item._id}
          name={item.name}
          address={item.address}
          email={item.email}
          gender={item.gender}
          phone={item.phone}
          birth={item.birth}
          age={item.age}
          yearsOfExperience={item.yearsOfExperience}

        />
        <br />
      </div>

    )

    )

    return (
      <div>

        {listItems}
        <br />

      </div>

    )
  }
}

export default ViewReviewersByAdmin
