import React, {useState} from 'react';
import styled from 'styled-components';
import {useScrollFadeIn} from '../../../hooks';
import {Col, Row} from "reactstrap";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import notebook from "@/assets/main-image/OKR0RO12 1.png";

const S = {
    Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 0;
    // margin-top: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
    Label: styled.p`
    display: inline-block;
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
    ItemWrapper: styled.ul`
    padding:0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
    ItemDescription: styled.p`
    opacity: 0.89;
    // font-family: SpoqaHanSansNeo;
    font-size: 20px;
    padding: 20px 0px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.48px;
    text-align: left;
    color: #00151c;
  `,
};


const Services_Mobile = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const animatedItem = {
        0: useScrollFadeIn('up', 1, 0),
        1: useScrollFadeIn('up', 1, 0),
        2: useScrollFadeIn('up', 1, 0),
    };
    const tabObj = {
        0: <>원하는 인재에 대하여<br/>간단히 체크하고 의뢰서 제출</>,
        1: <>진행한 인력 채용의뢰서 전체를<br/>볼 수 있는 기능</>,
        2: <>등록한 채용의뢰서의<br/>진행상황을 실시간으로 알려주는 기능</>,
        3: <>진행 중인 채용의뢰서에 접수된 이력서를 <br/>한 곳에서 확인 후 일괄 필터링</>
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-tabpanel-${index}`,
        };
    }

    // tab value
    const onHandleChange = (event, newValue) => {
        setTabIndex(newValue);
        if(newValue == 1){
            // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0100000'));
        } else if(newValue == 2){
            // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0200000'));
        } else if(newValue == 3){
            // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0300000'));
        } else{
            // setSearchLists(sugubs)
        }
    };

    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            width: '100%',
        },
        tab: {
            minWidth: 90,
            width: 90,
            fontSize: '10px'
        }
    });
    const classes = useStyles();

    return (
        <S.Wrapper>
            <S.Label>제공 서비스</S.Label>
            <S.Title>
                B2B 채용 플랫폼
            </S.Title>
            <S.ItemWrapper>
                <Row>
                    <Col md={6}>
                        <div className="centered">
                            <img src={notebook} width={326.5} height={219}/>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className={classes.root}>
                            <Tabs aria-label="scrollable auto tabs example"
                                  scrollButtons="auto"
                                  TabIndicatorProps={{style: {background:'#9266ff', height: '3px'}}}
                                  value={tabIndex}
                                  variant="scrollable"
                                  onChange={onHandleChange}
                            >
                                <Tab label='간편한주문' {...a11yProps(0)} classes={{ root: classes.tab }}/>
                                <Tab label='의뢰내역' {...a11yProps(1)} classes={{ root: classes.tab }}/>
                                <Tab label='실시간알림' {...a11yProps(2)} classes={{ root: classes.tab }}/>
                                <Tab label='필터링' {...a11yProps(3)} classes={{ root: classes.tab }}/>
                            </Tabs>
                            <TabPanel value={tabIndex} index={tabIndex}>
                                <S.ItemDescription>{tabObj[tabIndex]}</S.ItemDescription>
                            </TabPanel>
                        </div>
                    </Col>

                </Row>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};

export default Services_Mobile;
