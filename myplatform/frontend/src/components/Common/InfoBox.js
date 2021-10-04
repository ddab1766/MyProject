import React from 'react';
import {makeStyles} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import {Link} from "react-router-dom";
import {Panel, Button} from "rsuite";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // textAlign: "center",
        backgroundColor: '#e9f5fe',
        color: '#000000',
        marginTop: "25px",
        animation: "messageMoveIn 0.3s ease-in forwards"
    },
    container:{
        padding: '20px',
        paddingLeft: '45px',
        marginBottom:'10px',
    },
    icon: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        lineHeight: 1
    },
    content: {

    },
    link: {
        marginTop: '10px',
    }
}));

export default function InfoBox({text, url}) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.icon}
                         // style={{'color': "#7466ff"}}
                    >
                        <InfoIcon fontSize="small"/>
                        {/*<i className="rs-icon rs-icon-info" style={{'color':'#2196f3'}}/>*/}
                    </div>
                    <div className={classes.content}>
                        {/*<InfoIcon/>*/}
                        {text}
                    </div>
                    {url && (
                        <div className={classes.link}>
                            <Link to={url}>
                                <button className="btn btn-info">바로가기</button>
                                {/*<Button appearance="primary" size="sm">바로가기</Button>*/}
                                {/*<Button color="primary" variant="outlined">바로가기</Button>*/}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

