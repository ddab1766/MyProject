import React, {useState} from "react";
import {Container} from "reactstrap";
import {Link} from "react-router-dom";
import {Button} from "rsuite";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SugubDrawer from "../Company/Sugub/SugubDrawer";
import undraw_done_a34v from "@/assets/img/undraw_done_a34v.svg";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const SignupDone = (props) => {
    const [modal, setModal] = useState(false);

    const renderLinks = () => {
        if(props.match.path.match('/Company')){
            return (
                <>
                    <div className="centered">
                        {/*<button*/}
                        {/*        className="btn btn-lg btn-primary"*/}
                        {/*        color="danger"*/}
                        {/*    >*/}
                        {/*        채용마켓 시작하기*/}
                        {/*    </button>*/}
                        <SugubDrawer/>
                        {/*<Link to={'/Company'}>
                            <button
                                className="btn btn-lg btn-primary"
                                color="danger"
                            >
                                채용마켓 시작하기
                            </button>
                        </Link>*/}
                    </div>
                    <div className="centered">
                        <Link to={'/Company'}>
                            <p>메인으로 가기</p>
                        </Link>
                    </div>
                </>
            )

        }else if(props.match.path.match('/Hr')){
            return (
                <>
                    <div className="centered">
                        {/*<HrMainSearchModal/>*/}
                        <Link to={'/Hr/profileForm'}>
                            <Button
                                appearance="primary"
                                size="lg"
                                className="m-3"
                            >기업정보 등록</Button>
                        </Link>
                    </div>
                    <div className="centered">
                        <Link to={'/Hr'}>
                            <p>메인으로 가기</p>
                        </Link>
                    </div>
                </>
            )
        }
    }


    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>
                        회원가입 완료
                    </h3>
                </div>
                <Card>
                    <CardContent>
                        <div className="col-md-6 ml-auto mr-auto pt-lg-4" style={{backGroundColor:'#FFFFFF'}}>
                            <div className="centered">
                                <h4>
                                    채용마켓 회원가입이 완료 되었습니다.
                                </h4>
                            </div>

                            <div className="centered">
                                <CheckCircleIcon style={{color: '#7466ff', fontSize: '60px'}}/>
                            </div>

                            <div className="centered">
                                <img
                                    alt="..."
                                    className="avatar border-gray centered"
                                    width={"250px"}
                                    src={undraw_done_a34v}
                                />
                            </div>
                            <hr/>
                            {renderLinks()}
                            <br/>
                        </div>
                    </CardContent>
                </Card>

            </Container>
        </div>
    )
}

export default SignupDone;
