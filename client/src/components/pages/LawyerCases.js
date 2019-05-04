
import React, { Component } from 'react'
import SimpleCard from '../cards/SimpleCard'
import LinearDeterminate from "../layout/loading/CustomizedProgress"
class LawyerCases extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lawyerCases: [],
      isLoaded:false

    }
  }

  componentDidMount () {
    {
      fetch('https://serverbrogrammers.herokuapp.com/api/lawyer/getAllTasks/view', {
        headers: new Headers({
          //  'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTllN2VlN2E0MDNjMDc3YzM3ZGNkMSIsImlhdCI6MTU1NDYzODgzMCwiZXhwIjoxNTU0NzI1MjMwfQ.bEFsxvXTTktmM0JxCPxaiqxmPd3WpjIJRrOEFOfVI8M'
          // if login setted token correctly this should work
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          this.setState({ isLoaded:true,
            lawyerCases: json.data
          })
        })
    }
  }

  render () {
    if(!this.state.isLoaded){return <LinearDeterminate/>}else{
    const listItems = this.state.lawyerCases.map((item, i) => (
      <div>
        <SimpleCard key={i} nameInEnglish={item.nameInEnglish} status={item.status}
          compid={item._id}

          token={this.props.token}
          addressHQ={item.addressHQ}
          Status={item.status}
          addressHQ={item.addressHQ}
          regulationLaw={item.regulationLaw}
          legalCompanyForm={item.legalCompanyForm}
          nameInArabic={item.nameInArabic}
          governerateHQ={item.governerateHQ}
          cityHQ={item.cityHQ}

          telephoneHQ={item.telephoneHQ}
          faxHQ={item.faxHQ}
          capitalCurrency={item.capitalCurrency}
          capital={item.capital}
          investorName={item.investorName}
          investorSex={item.investorSex}
          investorNationaty={item.investorNationaty}
          investorIdentificationType={item.investorIdentificationType}
          investorIdentificationNumber={item.investorIdentificationNumber}
          investorBD={item.investorBD}
          investorAddress={item.investorAddress}
          investorTelephone={item.investorTelephone}
          investorFax={item.investorFax}
          investorEmail={item.investorEmail}

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
}

export default LawyerCases
