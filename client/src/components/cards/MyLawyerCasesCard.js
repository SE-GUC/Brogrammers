import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LawyerApproveDisapprove from '../buttons/LawyerApproveDisapprove'
import MultiLine from '../layout/inputs/MultiLine';

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

class MyLawyerCasesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment:null
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let value = e.target.value;
    this.setState(
       {
          comment:value
        },
      
      () => console.log(value)
    );
  }

  render(){
    const { classes } = this.props
  return (
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {sessionStorage.getItem('lang') === 'en' ? 'Status' : 'حالة الشركه '}: {this.props.status}
        </Typography>
        <Typography variant='h5' component='h2'>
          {this.props.nameInEnglish}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {this.props.addressHQ}
        </Typography>
        <Typography component='p'>
          <ul>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'Company id' : 'رقم حساب الشركه'}: {this.props.compid}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'addressHQ' : 'عنوان الشركه '}: {this.props.addressHQ}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'regulationLaw' : 'القانون المنظم'}: {this.props.regulationLaw} </li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'legalCompanyForm' : 'شكل الشركه القانونى'}: {this.props.legalCompanyForm}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'nameInArabic' : 'اسم الشركه'}: {this.props.nameInArabic}</li>
            <li> {sessionStorage.getItem('lang') === 'en' ? 'governerateHQ' : 'المركز الرئيسى '}:{this.props.governerateHQ}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'cityHQ' : 'المركز الرئيسى (المدينه)ه '}: {this.props.cityHQ}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'telephoneHQ' : 'التليفون '}: {this.props.telephoneHQ}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'faxHQ' : 'الفاكس '}: {this.props.faxHQ}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'capitalCurrency' : 'عمله راس المال '}: {this.props.capitalCurrency}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'capital' : 'راس المال '}: {this.props.capital}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorName' : 'اسم المستثمر'}:{this.props.investorName} </li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorSex' : 'الجنس '}:{this.props.investorSex} </li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorNationality' : 'الجنسيه '}: {this.props.investorNationality}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorIdentificationType' : 'نوع اثبات الشخصيه '}: {this.props.investorIdentificationType}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorIdentificationNumber' : 'رقم اثبات الشخصيه'}: {this.props.investorIdentificationNumber}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorBD' : 'تاريخ الميلد'}: {this.props.investorBD}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorAddress' : 'عنوان الاقامه'}: {this.props.investorAddress}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorTelephone' : 'التليفون '}: {this.props.investorTelephone}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorFax' : 'الفاكس'}: {this.props.investorFax}</li>
            <li>{sessionStorage.getItem('lang') === 'en' ? 'investorEmail' : 'البريد الالكترونى'}:{this.props.investorEmail}</li>

          </ul>
          <br />
          <MultiLine callBack={this.onChange}/>

        </Typography>
      </CardContent>
      <CardActions>
        <LawyerApproveDisapprove token={this.props.token} compid={this.props.compid} comment={this.state.comment}/>
      </CardActions>
    </Card>
  )
}
}

MyLawyerCasesCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyLawyerCasesCard)
