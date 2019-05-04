import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import CaseCard from '../cards/RequestsCards'
import Zoom from '@material-ui/core/Zoom'
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
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
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
      <Grid
        container
        spacing={40}
        alignItems='center'

      >
        <Grid item xs={12} key='Subheader' />
        {this.props.data.map((tile, i) => (
          <Grow in='true'>
            <Grid item xs={12} md={4} sm={6} style={{ backgroundColor: 'rgba(200,200,200,0.2)' }}>
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
