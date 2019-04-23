import React, { Component } from "react";
import MyLawyerCasesCard from "../cards/MyLawyerCasesCard";
import Button from "@material-ui/core/Button";
import LawyerCommentCard from "../cards/LawyerCommentCard";

class LawyerComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id : this.params.id,
      companies: [],
      isLoadied: false
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/lawyer/getRejectedTasks/Lawyer`, {
      headers: new Headers({
        'x-access-token': sessionStorage.getItem("jwtToken")
      }) })
      .then(response => response.json())
      .then(json => {
        console.log(json.data)
        this.setState({ isLoadied: true, companies: json.data });
      });
  }

  render() {
    var { isLoadied, companies } = this.state;
    if (!isLoadied) {
      return <div> Loading ...</div>;
    } else {
      console.log(this.state.companies)
      if (!this.state.companies) {
        return (
          <h1>
            {sessionStorage.getItem("lang") === "en"
              ? "There are no companies to comment"
              : "لا يوجد لديك شركات"}
          </h1>
        );
      }
      {
        const listItems = this.state.companies.map((element, i) => (
          <div>
            <LawyerCommentCard
              key={i}
              title={"helo"}
              info={element.investorName}
              status={element.status}
              compid={element._id}
              nameInEnglish={element.nameInEnglish}
              token={this.props.token}
              addressHQ={element.addressHQ}
              Status={element.status}
              addressHQ={element.addressHQ}
              regulationLaw={element.regulationLaw}
              legalCompanyForm={element.legalCompanyForm}
              nameInArabic={element.nameInArabic}
              governerateHQ={element.governerateHQ}
              cityHQ={element.cityHQ}
              telephoneHQ={element.telephoneHQ}
              faxHQ={element.faxHQ}
              capitalCurrency={element.capitalCurrency}
              capital={element.capital}
              investorName={element.investorName}
              investorSex={element.investorSex}
              investorNationaty={element.investorNationaty}
              investorIdentificationType={element.investorIdentificationType}
              investorIdentificationNumber={
                element.investorIdentificationNumber
              }
              investorBD={element.investorBD}
              investorAddress={element.investorAddress}
              investorTelephone={element.investorTelephone}
              investorFax={element.investorFax}
              investorEmail={element.investorEmail}
            />
            <br />
          </div>
        ));

        return <div>{listItems}</div>;
      }
    }
  }
}
export default LawyerComment;
