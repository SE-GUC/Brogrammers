import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import DeleteReviewerButton from '../buttons/DeleteReviewerButton'
import Typography from '@material-ui/core/Typography'
// import Button2 from '../buttons/Button2'
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

 


function ViewReviewersByAdminCard (props) {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>




  return (
      
    <Card className={classes.card}>
      <CardContent >
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          {/* status: {props.status} */}
       {/* Birth Date: {props.birthDate} */}
       
        </Typography>
        <Typography variant='h5' component='h2'>
          {/* {props.nameInEnglish} */}
          {props.name}
         

        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {/* {props.addressHQ} */}
        
         E-mail:{props.email}
          <br></br>
          Phone Number:{props.phone}
        </Typography>
        <Typography component='p'>
         {/* insert the data in the list here */}
          {/* <ul>
            <li>Company id: {props.compid}</li>
            
          </ul>
          <br /> */}
            Gender:{props.gender}
            <br></br>
            Age: {props.age}
            <br></br>
          Years of Experience: {props.yearsOfExperience}
          <br></br>
         

        </Typography>
      </CardContent>
      <CardActions>
        <DeleteReviewerButton  token={props.token} id={props.id} ></DeleteReviewerButton>
        <br></br>
      </CardActions>
    </Card>
  )
}

ViewReviewersByAdminCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ViewReviewersByAdminCard)
