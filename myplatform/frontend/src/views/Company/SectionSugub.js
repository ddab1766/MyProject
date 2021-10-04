import React from "react";
import {Col, Container, Row} from "reactstrap";
import {Button} from "rsuite";
import SugubGuide from "../../components/Company/Sugub/SugubGuide";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card/Card";
import SugubDrawer from "../../components/Company/Sugub/SugubDrawer";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import undraw_access_denied_re_awnf from "@/assets/img/undraw_access_denied_re_awnf.svg";
import undraw_data_processing_yrrv from "@/assets/img/undraw_data_processing_yrrv.svg";

function SectionSugub(props) {
    const renderSection = () => {
        if(props.hr !== null){ // 파견사업주
            return (
                <Card variant="outlined">
                    <CardContent>
                        <div className="centered">
                            <img
                                alt="..."
                                className="avatar border-gray centered"
                                width={"200px"}
                                src={undraw_access_denied_re_awnf}
                            />
                        </div>
                        <br/>
                        <br/>
                        <div className="centered">
                            <h5>인사담당자 전용 페이지 입니다</h5>
                        </div>
                        <div className="centered">
                            <Link to={'/Hr'}>
                                <Button appearance="ghost"> 파트너 페이지로 이동</Button>
                            </Link>
                            {/*<button className="btn btn-info"></button>*/}
                        </div>

                    </CardContent>
                </Card>
            )
        }else{ // 사용사업주 or 비로그인
            return (
                <Card variant="outlined">
                    <CardContent>

                        <br/>
                        <br/>
                        <Row>
                            <Col md={2}>{' '}</Col>
                            <Col md={5}>
                                <SugubGuide/>
                            </Col>
                            <Col md={3} className="centered">
                                <img
                                    alt="..."
                                    className="avatar border-gray centered"
                                    width={"300px"}
                                    src={undraw_data_processing_yrrv}
                                />
                            </Col>
                        </Row>
                        <br/>
                        <div className="centered">
                            <SugubDrawer/>
                        </div>

                    </CardContent>
                </Card>
            )
        }
    };

    return (
        <Container>
            <div className="title">
                <h3>
                    채용의뢰<br/>
                    <small>
                        좋은 인재를 빠르게 확보 하고싶으신가요?<br/>
                        채용마켓의 빠르고 쉬운 프로세스와 함께 해보세요.
                    </small>
                </h3>
            </div>

            {renderSection()}

        </Container>
    );
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(SectionSugub);
