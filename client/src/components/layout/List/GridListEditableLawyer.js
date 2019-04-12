import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import CaseCard from '../cards/RequestsCardsEditableLawyer'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#555555',
  },
  gridList: {
    width: '80%',
    height:'auto',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit 
  }
})

class TitlebarGridList2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
    render() { 
      const { classes } = this.props;
      console.log(this.props.id)
        return (
            <div className={classes.root}>
             <GridList cellHeight={250} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                </GridListTile>
                {this.props.data.map((tile,i) => (
                  <GridListTile style={{width: 300}}>
                    
                   <CaseCard title={tile.nameInEnglish} comment={tile.reviewerComment} lawyer={tile.lawyer} key={i} id={tile._id} token= {this.props.token} subheader={tile.status} nameAr={tile.nameInArabic} data={tile} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          );
        }
}  

TitlebarGridList2.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitlebarGridList2)
