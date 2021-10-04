import React, {useState} from "react";
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import {brText, thousands} from "../../function/common";
import {makeStyles} from "@material-ui/core";
import {Icon, Tag, TagGroup} from "rsuite";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const SugubCard = (props) => {
    const {sugub, authenticated, hr} = props;
    return  sugub && (
        <>
            <style jsx>{`
            .card{
            width:330px;
            }
            @media screen and (max-width:760px){
                    .card{
                    width: 313px;
                    }
                }
            .card:hover{ background-color:#fafafa }
            
            .row-content{
                display: block; /* Fallback for non-webkit */ 
                display: -webkit-box; 
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; 
                line-height: 1em; 
                overflow: hidden; 
                text-overflow: ellipsis;
            }}
            
            `}</style>
            <Card className="card" key={sugub.id} variant="outlined"
                  style={{
                      height: "340px"
                  }}
            >
                <CardContent className="pb-2">
                    <div  style={{fontSize:'1.2em'}}  >
                        <Row>
                            <Col className="col-auto col-8 text-left">
                                {/*<small>{sugub.sugub_jikjong_top && sugub.sugub_jikjong_top.code_name} > {sugub.sugub_jikjong_mid &&sugub.sugub_jikjong_mid.code_name}</small>*/}
                                <TagGroup>
                                    <Tag>{sugub.sugub_jikjong_top && sugub.sugub_jikjong_top.code_name}</Tag>
                                    <Tag>{sugub.sugub_jikjong_mid &&sugub.sugub_jikjong_mid.code_name}</Tag>
                                </TagGroup>
                            </Col>
                            <Col className="text-right col-4">
                                <Tag color={`${sugub.chae_cd.code_id === "AC0300000" ? 'green' : 'blue'}`} >{sugub.chae_cd.code_name}</Tag>
                            </Col>
                        </Row>

                        <Row style={{marginTop:8,fontWeight:'bold'}}>
                            <Col className="text-left">
                                {sugub.sugub_title.length >= 18 ? sugub.sugub_title.substr(0,18) + '...' : sugub.sugub_title}
                            </Col>
                            <Col className="text-right">
                                <small style={{color:'#9ca0a5',fontSize:'12px'}}>접수마감일</small><br/><small>{sugub.sugub_end_dt}</small>
                            </Col>
                        </Row>
                        {/*<Row>*/}
                        {/*    <Col className="text-right">*/}
                        {/*        <small style={{color:'#9ca0a5',fontSize:'12px'}}>접수마감</small><br/><small>{sugub.sugub_end_dt}</small>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}

                        <Row>
                            <Col className="col-auto  text-left">
                                <div style={slimText}>예상수익금</div>
                                <small>
                                    <Icon icon="krw" />
                                    {thousands(sugub.estimated_earnings)}원
                                    {sugub.chae_cd.code_id === 'AC0300000' ?
                                        <Tooltip title="채용대행 수수료 15%로 산정 시 값입니다" placement="right-start">
                                            <i className="nc-icon nc-alert-circle-i"></i>
                                        </Tooltip>
                                        :
                                        <Tooltip title="파견 수수료 7%로 산정 시 값입니다" placement="right-start">
                                            <i className="nc-icon nc-alert-circle-i"></i>
                                        </Tooltip>
                                    }
                                </small>
                            </Col>
                            <Col className="text-right">
                                <small><Icon icon="user-circle-o" />{sugub.jobadvertise[0] && sugub.jobadvertise[0].applicants_count}명 지원중</small>
                            </Col>
                        </Row>

                    </div>

                    <hr />
                    <Row>
                        <Col className="col-auto">
                            <dl>
                                <dt>{sugub.salary_gubun.code_name}</dt>
                                <dd>{thousands(sugub.salary_start)}
                                {sugub.salary_gubun.code_id === 'AI0200000' ? '원' : '만원'}
                                    ~ {thousands(sugub.salary_end)}
                                    {sugub.salary_gubun.code_id === 'AI0200000' ? '원' : '만원'}</dd>
                            </dl>
                        </Col>
                    </Row>
                    {sugub.chae_cd.code_id !== "AC0300000" &&
                    <Row>
                        <Col className="col-auto">
                            <dl>
                                <dt>계약기간</dt>
                                <dd>{sugub.chae_gigan}개월</dd>
                            </dl>
                        </Col>
                    </Row>
                    }
                    <Row>
                        <Col className="col-auto">
                            <div className="row-content">
                                <dl>
                                    <dt>담당업무</dt>
                                    <dd style={{textAlign: '-webkit-left'}}>{brText(sugub.work_role)}</dd>
                                </dl>
                            </div>
                        </Col>
                    </Row>
                    <br/>
                </CardContent>
            </Card>
        </>
    )
};


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
        user: state.auth.user,
        hr: state.auth.hr
    }
}

export default connect(mapStateToProps)(SugubCard);

