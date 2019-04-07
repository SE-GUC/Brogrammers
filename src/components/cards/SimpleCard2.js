import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard2 extends React.Component {
  render(){
    const { classes } = this.props;
  //const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {this.props.t2.map((item,key) => (
            <p key={item._id}>Company Name: {item.nameInEnglish}
            <li>Status: {item.status}</li>
            <li>addressHQ: {item.addressHQ}</li>
            <li>regulationLaw: {item.regulationLaw} </li>
      <li>legalCompanyForm: {item.legalCompanyForm}</li>
        <li>nameInArabic: {item.nameInArabic}</li>
     <li> governerateHQ:{item.governerateHQ}</li>
      <li>cityHQ: {item.cityHQ}</li>
      
      <li>telephoneHQ: {item.telephoneHQ}</li>
      <li>faxHQ: {item.faxHQ}</li>
      <li>capitalCurrency: {item.capitalCurrency}</li>
      <li>capital: {item.capital}</li>
      <ul>investorName:{item.investorName} </ul>
      <li>investorSex:{item.investorSex} </li>
      <li>investorNationality: {item.investorNationality}</li>
      <li>investorIdentificationType: {item.investorIdentificationType}</li>
      <li>investorIdentificationNumber: {item.investorIdentificationNumber}</li>
      <li>investorBD: {item.investorBD}</li>
      <li>investorAddress: {item.investorAddress}</li>
      <li>investorTelephone: {item.investorTelephone}</li>
      <li>investorFax: {item.investorFax}</li>
      <li>investorEmail:{item.investorEmail}</li>
     
            
            </p>
            
           
          ))}
        
          
        </Typography>
        <Typography variant="h5" component="h2" >
  
        </Typography>
       
        <Typography component="p">
        
    
       
        </Typography>
      </CardContent>
      <CardActions>
      
      </CardActions>
    </Card>
  );
}
}
// SimpleCard2.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(SimpleCard2);