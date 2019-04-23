import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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

function SimpleCard (props) {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.title} color='textSecondary' gutterBottom>
        {sessionStorage.getItem('lang')==='en'? 'status ': 'الحاله'}: {props.status}
        </Typography>
        <Typography variant='h5' component='h2'>
          {props.nameInEnglish}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.addressHQ}
        </Typography>
        <Typography component='p'>
          <ul>

          <li>{sessionStorage.getItem('lang')==='en'? 'Company id': 'رقم حساب الشركه'}: {props.compid}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'addressHQ': 'عنوان الشركه '}: {props.addressHQ}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'regulationLaw': 'القانون المنظم'}: {props.regulationLaw} </li>
            <li>{sessionStorage.getItem('lang')==='en'? 'legalCompanyForm': 'شكل الشركه القانونى'}: {props.legalCompanyForm}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'nameInArabic': 'اسم الشركه'}: {props.nameInArabic}</li>
            <li> {sessionStorage.getItem('lang')==='en'? 'governerateHQ': 'المركز الرئيسى '}:{props.governerateHQ}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'cityHQ': 'المركز الرئيسى (المدينه)ه '}: {props.cityHQ}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'telephoneHQ': 'التليفون '}: {props.telephoneHQ}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'faxHQ': 'الفاكس '}: {props.faxHQ}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'capitalCurrency': 'عمله راس المال '}: {props.capitalCurrency}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'capital': 'راس المال '}: {props.capital}</li>
            <ul>{sessionStorage.getItem('lang')==='en'? 'investorName': 'اسم المستثمر'}:{props.investorName} </ul>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorSex': 'الجنس '}:{props.investorSex} </li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorNationality': 'الجنسيه '}: {props.investorNationality}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorIdentificationType': 'نوع اثبات الشخصيه '}: {props.investorIdentificationType}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorIdentificationNumber': 'رقم اثبات الشخصيه'}: {props.investorIdentificationNumber}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorBD': 'تاريخ الميلد'}: {props.investorBD}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorAddress': 'عنوان الاقامه'}: {props.investorAddress}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorTelephone': 'التليفون '}: {props.investorTelephone}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorFax': 'الفاكس'}: {props.investorFax}</li>
            <li>{sessionStorage.getItem('lang')==='en'? 'investorEmail': 'البريد الالكترونى'}:{props.investorEmail}</li>
  </ul>
          <br />

        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)
