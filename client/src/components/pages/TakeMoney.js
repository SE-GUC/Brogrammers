import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
 
export default class TakeMoney extends React.Component {
  onToken = (token) => {
    fetch(`https://serverbrogrammers.herokuapp.com/api/investors/stripe/${this.props.companyid}`, {
      method: 'POST',
      body: JSON.stringify({
        stripeToken:token.id ,
      //amount:99999999
      amount:this.props.ammount
    }),
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000',
        }
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
        console.log(data)
      });
    });
    console.log(token)
  }
 
  // ...
  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_19keR4iqrWQ4d2wyomU9uT2p00GMRav5aW"
      />
    )
  }
}
