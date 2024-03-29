
import React, { Component } from 'react'
import SimpleCard from '../cards/SimpleCard3'
import LinearDeterminate from "../layout/loading/CustomizedProgress"
class AdminCases extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      adminCases: [],
      isLoaded:false

    }
  }

  componentDidMount () {
    {
      fetch('https://serverbrogrammers.herokuapp.com/routes/api/admins/getall/cases', {
        headers: new Headers({
        //   'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTk0MDYwM2I2M2Y1MTllYzZhN2EzOCIsImlhdCI6MTU1NDU5NTkzNiwiZXhwIjoxNTU0NjgyMzM2fQ.eKcFvWF1evQ_qpApNA9Qwlag9WCa00E7brE2dWI5Q40'
        // if login is working and passing token correctly this will work
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          this.setState({ isLoaded:true,
            adminCases: json.data
          })
        })
    }
  }

  render () {
   
if(!this.state.isLoaded){return <LinearDeterminate/>}
    const listItems =
    this.state.adminCases.map((item) => (
      <div>
        <SimpleCard key={item._id} nameInEnglish={item.nameInEnglish} status={item.status}
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

export default AdminCases
