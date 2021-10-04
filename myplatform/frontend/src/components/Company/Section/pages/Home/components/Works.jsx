import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useScrollFadeIn } from "../../../hooks";
import { Col, Row } from "reactstrap";
import { getHrCard } from "../../../../../../actions/commonActions";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import resume from "@/assets/main-image/resume.svg";
import applicant from "@/assets/main-image/applicant.svg";
import review from "@/assets/main-image/review.svg";

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
    ${(props) => props.theme.typography.label};
    color: ${(props) => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
  Title: styled.h2`
    ${(props) => props.theme.typography.subtitle};
    color: ${(props) => props.theme.palette.black};
    text-align: center;
    margin-bottom: 1rem;
  `,
  Tab: styled.div``,
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
    ${(props) => props.theme.typography.subtitle};
    color: ${(props) => props.theme.palette.black};
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
  ItemList: styled.div`
    // height: 380px;
    display: inline-flex;
  `,
  ItemCard: styled.div`
    width: 580.4px;
    height: 280px;
    flex-direction: column;
    justify-content: center;
    // align-items: left;
    margin: 15px;
    gap: 10px;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    :hover {
      border: 1px solid rgb(184 156 253);
    }
  `,
  ItemLabel: styled.p`
    font-size: 18px;
  `,
  ItemDescription: styled.p`
    // flex-grow: 0;
    text-align: -webkit-left;
    opacity: 0.8;
    font-family: SpoqaHanSansNeo;
    font-size: 14px;
    // font-weight: normal;
    // font-stretch: normal;
    // font-style: normal;
    // line-height: 1.6;
    // letter-spacing: -0.28px;
    // text-align: left;
    color: #00151c;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  Logo: styled.div`
    width: 40px;
    height: 32px;
    flex-grow: 0;
    margin-right: 10px;
    // border: solid 1px #d8d8d8;
  `,
};

const Works = () => {
  const animatedItem = {
    0: useScrollFadeIn("down", 1),
    1: useScrollFadeIn("down", 1, 0.2),
    2: useScrollFadeIn("down", 1, 0.4),
  };
  const [hr, setHr] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getHrCard()
      .then((data) => {
        setHr(data);
        setLoader(false);
      })
      .catch((err) => setLoader(false));
  }, []);

  // tab value
  const onHandleChange = (event, newValue) => {
    setTabIndex(newValue);
    if (newValue == 1) {
      // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0100000'));
    } else if (newValue == 2) {
      // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0200000'));
    } else if (newValue == 3) {
      // setSearchLists(sugubs.filter(data => data.sugub_status.code_id === 'CC0300000'));
    } else {
      // setSearchLists(sugubs)
    }
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles({
    tab: {
      minWidth: 130,
      width: 130,
    },
  });

  // console.log("hr", hr);

  return (
    <div style={{ maxLength: "none", backgroundColor: "white" }}>
      <S.Wrapper>
        <S.Label>파트너스</S.Label>
        <S.Title>여러 HR전문회사들이 함께하고 있습니다.</S.Title>
        <S.SubTitle>원하시는 HR전문회사를 선택해 계약을 체결해보세요.</S.SubTitle>
        <br />
        {/*<S.Tab>
                    <Tabs variant="scrollable"
                          scrollButtons="on"
                          aria-label="scrollable auto tabs example"
                          TabIndicatorProps={{style: {background:'#9266ff', height: '3px'}}}
                          value={tabIndex}
                          onChange={onHandleChange}
                    >
                        <Tab label='사무지원' {...a11yProps(0)} classes={{ root: classes.tab }}/>
                        <Tab label='비서' {...a11yProps(1)} classes={{ root: classes.tab }}/>
                        <Tab label='수행기사' {...a11yProps(2)} classes={{ root: classes.tab }}/>
                        <Tab label='이력서 필터링' {...a11yProps(3)} classes={{ root: classes.tab }}/>
                    </Tabs>
                </S.Tab>*/}
        <br />
        <S.ItemList>
          <Row>
            {hr.length &&
              hr.map((value, index) => {
                return (
                  <Col md={6} key={index}>
                    <S.ItemCard key={index}>
                      <div style={{ display: "flex" }}>
                        <S.Logo>
                          <img src={value.company_logo} alt={""} />
                        </S.Logo>
                        <S.ItemLabel>{value.custname}</S.ItemLabel>
                        <Link
                          to={{
                            pathname: `/Company/ProfileDetail/${value.id}`,
                            state: {
                              hrprofile: value,
                            },
                          }}
                          style={{ marginLeft: "auto" }}
                        >
                          <MoreHorizIcon style={{ color: "#9469FF" }} />
                        </Link>
                      </div>
                      <br />
                      <div style={{ display: "flex" }}>
                        <img src={resume} />
                        <S.IconText>등록된 이력서 {value.resume_count} 개</S.IconText>
                        <S.Line>I</S.Line>
                        <img src={applicant} />
                        <S.IconText>진행건수 {value.jobad_count} 건</S.IconText>
                        <S.Line>I</S.Line>
                        <img src={review} />
                        <S.IconText>리뷰 {value.hr_sugub_reviews.length} 개</S.IconText>
                      </div>
                      <hr />

                      <S.ItemDescription>{value.introduce}</S.ItemDescription>
                    </S.ItemCard>
                  </Col>
                );
              })}
          </Row>
        </S.ItemList>
        {/*{WORKS_ITEMS.map((item, index) => (*/}
        {/*  <S.ListItem key={item.title} {...animatedItem[index]}>*/}
        {/*    <S.ItemImage image={item.image} />*/}
        {/*    <S.TextContainer>*/}
        {/*      <S.ItemTitle>{item.title}</S.ItemTitle>*/}
        {/*      <S.ItemLabel>{item.label}</S.ItemLabel>*/}
        {/*      <S.ItemDesciption>{item.description}</S.ItemDesciption>*/}
        {/*      <S.TextButton>Read more</S.TextButton>*/}
        {/*    </S.TextContainer>*/}
        {/*  </S.ListItem>*/}
        {/*))}*/}
        {/*<Link to={'/Company/Partners'}> <Button fill="outline" style={{marginBottom: '2rem'}}>더 많은 파트너스보기</Button></Link>*/}
      </S.Wrapper>
    </div>
  );
};

export default Works;
