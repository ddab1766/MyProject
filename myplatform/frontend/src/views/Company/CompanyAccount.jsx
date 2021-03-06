import React, {useCallback, useEffect, useState} from "react";
// reactstrap components
import {Container} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Coworker from "../../components/Company/Coworker";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {deleteInvite, getCoworker, getInvite, inviteCoworker} from "../../actions/coworkerActions";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card/Card";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const CompanyAccountView = (props) => {
    const [inviteAlert, setInviteAlert] = useState(false);
    const [invitedEmail, setInvitedEmail] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const {user, coworker} = useSelector(state => ({
            user: state.auth.user,
            coworker: state.coworker.coworker
        }),
    );
    const dispatch = useDispatch();
    const onGetCoworker = useCallback(() => dispatch(getCoworker()), []);
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

    return (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>
                            ????????????<br/>
                            <small>???????????? / ???????????? ?????????????????? ???????????????.</small>
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

                    {<Coworker/>}

                    <hr/>

                    {invitedEmail.length > 0 && (
                        <>
                            <Card variant="outlined">
                                <CardContent>
                                    ????????????
                                    <List >
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
                                                                onDeleteCoworker(item.id)
                                                                setInvitedEmail(invitedEmail.filter(v => v.id !== item.id))
                                                            }}/>
                                                        </IconButton>
                                                    </ListItem>
                                                )
                                            }
                                        })}
                                    </List>
                                </CardContent>
                            </Card>
                        </>
                    )}

                </Container>
            </div>

        </>
    )
};

export default CompanyAccountView;


