import React, {useState} from "react";
import {Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import HrReview from "@/components//Hr/HrReview";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {brText} from "../../function/common";
import {Tag, TagGroup} from "rsuite";
import BusinessIcon from '@material-ui/icons/Business';
import RateReviewIcon from '@material-ui/icons/RateReview';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';

const HrProfileDetail = (props) => {
    const [hrProfile, setHrProfile] = useState(props.location.state.hrprofile);

    return hrProfile && (
        <div className="content">
            <Container>
                <div className="title">
                    <h5>파트너 상세정보<br/>
                    </h5>
                </div>
                <hr/>
                <Card className="card pl-3 pr-3">
                    <CardContent>
                        <div>

                            <h5>
                                <BusinessIcon style={{color: '#7466ff'}}/>{' '}기업정보
                            </h5>
                            <hr />
                            <Row>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>기업명</dt>
                                        <dd><strong>{hrProfile.custname}</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>본사주소</dt>
                                        <dd><strong>{hrProfile.load_addr}</strong></dd>
                                    </dl>
                                </Col>
                                <Col className="col-md-6">
                                    <dl>
                                        <dt>사원수</dt>
                                        <dd><strong>{hrProfile.emp_count} 명</strong></dd>
                                    </dl>
                                    <dl>
                                        <dt>홈페이지</dt>
                                        <dd><strong>{hrProfile.homepage}</strong></dd>
                                    </dl>
                                </Col>
                            </Row>
                            <dl>
                                <dt>회사소개</dt>
                                <dd><strong>
                                    {brText(hrProfile.introduce)}
                                </strong></dd>
                            </dl>
                            <dl>
                                <dt>복리후생</dt>
                                <dd><strong>
                                    {hrProfile.hr_bokri ? brText(hrProfile.hr_bokri) : '-'}
                                </strong></dd>
                            </dl>
                            <br/>
                            <br/>
                            <h5><EmojiEmotionsOutlinedIcon style={{color:'#7466ff'}}/>{' '}제공 서비스</h5>
                            <hr />
                            <TagGroup>
                            {hrProfile.services.length > 0 ? hrProfile.services.map(data=>{
                                return (
                                    <Tag color="blue" style={{fontSize:'12px'}}>{data.code_name}</Tag>
                                )
                            }) : <br/>}
                            </TagGroup>

                            <br/><br/>

                            <h5><LocationOnIcon style={{color:'#7466ff'}}/>{' '}서비스가능 지역</h5>
                            <hr />
                            <TagGroup>
                            {hrProfile.service_address.length > 0 ? hrProfile.service_address.map(data=>{
                                return (
                                    <Tag color="gray" style={{fontSize:'12px'}}>{data.code_name}</Tag>
                                )
                            }) : <br/>}
                            </TagGroup>

                            {/*<HrSpecial hrprofile={hrProfile} special={hrProfile.hrspecial}/>*/}
                            <br/>
                            {/*<h5>진행 수급건</h5>
                            <hr />
                            {hrProfile.jobad_count || <Nothing text={'진행'}/>}
                            <br/>
                            <br/>*/}
                            <br/>
                            <h5><RateReviewIcon style={{color:'#7466ff'}}/>{' '}리뷰</h5>
                            <hr/>
                            <HrReview hrprofile={hrProfile}/>
                        </div>
                        <br/>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
};

// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         company: state.auth.company,
//     }
// }

// export default connect(mapStateToProps, {})(HrProfileDetail);
export default HrProfileDetail;
