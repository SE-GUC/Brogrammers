import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CaseCard from '../cards/RequestsCards'
import Grow from '@material-ui/core/Grow'
import { Grid } from '@material-ui/core'
const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(200,200,200,0.4)'
  },
  gridList: {
    height: 'auto',
  
    
    paddingBottom: theme.spacing.unit
  }
})

class TitlebarGridList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { classes } = this.props
    return (
     <Grid container>
   
        {this.props.data.map((tile, i) => (
          <Grow in='true'>
            <Grid item xs={12} md={4} sm={6} lg={4} style={{marginBottom:40,padding:20}} >
              {' '}
              <CaseCard
                title={tile.nameInEnglish}
                comment={tile.lawyerComment}
                lawyer={tile.lawyer}
                key={i}
                id={tile._id}
                token={sessionStorage.getItem('jwtToken')}
                subheader={tile.status}
                nameAr={tile.nameInArabic}
                data={tile}

              />
            </Grid>
          </Grow>
        ))}
      </Grid>
    )
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitlebarGridList)
