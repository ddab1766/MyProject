import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useScrollFadeIn} from '../../../hooks';
import {Col, Row} from "reactstrap";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {makeStyles} from "@material-ui/core";
import {getSugub} from "../../../../../../actions/sugubActions";
import {Loader, Tag, TagGroup} from "rsuite";
import {brText, thousands} from "../../../../../../function/common";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Nothing from "../../../../../Common/Nothing";

const S = {
    Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 80px 15px;
    // display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
  `,
    Label: styled.p`
    text-align: center;
    ${props => props.theme.typography.label};
    color: ${props => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
    Title: styled.h2`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    text-align: center;
    margin-bottom: 1rem;
  `,
    Tab: styled.div`
    
  `,
    IconText: styled.p`
    flex-grow: 0;
    opacity: 0.8;
    // font-family: SpoqaHanSansNeo;
    padding: 0px 5px 0px 5px;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.38px;
    text-align: left;
    color: #00151c;
    `,
    Line: styled.div`
    padding: 0px 5px 0px 5px;
    font-size: 15px;
    font-weight: 100;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.38px;
    text-align: left;
    color: #8f9296;
    `,
    SubTitle: styled.p`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    opacity: 0.8;
    // font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: center;
    color: #00151c;
  `,
    ItemList: styled.section`
    // height: 380px;
    display: inline-flex;
  `,
    ItemCard: styled.div`
    width: 580px;
    height: 320px;
    flex-direction: column;
    justify-content: center;
    // align-items: left;
    margin: 15px;
    gap: 10px;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    :hover{ border: 1px solid rgb(184 156 253); } 
    `,
    ItemLabel: styled.p`
    // font-family: SpoqaHanSansNeo;
    font-size: 18px;
    // text-align: left;
    // line-height: 1.6;
    // letter-spacing: -0.36px;
    padding: 10px;
    `,
    ItemDescription: styled.p`
    flex-grow: 0;
  opacity: 0.8;
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.28px;
  text-align: left;
  color: #00151c;
    `,
    Logo: styled.div`
    width: 32px;
    height: 32px;
    flex-grow: 0;
    border: solid 1px #d8d8d8;
  `,
};

const Sugubs = () => {
    const animatedItem = {
        0: useScrollFadeIn('down', 1),
        1: useScrollFadeIn('down', 1, 0.2),
        2: useScrollFadeIn('down', 1, 0.4),
    };
    const [tabIndex, setTabIndex] = useState(0);
    const [loader, setLoader] = useState(false);
    const [sugubs, setSugubs] = useState(false);
    const [filteredList, setFilteredList] = useState(null);

    useEffect(()=>{
        setLoader(true)
        getSugub().then((data) => {
            setSugubs(data.results);
            setLoader(false)
            setFilteredList(data.results.filter(data => data.sugub_jikjong_top.code_id === 'AA0100000'));
        }).catch(err => setLoader(false));
    },[]);

    // tab value
    const onHandleChange = (event, newValue) => {
        setTabIndex(newValue);
        if(newValue === 0){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0100000'));
        } else if(newValue === 1){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0200000'));
        } else if(newValue === 2){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0300000'));
        } else if(newValue === 3){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0400000'));
        } else if(newValue === 4){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0500000'));
        } else if(newValue === 5){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0600000'));
        } else if(newValue === 6){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0700000'));
        } else if(newValue === 7){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0800000'));
        } else if(newValue === 8){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA0900000'));
        } else if(newValue === 9){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA1000000'));
        } else if(newValue === 10){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA1100000'));
        } else if(newValue === 11){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA1200000'));
        } else if(newValue === 12){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA1300000'));
        } else if(newValue === 13){
            setFilteredList(sugubs.filter(data => data.sugub_jikjong_top.code_id === 'AA1400000'));
        } else{
            // setSearchLists(sugubs)
        }
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const useStyles = makeStyles({
        tab: {
            minWidth: 130,
            width: 130,
        }
    });
    const classes = useStyles();

    return (
        <div style={{maxLength:'none', backgroundColor: 'white'}}>
            <S.Wrapper>
                <S.Label>???????????????</S.Label>
                <S.Title>
                    ????????? ????????? ?????????????????? ???????????????.
                </S.Title>
                <S.SubTitle>
                    ???????????? ?????? ????????? ???????????? ????????? ???????????????
                </S.SubTitle>
                <br/>
                <S.Tab>
                    <Tabs aria-label="scrollable auto tabs example"
                          scrollButtons="auto"
                          TabIndicatorProps={{style: {background:'#9266ff', height: '3px'}}}
                          value={tabIndex}
                          variant="scrollable"
                          onChange={onHandleChange}
                    >
                        <Tab label='??????/??????' {...a11yProps(0)} classes={{ root: classes.tab }}/>
                        <Tab label='??????/????????????' {...a11yProps(1)} classes={{ root: classes.tab }}/>
                        <Tab label='IT/?????????' {...a11yProps(2)} classes={{ root: classes.tab }}/>
                        <Tab label='?????????' {...a11yProps(3)} classes={{ root: classes.tab }}/>
                        <Tab label='?????????' {...a11yProps(4)} classes={{ root: classes.tab }}/>
                        <Tab label='?????????' {...a11yProps(5)} classes={{ root: classes.tab }}/>
                        <Tab label='??????' {...a11yProps(6)} classes={{ root: classes.tab }}/>
                        <Tab label='??????/??????' {...a11yProps(7)} classes={{ root: classes.tab }}/>
                        <Tab label='??????' {...a11yProps(8)} classes={{ root: classes.tab }}/>
                        <Tab label='??????/??????' {...a11yProps(9)} classes={{ root: classes.tab }}/>
                        <Tab label='?????????' {...a11yProps(10)} classes={{ root: classes.tab }}/>
                        <Tab label='??????' {...a11yProps(11)} classes={{ root: classes.tab }}/>
                        <Tab label='????????????/??????' {...a11yProps(12)} classes={{ root: classes.tab }}/>
                        <Tab label='??????/????????????' {...a11yProps(13)} classes={{ root: classes.tab }}/>
                    </Tabs>
                </S.Tab>
                <br/>
                {filteredList ? (
                    <>
                        {filteredList.length > 0 ? (
                            <S.ItemList>
                                <Row>
                                    {filteredList.map((sugub, index) => {
                                        if(index <=3){
                                            return (
                                                <Col md={6}>
                                                    <S.ItemCard key={index}>

                                                        <Row>
                                                            <Col className="col-auto col-8 text-left">
                                                                <TagGroup>
                                                                    <Tag>{sugub.sugub_jikjong_top && sugub.sugub_jikjong_top.code_name}</Tag>
                                                                    <Tag>{sugub.sugub_jikjong_mid &&sugub.sugub_jikjong_mid.code_name}</Tag>
                                                                </TagGroup>
                                                            </Col>
                                                            <Col className="text-right col-4">
                                                                <Tag color={`${sugub.chae_cd.code_id === "AC0300000" ? 'blue' : 'violet'}`} >{sugub.chae_cd.code_name}</Tag>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{marginTop:8, fontWeight:'bold'}}>
                                                            <Col>
                                                                <S.ItemLabel>
                                                                    {sugub.sugub_title.length >= 18 ? sugub.sugub_title.substr(0,18) + '...' : sugub.sugub_title}
                                                                </S.ItemLabel>
                                                            </Col>
                                                            <Col className="text-right">
                                                                <small style={{color:'#9ca0a5',fontSize:'12px'}}>???????????????</small><br/><small>{sugub.sugub_end_dt}</small>
                                                            </Col>
                                                        </Row>
                                                        <div style={{display:'flex'}}>
                                                            <CreditCardIcon style={{ color: '#7466ff'}}/>
                                                            <S.IconText>
                                                                ??????????????? {thousands(sugub.estimated_earnings)} ???{' '}
                                                                {/*<Icon icon="krw"/>*/}
                                                                {sugub.chae_cd.code_id === 'AC0300000' ?
                                                                    <Tooltip title="???????????? ????????? 15%??? ?????? ??? ????????????" placement="right-start">
                                                                        <i className="nc-icon nc-alert-circle-i"/>
                                                                    </Tooltip>
                                                                    :
                                                                    <Tooltip title="?????? ????????? 10%??? ?????? ??? ????????????" placement="right-start">
                                                                        <i className="nc-icon nc-alert-circle-i"/>
                                                                    </Tooltip>
                                                                }
                                                            </S.IconText>
                                                            <S.Line>I</S.Line>
                                                            <PermIdentityIcon style={{ color: '#7466ff'}}/>
                                                            <S.IconText>
                                                                ???????????? {sugub.jobadvertise[0] && sugub.jobadvertise[0].applicants_count} ???
                                                            </S.IconText>

                                                        </div>
                                                        <hr />
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <dl>
                                                                    <dt>{sugub.salary_gubun.code_name}</dt>
                                                                    <dd>{thousands(sugub.salary_start)}
                                                                        {sugub.salary_gubun.code_id === 'AI0200000' ? '???' : '??????'}
                                                                        ~ {thousands(sugub.salary_end)}
                                                                        {sugub.salary_gubun.code_id === 'AI0200000' ? '???' : '??????'}</dd>
                                                                </dl>
                                                            </Col>
                                                        </Row>
                                                        {sugub.chae_cd.code_id !== "AC0300000" &&
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <dl>
                                                                    <dt>????????????</dt>
                                                                    <dd>{sugub.chae_gigan}??????</dd>
                                                                </dl>
                                                            </Col>
                                                        </Row>
                                                        }
                                                        <Row>
                                                            <Col className="col-auto">
                                                                <div className="row-content">
                                                                    <dl>
                                                                        <dt>????????????</dt>
                                                                        <dd style={{
                                                                            textAlign: '-webkit-left',
                                                                            display: '-webkit-box',
                                                                            '-webkit-box-orient': 'vertical',
                                                                            '-webkit-line-clamp': '3',
                                                                            'overflow': 'hidden',
                                                                            'text-overflow': 'ellipsis'
                                                                        }}>{brText(sugub.work_role)}</dd>
                                                                    </dl>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </S.ItemCard>
                                                </Col>
                                            )
                                        }
                                    })
                                    }
                                </Row>
                            </S.ItemList>
                        ) : (
                            <Nothing text={'?????? ???????????? ????????? ????????????.'}/>
                        )}
                    </>
                ) : (
                    <div style={{textAlign:'center'}}>
                        <Loader content="?????????..." vertical size="lg"/>
                    </div>
                )}

                {/*<Link to={'/Company/Partners'}> <Button fill="outline" style={{marginBottom: '2rem'}}>??? ?????? ??????????????????</Button></Link>*/}
            </S.Wrapper>
        </div>
    );
};

export default Sugubs;
