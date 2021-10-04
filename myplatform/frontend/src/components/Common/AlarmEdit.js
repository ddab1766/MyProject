import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {renderError,} from "../../utils/renderUtils";
import {getUserProfile, updateAlarmSetting} from "../../actions/authActions";
import {Col, Container, Row} from "reactstrap"
import store from "../../store";
import {Toggle} from "rsuite";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";

const AlarmEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    const {comcode, user} = useSelector(state => ({
        comcode: state.comcode.comcode,
        user: state.auth.user
    }));
    const dispatch = useDispatch();
    const onUpdateAlarmSetting = (id, value, gubun) => dispatch(updateAlarmSetting(id, value, gubun));

    useEffect(()=>{
        store.dispatch(getUserProfile())
    },[]);

    const renderComponent = (settings) => {
        // let temp = comcode.filter( v => v.code_topidx === 'ZH')
        return settings.map( (item, index) => {
            return (
                <div key={index}>
                    <br/>
                    <h5>
                        {item.alarm_code.code_name}<br/>
                        {item.alarm_code.code_id === 'ZH0100000' && ( <small>각종 이벤트 알림메시지를 받아보세요</small>)}
                        {item.alarm_code.code_id === 'ZH0200000' && ( <small>채용진행에 대한 알림메시지를 받아보세요</small>)}
                        {item.alarm_code.code_id === 'ZH0300000' && ( <small>새로운 채팅에 대한 알림메시지를 받아보세요</small>)}
                    </h5>
                    <hr/>
                    <Row>
                        <Col md={6}>
                            <>SMS</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle checked={item.allow_sms}
                                        size="lg"
                                        onChange={(value)=> onUpdateAlarmSetting(item.id, value, 'SMS')}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <>앱 푸시</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle size="lg" disabled
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <>이메일</>
                        </Col>
                        <Col md={6} className="text-right">
                            <Toggle size="lg" disabled/>
                        </Col>
                    </Row>
                    <br/>
                </div>
            )
        })
    }

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>알람 설정<br/>
                    </h3>
                </div>
                <Card variant="outlined">
                    <CardContent>
                        <form
                            className="col-md-9 ml-auto mr-auto"
                            // style={{"max-width": "630px"}}
                            onSubmit={handleSubmit}
                        >
                            <br/>
                            {/*<hr/>*/}
                            {renderComponent(user.alarm_settings)}


                            {renderError(error)}
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default AlarmEdit;
