import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Row } from "reactstrap";
import undraw_Wall_post_re_y78d from "@/assets/main-image/undraw_Wall_post_re_y78d 1.svg";
import undraw_Credit_card_payment_re_o911 from "@/assets/main-image/undraw_Credit_card_payment_re_o911 1.svg";
import undraw_People_search_re_5rre from "@/assets/main-image/undraw_People_search_re_5rre 1.svg";
import undraw_Hello_re_3evm from "@/assets/main-image/undraw_Hello_re_3evm 1.svg";

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 120px 15px;
    display: flex;
    flex-direction: column;
    text-align: center;
    // align-items: center;
  `,
  Label: styled.p`
    display: inline-block;
    ${(props) => props.theme.typography.label};
    color: ${(props) => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
  Title: styled.h2`
    ${(props) => props.theme.typography.subtitle};
    color: ${(props) => props.theme.palette.black};
    margin-bottom: 1rem;
  `,
  Description: styled.p`
    ${(props) => props.theme.typography.description};
    color: ${(props) => props.theme.palette.black};
    // margin-bottom: 4rem;
  `,
  List: styled.ul`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-inline-start: 0px;
    display: inline-block;
    // margin-bottom: 4rem;
  `,
  ListItem: styled.li`
    flex-grow: 0;
    margin: 0 20px 0 0;
    padding: 48.2px 47px 78.8px 45.1px;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
  `,
  ItemCard: styled.div`
    max-width: 360px;
    max-height: 360px;
    font-size: 20px;
    flex-grow: 0;
    line-height: normal;
    letter-spacing: -0.48px;
    text-align: left;
    font-family: SpoqaHanSansNeo;
    margin: 16px 0 0;
    padding: 24px 8px 19px 12px;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
  `,
  CardTitle: styled.div`
    margin-left: 10px;
    flex-grow: 0;
    opacity: 0.89;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #00151c;
  `,
  ItemImage: styled.div`
    width: 100%;
    height: 380px;
    border-radius: 0.5rem 0.5rem 0 0;
    background: no-repeat center/cover url(${(props) => props.image});
  `,
  ItemTitle: styled.p`
    flex-grow: 0;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    margin-right: 15px;
    // line-height: 12px;
    letter-spacing: -0.48px;
    text-align: left;
    color: #9266ff;
  `,
  StepText: styled.div`
    flex-grow: 0;
    opacity: 0.89;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    // line-height: normal;
    // letter-spacing: -0.48px;
    // text-align: left;
    color: #7466ff;
  `,
  Circle: styled.div`
    width: 18px;
    height: 18px;
    flex-grow: 0;
    border-radius: 50%;
    margin: 0 8px 0 0;
    // padding: 3px 8.5px 0;
    background-color: #9266ff;
    font-size: 12px;
    color: white;
    text-align: center;
    cursor: pointer;
  `,
  Circle2: styled.div`
    width: 18px;
    height: 18px;
    flex-grow: 0;
    border-radius: 50%;
    margin: 0 16px 0 0;
    // padding: 3px 8.5px 0;
    border: solid 1px #8f9296;
    font-size: 12px;
    color: #8f9296;
    text-align: center;
    cursor: pointer;
  `,
  ItemDescription: styled.p`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: normal;
    font-size: 14px;
  `,
  TextButton: styled.button`
    width: fit-content;
    padding: 0;
    ${(props) => props.theme.typography.textbutton};
    color: ${(props) => props.theme.palette.secondary};
    cursor: pointer;
  `,
};

class Process_Mobile extends React.Component {
  state = {
    slideIndex: 0,
  };
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      // prevArrow: <SamplePrevArrow />,
      variableWidth: true,
      className: "slider variable-width slides",
    };
    // console.log('this.state', this.state.slideIndex)
    return (
      <div>
        <S.Wrapper>
          <S.Label>이용 메뉴얼</S.Label>
          <S.Title>
            채용마켓의 간편하고
            <br /> 신뢰할 수 있는
            <br /> 프로세스를 경험하세요.
          </S.Title>
          <div className="centered">
            {this.state.slideIndex === 0 ? (
              <>
                <S.Circle
                  onClick={(e) => {
                    this.setState({ slideIndex: 0 });
                    this.slider.slickGoTo(0);
                  }}
                >
                  1
                </S.Circle>
                <S.ItemTitle>의뢰서 작성</S.ItemTitle>
              </>
            ) : (
              <S.Circle2
                onClick={(e) => {
                  this.setState({ slideIndex: 0 });
                  this.slider.slickGoTo(0);
                }}
              >
                1
              </S.Circle2>
            )}

            {this.state.slideIndex === 1 ? (
              <>
                <S.Circle
                  onClick={(e) => {
                    this.setState({ slideIndex: 1 });
                    this.slider.slickGoTo(1);
                  }}
                >
                  2
                </S.Circle>
                <S.ItemTitle>채용진행</S.ItemTitle>
              </>
            ) : (
              <S.Circle2
                onClick={(e) => {
                  this.setState({ slideIndex: 1 });
                  this.slider.slickGoTo(1);
                }}
              >
                2
              </S.Circle2>
            )}

            {this.state.slideIndex === 2 ? (
              <>
                <S.Circle
                  onClick={(e) => {
                    this.setState({ slideIndex: 2 });
                    this.slider.slickGoTo(2);
                  }}
                >
                  3
                </S.Circle>
                <S.ItemTitle>합격자 선정</S.ItemTitle>
              </>
            ) : (
              <S.Circle2
                onClick={(e) => {
                  this.setState({ slideIndex: 2 });
                  this.slider.slickGoTo(2);
                }}
              >
                3
              </S.Circle2>
            )}

            {this.state.slideIndex === 3 ? (
              <>
                <S.Circle
                  onClick={(e) => {
                    this.setState({ slideIndex: 3 });
                    this.slider.slickGoTo(3);
                  }}
                >
                  4
                </S.Circle>
                <S.ItemTitle>완료</S.ItemTitle>
              </>
            ) : (
              <S.Circle2
                onClick={(e) => {
                  this.setState({ slideIndex: 3 });
                  this.slider.slickGoTo(3);
                }}
              >
                4
              </S.Circle2>
            )}
          </div>
          <Slider ref={(slider) => (this.slider = slider)} {...settings}>
            <div style={{ margin: "10px" }}>
              <S.ItemCard>
                <p style={{ display: "flex" }}>
                  <S.StepText>STEP01</S.StepText>
                  <S.CardTitle>채용의뢰서 작성 및 회원가입</S.CardTitle>
                </p>
                <Row>
                  <Col sm={7}>
                    <S.ItemDescription>
                      간략한 정보들을 입력하여 작성합니다.
                      <br />
                      입력하신 정보를 검토 후, 담당자가 연락드립니다.
                      <br />
                      <br />
                      <small>* 검토 후 해당건을 진행합니다.</small>
                      <br />
                    </S.ItemDescription>
                  </Col>
                  <Col sm={5} className="centered">
                    <br />
                    <img src={undraw_Wall_post_re_y78d} width={230} height={153} />
                  </Col>
                </Row>
              </S.ItemCard>
            </div>
            <div style={{ margin: "10px" }}>
              <S.ItemCard>
                <p style={{ display: "flex" }}>
                  <S.StepText>STEP02</S.StepText>
                  <S.CardTitle>채용진행</S.CardTitle>
                </p>
                <Row>
                  <Col md={7}>
                    <S.ItemDescription>
                      파트너사에서 해당 채용건에 맞는 적합한
                      <br />
                      인재를 접수합니다.
                      <br />
                      <br />
                      <small>* 이력서 상태별 필터링 및 예상산출내역서 확인</small>
                    </S.ItemDescription>
                  </Col>
                  <Col md={5} className="centered">
                    <br />
                    <img src={undraw_Credit_card_payment_re_o911} width={230} height={153} />
                  </Col>
                </Row>
              </S.ItemCard>
            </div>
            <div style={{ margin: "10px" }}>
              <S.ItemCard>
                <p style={{ display: "flex" }}>
                  <S.StepText>STEP03</S.StepText>
                  <S.CardTitle>지원자 검토 및 합격자 선정</S.CardTitle>
                </p>
                <Row>
                  <Col md={7}>
                    <S.ItemDescription>
                      지원된 이력서를 검토하고 합격자를 선정합니다.
                      <br />
                      <br />
                      <br />
                      <small>* 이력서를 WEB상에서 확인하거나 다운로드합니다.</small>
                    </S.ItemDescription>
                  </Col>
                  <Col md={5} className="centered">
                    <br />
                    <img src={undraw_People_search_re_5rre} width={230} height={153} />
                  </Col>
                </Row>
              </S.ItemCard>
            </div>
            <div style={{ margin: "10px" }}>
              <S.ItemCard>
                <p style={{ display: "flex" }}>
                  <S.StepText>STEP04</S.StepText>
                  <S.CardTitle>완료</S.CardTitle>
                </p>
                <Row>
                  <Col md={7}>
                    <S.ItemDescription>
                      모든 프로세스가 완료되었습니다.
                      <br />
                      파트너사와 계약을 진행해주세요
                      <br />
                      <br />
                      <small>{"　"}</small>
                    </S.ItemDescription>
                  </Col>
                  <Col md={5} className="centered">
                    <br />
                    <img src={undraw_Hello_re_3evm} width={230} height={153} />
                  </Col>
                </Row>
              </S.ItemCard>
            </div>
          </Slider>
          <br />
        </S.Wrapper>
      </div>
    );
  }
}

export default Process_Mobile;
