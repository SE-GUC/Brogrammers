import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Manager from '../../pages/Manager';
import { Avatar } from '@material-ui/core'
import AssignmemtIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
    root: {
        width: '75%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500]
    }
});

class SimpleExpansionPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manager: '',
            expansiond: false,
            expansion: ''
        }
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick(js) {
        this.setState(prevState => {
            return {
                ...prevState.manager, manager: js
            }
        })
        this.state.expansion = true
        this.props.callBack(this.state.manager);
        console.log(this.props.expansion)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>
                            <Grid container direction='row' alignItems='center'>
                                <Avatar className={classes.greenAvatar}>
                                    <AssignmemtIcon />
                                </Avatar>
                                <Typography>

                                </Typography>
                                <Typography variant='h6' component='h3'>
                                    <p>
                                        {sessionStorage.getItem('lang') === 'en' ? 'Submit A New Manager' : 'تسجيل مدير جديد'}
                                    </p>
                                </Typography>
                            </Grid >
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Manager callBack={this.handleOnClick} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
