import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        padding: "50px"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    container:{
        marginBottom:'10px',
    }
}));

export default function Nothing(props) {
    const {text} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ErrorOutlineIcon style={{color: '#b8c4d0', fontSize: '50px'}}/>
            {/*<i className="fa fa-exclamation-circle" style={{fontSize: "xx-large"}}/>*/}
            <Typography className={classes.heading}> {text} </Typography>
        </div>
    );
}

