import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import axios from "axios";
import {apiUrls} from "../../constants/urls";
import {formValueSelector} from "redux-form";
import {getUserProfile} from "../../actions/authActions";
import HrProfileFormStep1 from "./HrProfileForm_Step1";
import HrProfileFormStep2 from "./HrprofileForm_Step2";
import HrProfileFormStep3 from "./HrProfileForm_Step3";
import HrProfileFormStep4 from "./HrProfileForm_Step4";
import HrProfileFormStep5 from "./HrProfileForm_Step5";
import HrProfileFormStep6 from "./HrProfileForm_Step6";
import HrProfileFormInfo from "./HrProfileForm_info";
import LinearDeterminate from "../MaterialUI/LinearDeterminate";
import undraw_having_fun_iais from "@/assets/img/undraw_having_fun_iais.svg";
import {Link, Prompt} from "react-router-dom";
import {Loader} from "rsuite";
import CustomLoader from "../Rsuite/Loader";

const HrProfileForm = (props) => {
    const [page, setPage] = useState(1);
    const [reviews, setReviews] = useState(null);
    const [jikjongInfo, setJikjongInfo] = useState([]);
    const [fitUsers, setFitUsers] = useState(null);
    const [comCode, setComCode] = useState([]);
    const [prompt, setPrompt] = useState(true)

    const {onSubmit, user, hr } = props;
    const [progress, setProgress] = React.useState(0);
    const {company, selected, authenticated, sugub_jikjong_mid} = props;


    const onNextPage = (jumpPage) => {
        console.log('onNextPage jumpPage:', jumpPage)
        if(jumpPage > 0){
            setPage(page + 1 + jumpPage)
        }else{
            setPage(page + 1)
        }
    };

    const onPreviousPage = () => {
        setPage(page - 1)
    };

    useEffect(()=>{
        if(page >= 5){
            setProgress(100)
        } else {
            setProgress(Math.round(100/4 * (page-1)))
        }
        if(page >= 7) setPrompt(false)

    },[page])


    useEffect(()=>{
        if(selected){
            if(selected.sec === 'mid') {
                axios
                    .get(apiUrls.JIKJONG, {
                        params:{
                            jikjong_mid: selected.code_id
                        }
                    })
                    .then( ({data}) => {
                        setJikjongInfo(data)
                    })
            }else if(selected.sec === 'top'){

            }
        }

    },[selected]);

    // Comcode
    useEffect(() => {
        if(props.comcode)
            setComCode(props.comcode.filter(v=> v.code_topidx === 'BE' || v.code_topidx === 'AC' ||
                v.code_topidx === 'AO' || v.code_topidx === 'AQ' || v.code_topidx === 'AE' || v.code_topidx === 'CI'))
    }, []);

    return  (
        <>
            <Prompt when={prompt} message="??????????????? ???????????? ?????? ??? ????????????." />
            <Container>
                <div className="title">
                    <h4>?????? ????????? ??????????????????<br/>
                        <small>???????????? ???????????? ????????????????????????.</small>
                    </h4>
                </div>
                <hr/>
                <div>
                    <Card className="card card-sugub">
                        <CardTitle className="mx-md-3">
                            <LinearDeterminate progress={progress}/>
                            <div className="centered">
                                <small style={{fontSize: '1.5em'}}>{progress} {'%'}</small>
                            </div>
                        </CardTitle>
                        <CardBody>
                            <Row>
                                {/*<HrMainSearchModal/>*/}
                                <Col md="8">
                                    {page === 1 && <HrProfileFormStep1 onSubmit={onNextPage} comCode={comCode} {...selected}/>}
                                    {page === 2 && (
                                        <HrProfileFormStep2
                                            previousPage={onPreviousPage}
                                            onSubmit={onNextPage}
                                            comCode={comCode}
                                        />
                                    )}
                                    { page === 3 && authenticated && (
                                        <HrProfileFormStep3
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                        />
                                    )}
                                    { page === 4 && authenticated && (
                                        <HrProfileFormStep4
                                            comCode={comCode}
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                            // onSubmit={onSubmit}
                                        />
                                    )}
                                    { page === 5 && authenticated && (
                                        <HrProfileFormStep5
                                            comCode={comCode}
                                            previousPage={onPreviousPage}
                                            // nextPage={onNextPage}
                                            onSubmit={onNextPage}
                                        />
                                    )}
                                    { page === 6 && authenticated && (
                                        <HrProfileFormStep6
                                            previousPage={onPreviousPage}
                                            nextPage={onNextPage}
                                            // onSubmit={onNextPage}
                                            onSubmit={onSubmit}
                                        />
                                    )}

                                </Col>
                                <Col md="4">
                                    {page <= 6 && (
                                        <HrProfileFormInfo page={page}/>
                                    )}

                                </Col>

                                <Col>
                                    {page === 7 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h4>???????????? ?????????</h4>
                                                {/*<CardTitle>??????????????? ?????????</CardTitle>*/}
                                                <CardBody>
                                                    <div className="description">
                                                        {/*????????? ??????????????????....*/}
                                                        <CustomLoader content="????????? ??????????????????...." vertical />
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </>
                                    )}
                                    {page === 8 && (
                                        <>
                                            <Card className="card card-sugub text-center">
                                                <h3>?????? ????????? ?????? ??????</h3>
                                                <CardBody>
                                                    <div className="centered">
                                                        <img
                                                            alt="..."
                                                            className="border-gray centered"
                                                            width={"200px"}
                                                            src={undraw_having_fun_iais}
                                                        />
                                                    </div>
                                                    <br/>
                                                    <br/>
                                                    <Link to={'/Hr/Profile'}>
                                                        <button type="button" className="btn btn-lg btn-info">
                                                            ????????? ???????????? ??????
                                                        </button>
                                                    </Link>
                                                </CardBody>
                                            </Card>
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <hr/>
                <div>
                    {/*<h5>?????? ???????????????
                        <small style={{color:"red"}}>0</small>
                    </h5>
                    <hr/>
                    <Nothing text={''}/>*/}
                    {/*{fitUsers ? (
                        <>
                            {fitUsers.length > 0 ? (
                                <div>
                                    <Row>
                                        {fitUsers.length > 0 && fitUsers.map((fitUser, index)=>{
                                            if(index <= 7){
                                                return (
                                                    <Col md={3}>
                                                        <FitUserCard fituser={fitUser}/>
                                                    </Col>
                                                )
                                            }
                                        })}
                                    </Row>
                                </div>
                            ): (<>?????? ????????? ?????? ????????? ????????????.</>)}
                        </>
                    ) : (<LoaderSpinner/>)}*/}
                </div>

            </Container>
        </>
    )
}

HrProfileForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const selector = formValueSelector('hr_profile_wizard');


function mapStateToProps(state, props) {
    const sugub_jikjong_mid = selector(state, 'hr_jikjong_mid')
    if(props.location.state) {
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            selected: props.location.state.selected,
            company: state.auth.company,
            user: state.auth.user,
            hr: state.auth.hr,
            comcode: state.comcode.comcode
        }
    }else{
        return {
            sugub_jikjong_mid: sugub_jikjong_mid,
            authenticated: state.auth.authenticated,
            company: state.auth.company,
            user: state.auth.user,
            hr: state.auth.hr,
            comcode: state.comcode.comcode
        }
    }
}

// export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(SugubForm)
export default connect(mapStateToProps, {getUserProfile})(HrProfileForm)
