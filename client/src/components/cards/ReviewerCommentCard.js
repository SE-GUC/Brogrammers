import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import ReviewerAddComment from '../buttons/ReviewerAddComment'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

 


function ReviewerCommentCard (props) {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>
console.log(props.id)



  return (
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          status: {props.status}
        </Typography>
        <Typography variant='h5' component='h2'>
          {props.nameInEnglish}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.addressHQ}
        </Typography>
        <Typography component='p'>
          <ul>
            <li>Company id: {props.compid}</li>
            <li>addressHQ: {props.addressHQ}</li>
            <li>regulationLaw: {props.regulationLaw} </li>
            <li>legalCompanyForm: {props.legalCompanyForm}</li>
            <li>nameInArabic: {props.nameInArabic}</li>
            <li> governerateHQ:{props.governerateHQ}</li>
            <li>cityHQ: {props.cityHQ}</li>
            <li>telephoneHQ: {props.telephoneHQ}</li>
            <li>faxHQ: {props.faxHQ}</li>
            <li>capitalCurrency: {props.capitalCurrency}</li>
            <li>capital: {props.capital}</li>
            <ul>investorName:{props.investorName} </ul>
            <li>investorSex:{props.investorSex} </li>
            <li>investorNationality: {props.investorNationality}</li>
            <li>investorIdentificationType: {props.investorIdentificationType}</li>
            <li>investorIdentificationNumber: {props.investorIdentificationNumber}</li>
            <li>investorBD: {props.investorBD}</li>
            <li>investorAddress: {props.investorAddress}</li>
            <li>investorTelephone: {props.investorTelephone}</li>
            <li>investorFax: {props.investorFax}</li>
            <li>investorEmail:{props.investorEmail}</li>
          </ul>
          <br />

        </Typography>
      </CardContent>
      <CardActions>
        <ReviewerAddComment token={props.token} compid={props.compid} ></ReviewerAddComment>
      </CardActions>
    </Card>
  )
}

ReviewerCommentCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReviewerCommentCard)
