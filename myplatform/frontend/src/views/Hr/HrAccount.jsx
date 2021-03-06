import React, {useCallback, useEffect, useState} from "react";
// reactstrap components
import {Container} from "reactstrap";
import {connect, useDispatch, useSelector} from "react-redux";
import LoaderSpinner from "../../components/Etc/LoaderSpinner";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {getHrCoworker} from "../../actions/hrcoworkerActions";
import HrCoworker from "../../components/Hr/HrCoworker";
import {deleteInvite, getInvite, inviteCoworker} from "../../actions/coworkerActions";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import Nothing from "../../components/Common/Nothing";

const HrAccountView = (props) => {
    const {company, coworker} = props;
    const [inviteAlert, setInviteAlert] = useState(false);
    const [invitedEmail, setInvitedEmail] = useState([]);

    const {user} = useSelector( state => ({ user: state.auth.user}));

    const dispatch = useDispatch();
    const onGetCoworker = useCallback(() => dispatch(getHrCoworker()), []);
    const onDeleteCoworker = (id) => dispatch(deleteInvite(id));

    useEffect(() => {
        onGetCoworker();
    }, []);

    useEffect(()=>{
        getInvite().then((data)=>{
            setInvitedEmail(data)
        });
    },[]);

    const inputConfirmAlert = email => {
        inviteCoworker({'email': email}).then((data)=>{
            setInvitedEmail(...invitedEmail, [data])
        });
        setInviteAlert(false)
    };
    const hideAlert = () => setInviteAlert(null);

    return user ? (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>
                            ????????????<br/>
                            <small>?????? ????????? ????????? ???????????????.</small>
                        </h5>
                    </div>
                    <div className="text-right">
                        <button
                            className="btn btn-info"
                            onClick={() => setInviteAlert(true)}
                        >
                            ????????? ?????? ??????
                        </button>
                    </div>
                    {inviteAlert && (
                        <ReactBSAlert
                            input
                            showCancel
                            style={{display: "block", marginTop: "100px"}}
                            title="????????? ??????"
                            onConfirm={(e) => inputConfirmAlert(e)}
                            onCancel={() => hideAlert()}
                            confirmBtnBsStyle="info"
                            cancelBtnBsStyle="danger"
                        >* ??????????????? ???????????? ????????? ????????? ????????? ????????????.
                        </ReactBSAlert>
                    )}

                    {<HrCoworker/>}

                    <hr/>


                    <>
                        <Card variant="outlined">
                            <CardContent>
                                ????????????
                                <List >
                                    {invitedEmail.length > 0 ? (
                                        <>
                                            {invitedEmail.map( item => {
                                                if(!item.accepted){
                                                    return (
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar/>
                                                            </ListItemAvatar>
                                                            <ListItemText primary={item.email} secondary={!item.accepted && '?????? ?????????'}/>
                                                            <IconButton aria-label="delete" >
                                                                <DeleteIcon fontSize="small" onClick={()=>{
                                                                    console.log('item.id', item.id)
                                                                    onDeleteCoworker(item.id)
                                                                    setInvitedEmail(invitedEmail.filter(v => v.id !== item.id))
                                                                }}/>
                                                            </IconButton>
                                                        </ListItem>
                                                    )
                                                }
                                            })}
                                        </>
                                    ) : ( <Nothing text="????????? ???????????? ????????????."/>)}
                                </List>
                            </CardContent>
                        </Card>
                    </>


                </Container>
            </div>

        </>
    ) : (<LoaderSpinner/>)
};


function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user: state.auth.user,
        coworker: state.coworker.coworker
    }
}

export default connect(mapStateToProps, {getHrCoworker})(HrAccountView);

