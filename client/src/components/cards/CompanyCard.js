import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
const styles = {
  card: {
    minWidth: 300
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

function CompanyCard(props) {
  const { classes } = props
  console.log(props)
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.nameInEnglish}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.addressHQ}
        </Typography>
        <Typography component="p">
          <ul>
            <li>addressHQ: {props.addressHQ}</li>
            <li>regulationLaw: {props.regulationLaw} </li>
            <li>legalCompanyForm: {props.legalCompanyForm}</li>
            <li>nameInArabic: {props.nameInArabic}</li>
            <li> governerateHQ:{props.governerateHQ}</li>
            <li>cityHQ: {props.cityHQ}</li>
            <li>telephoneHQ: {props.telephoneHQ}</li>
            <li>faxHQ: {props.faxHQ}</li>
          </ul>
          <br />
        </Typography>
      </CardContent>
    </Card>
  )
}

CompanyCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CompanyCard)
