import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Chat.scss';
import WebSocketInstance from '../../services/WebSocket'
import {connect} from "react-redux";
import {Button, Col, Modal, ModalBody, ModalFooter, Row} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as common from "../../function/common";
import {isMobile} from "react-device-detect"
import MessageForm from "./MessageForm";
// import TabPanel from "@material-ui/lab/TabPanel";
const RenderMessages = React.memo(function RenderMessages({messages,props}) {
    // const currentUser = this.props.user.email;
    const currentUser = props.user.nickname;
    console.log('currentUser?', currentUser)
    console.log('messages?', messages)
    return messages.map((message, i) =>
        <>
          <li key={message.id} className={message.author.nickname === currentUser ? 'me' : 'him'}>
            <h4 className='author'>{ message.author.nickname } </h4>
            {message.author.nickname === currentUser ? (
                <Row>
                  <span className="time">{message.created_at}</span>
                  <p>{message.content}</p>
                  <Avatar alt="me"
                          src={message.author.profile_image ?
                              message.author.profile_image :require("@/assets/img/default-avatar.png")}
                          style={{width:'30px',height:'30px',margin:'0 0.5rem 0 0'}}/>
                </Row>
            ) : (
                <Row>
                  {/*<div className='form-row'>*/}
                  <Avatar alt="him"
                          src={message.author.profile_image ?
                              message.author.profile_image : require("@/assets/img/default-avatar.png")}
                          style={{width:'30px',height:'30px'}}/>
                  <p>{message.content}</p>
                  <span className="time">{message.created_at}</span>
                  {/*</div>*/}
                </Row>
            )
            }
          </li>

        </>
    );
  });
// class Chat extends Component {
const Chat_1 = (props) => {
  const [modalMini, setModalMini] = useState(false);
  const [receiver, setReceiver] = useState(props.location.state ? props.location.state.receiver : {id: null, email: null, nickname: null});
  const [chat, setChat] = useState(props.location.state? props.location.state.chat : {participants: [], is_end: false});
  const [sugub, setSugub] = useState(props.location.state ? props.location.state.sugub : null);
  const [room_number, setRoom_number] = useState(null);
  const [messages, setMessages] = useState(null);
  const [message, setMessage] = useState(null);
  const messagesEnd = useRef(null)
  useEffect(()=>{
    // scrollToBottom();
    // ????????????
    if(chat.participants.length === 0){
      WebSocketInstance.connect(props.location.state);
    }
    // ????????????
    else{
      WebSocketInstance.connect(chat.id);
    }

    waitForSocketConnection(()=> {
      if (props.location.state) {
        WebSocketInstance.initChatUser(receiver.id);
        WebSocketInstance.addCallbacks(
            initChat,
            setMessages1,
            addMessage
        )
        WebSocketInstance.fetchMessages(receiver.id);
      }
    });
  },[])


  const toggleModalMini = () => {
    setModalMini(!modalMini)
  }

  const waitForSocketConnection = useCallback((callback) => {
    const component = this;
    setTimeout(
        function () {
          // Check if websocket state is OPEN
          if (WebSocketInstance.state() === 1) {
            console.log("Connection is made")
            callback();
            return;
          } else {
            console.log("wait for connection...")
            // return;
            waitForSocketConnection(callback);
          }
        }, 100); // wait 100 milisecond for the connection...
  },[]);



  const scrollToBottom = () => {
    const chat = messagesEnd;
    const scrollHeight = chat.scrollHeight;
    const height = chat.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  const initChat = useCallback((room_number) => {
    setRoom_number(room_number)
  },[room_number]);

  const addMessage = useCallback((message) => {
    // ???????????? ??? ????????? ??? ?????? ?????????id ??????
    console.log(message)
    if(messages !== null){
      let uniqMessage = [...messages, message];

      uniqMessage = uniqMessage.filter((arr, index, callback) => index === callback.findIndex(t => t.id === arr.id))
      // this.setState({ messages: uniqMessage});
      setMessages(uniqMessage)
    }
  },[messages]);

  const setMessages1 = useCallback((messages) => {
    setMessages(messages.reverse())
  },[messages]);

  const messageChangeHandler = useCallback((event) =>  {
    setMessage(event.target.value)
  },[message]);


  const sendMessageHandler = useCallback((e, message) => {
    const messageObject = {
      from: props.user.id,
      text: message
    };
    // ???????????? ???????????? ?????? ????????? ????????? ??????
    if(!chat.is_end) {
      WebSocketInstance.newChatMessage(messageObject);
    }else{
      alert('???????????? ?????????????????????.')
    }
    // WebSocketInstance.newChatMessage(messageObject);
    setMessage('')

    e.preventDefault();
  },[message]);



  const exitChatRoom = (e, id) => {
    WebSocketInstance.exitChatRoom(id);
    props.history.goBack();
    e.preventDefault()
  };

  // const messages = messages;
  // const chat = this.state.chat;
  // const {room_number} = this.props.match.params;
  // todo chat??? null?????? ???????????? ?????? ????????????, ????????????.
  console.log('receiver', receiver)

  return (
      <div className={!isMobile ? "container" : ""} style={!isMobile ? {marginTop:"20px" } : {marginTop:'0px'}}>
        <Row>
          <Col md={8}>
            <Card>
              {/*<CardContent>*/}
              <div className='chat'>
                <div className='container'>
                  <div className="chat-header">
                    <div style={{width:'100%'}}>
                        <span className="btn-label" style={{float:"left",cursor:"pointer", position: "relative", fontSize: "1.2em"}}
                              onClick={() => props.history.goBack()}>
                          <i className="nc-icon nc-minimal-left" />{' '}{
                          // chat && chat.is_end ? chat.exit_participants[0].email : receiver.nickname
                        }
                        </span>
                      {/*<span style={{padding: '5px'}}>{'  '}</span>*/}
                      <span className="btn-label" style={{float:"right",cursor:"pointer", position: "relative", fontSize: "1.2em"}}
                            onClick={(e) => toggleModalMini()
                              //this.exitChatRoom(e, room_number)
                            }>
                          {/*<i className="nc-icon nc-minimal-left" />{' '}*/}
                        ????????????
                      </span>
                      <Modal isOpen={modalMini} toggle={toggleModalMini} size="sm">
                        <div className="modal-header justify-content-center">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModalMini}>
                            <span aria-hidden="true">??</span>
                          </button>
                          <h5 className="modal-title">????????? ?????????</h5>
                        </div>
                        <ModalBody>
                          <p>???????????? ?????? ??????????????? ?????? ???????????? ????????????????????? ???????????????.</p>
                        </ModalBody>
                        <ModalFooter>
                          <div className="left-side">
                            <Button
                                className="btn-link"
                                color="default"
                                type="button"
                                onClick={toggleModalMini}
                            >
                              ????????????
                            </Button>
                          </div>
                          <div className="divider"/>
                          <div className="right-side">
                            <Button
                                className="btn-link"
                                color="danger"
                                type="button"
                                onClick={(e) => {exitChatRoom(e, room_number)}}
                            >
                              ?????????
                            </Button>
                          </div>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                  <ul ref={messagesEnd}>
                    {
                      messages &&
                      // renderMessages(messages)
                        <RenderMessages messages={messages} props={props}/>
                    }
                    { messages &&
                    chat && chat.is_end && (<li className={'admin'}>???????????? ?????????????????????.</li>)
                    }
                  </ul>
                </div>
                <MessageForm messageChangeHandler={messageChangeHandler} message={message} sendMessageHandler={sendMessageHandler}/>
              </div>
            </Card>
          </Col>
          {!isMobile &&
          <Col md={4}>
            <br/>
            <Card>
              <CardContent>
                {
                  sugub &&
                  (<ChatInfoView receiver={receiver} sugub={sugub}/>)
                }
              </CardContent>
            </Card>
          </Col>}
        </Row>
      </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <span>{children}</span>
            </Box>
        )}
      </div>
  );
}

const ChatInfoView = (props) => {
  const [value, setValue] = useState(0);
  const {sugub, receiver} = props;
  const handleChange = (event, newValue) => setValue(newValue);
  return (
      <>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
          <Tab label={`????????????`} {...a11yProps(0)} />
          {/*<Tab label={`????????????`} {...a11yProps(1)} />*/}
          {/*<Tab label={`??????`} {...a11yProps(2)} />*/}
        </Tabs>
        <TabPanel value={value} index={value}>
          <br/>
          <dl>
            <dt>??????(???)</dt>
            <dd><strong>{sugub.sugub_jikjong_top.code_name}</strong></dd>
          </dl>
          <dl>
            <dt>??????(???)</dt>
            <dd><strong>{sugub.sugub_jikjong_mid.code_name}</strong></dd>
          </dl>
          <dl>
            {sugub.sugub_jikjong_low && (<dt>??????(???)</dt>)}
            {sugub.sugub_jikjong_low && sugub.sugub_jikjong_low.length > 0 && sugub.sugub_jikjong_low.map(value=>{
              return(
                  <dd><strong>{value.code_name}</strong></dd>
              )
            })}
          </dl>

          {sugub.work_position &&
          (
              <dl>
                <dt>?????????</dt>
                <dd><strong>{common.limitedText(sugub.work_position)}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.chae_cd &&
          (
              <dl>
                <dt>????????????</dt>
                <dd>
                  {sugub.chae_cd.code_name}
                  {sugub.chae_gigan && (
                      <strong>
                        ( {sugub.chae_gigan}
                        {sugub.chae_gigan_type && (
                            <>{sugub.chae_gigan_type.code_name}</>
                        )} )
                      </strong>
                  )}
                </dd>

              </dl>
          )}

          <hr/>

          {sugub.work_role &&
          (
              <dl>
                <dt>????????????</dt>
                <dd><strong>{common.limitedText(sugub.work_role)}</strong></dd>
              </dl>
          )}
          {sugub.spec &&
          (
              <dl>
                <dt>??????/??????</dt>
                <dd><strong>{common.limitedText(sugub.spec)}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.sugub_career_gb &&
          (
              <dl>
                <dt>??????</dt>
                <dd>
                  {sugub.sugub_career_gb.code_name} {' '}
                  {sugub.career_start && (
                      <><strong>
                        ( {sugub.career_start} ??? ~ {sugub.career_end} ??? )
                      </strong></>
                  )}
                </dd>
              </dl>
          )}
          {sugub.education_cd &&
          (
              <dl>
                <dt>??????</dt>
                <dd>{sugub.education_cd.code_name}</dd>
              </dl>
          )}
          {sugub.hire_count &&
          (
              <dl>
                <dt>????????????</dt>
                <dd><strong>{sugub.hire_count}</strong></dd>
              </dl>
          )}

          <hr/>

          {sugub.age_start &&
          (
              <dl>
                <dt>??????</dt>
                <dd><strong>{sugub.age_start} ??? ~ {sugub.age_end} ???</strong></dd>
              </dl>
          )}
          {sugub.salary_gubun &&
          (
              <dl>
                <dt>????????????</dt>
                <dd>{sugub.salary_gubun.code_name}</dd>
                {sugub.salary_end ? (
                    <dd><strong>
                      ( {sugub.salary_start} ?????? ~ {sugub.salary_end} ?????? )
                    </strong></dd>
                ) : (
                    <dd><strong>
                      ( {sugub.salary_start} ??? )
                    </strong></dd>
                )}

              </dl>
          )}
          {sugub.sugub_salary_adjust &&
          (
              <dl>
                <dt>????????????</dt>
                <dd><strong>{sugub.sugub_salary_adjust ? '??????' : '?????????'}</strong></dd>
              </dl>
          )
          }

          <hr/>

          {sugub.work_load_addr &&
          (
              <dl>
                <dt>????????????</dt>
                <dd><strong>{sugub.work_load_addr}</strong></dd>
              </dl>
          )}
          {sugub.work_load_addr_detail &&
          (
              <dl>
                <dt>???????????????</dt>
                <dd><strong>{sugub.work_load_addr_detail}</strong></dd>
              </dl>
          )}

          {sugub.sugub_end_dt &&
          (
              <dl>
                <dt>???????????????</dt>
                <dd><strong>{sugub.sugub_end_dt}</strong></dd>
              </dl>
          )}
        </TabPanel>
      </>
  )
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  }
}
export default React.memo(connect(mapStateToProps, {})(React.memo(Chat_1)))
