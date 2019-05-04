
import React, { Component } from 'react'
// import SimpleCard from '../cards/SimpleCard3'
import ViewReviewersByAdminCard from '../cards/ViewReviewersByAdminCard'
import LinearDeterminate from "../layout/loading/CustomizedProgress"
class ViewReviewersByAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewersOnSystem: [],
      isLoaded:false

    }
  }

  componentDidMount () {
    {
      fetch('https://serverbrogrammers.herokuapp.com/api/reviewer/', {
        headers: new Headers({
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          this.setState({ isLoaded:true,
            reviewersOnSystem: json.data
          })
        })
    }
  }

  render () {
    if(!this.state.isLoaded){return <LinearDeterminate/>}
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
