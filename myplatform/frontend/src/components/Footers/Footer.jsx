/*eslint-disable*/
import React from "react";
import {Col, Row} from "reactstrap";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from "styled-components";
import logo from "@/assets/main-image/logo.png";

class Footer extends React.Component {
  render() {
    return (
        <footer style={{"position":"static",
          "bottom":"0px",
          "height":"187.7px",
          "width":"100%",
          "border": "1px solid #e0e0e0"
        }}
        >
          <S.Wrapper>
            <S.List>
              <S.ListItem>
                <Link to={'/HelpCenter/privacy'} style={{textDecoration:'none'}}>
                  <S.Text>개인정보 취급방침</S.Text>
                </Link>
              </S.ListItem>
              <S.ListItem>
                <Link to={'/HelpCenter/terms'} style={{textDecoration:'none'}}>
                  <S.Text>이용약관</S.Text>
                </Link>
              </S.ListItem>
              <S.ListItem>
                <Link to={'/HelpCenter'} style={{textDecoration:'none'}}>
                  <S.Text>고객센터</S.Text>
                </Link>
              </S.ListItem>
            </S.List>

            <hr/>

            <Row>
              <Col md={2}>
                <img src={logo}
                    // srcSet={require('@/assets/main-image/image 7@2x.png')}
                     width={'150px'} height={'51.3px'}/>
              </Col>
              <Col md={10}>
                <S.Copyright>
                  주식회사 겟스로우 (대표이사: xxx) / 서울특별시 (주)겟스로우<br/>
                  사업자등록번호: 000-00-0000 / 통신판매업신고: 제0000-서울강남-00000 호 / 직업정보제공사업 신고번호: 00000000000000<br/>
                  Copyright, (C) 채용마켓. All rights reserved.<br/>
                </S.Copyright>
              </Col>
            </Row>
          </S.Wrapper>
        </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

const S = {
  Wrapper: styled.section`
    width: 100%;
    max-width: 1180px;
    margin: auto;
    padding: 24px 0 19.7px;
    display: flex;
    flex-direction: column;
    align-items: left;
  `,
  List: styled.ul`
    width: 100%;
    list-style:none;
    font-family: SpoqaHanSansNeo;
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    padding-inline-start: 0px;
    // display: inline-block;
    margin-left: 1rem;
  `,
  ListItem: styled.li`
  flex-grow: 0;
  margin: 0 20px 0 0;
  // padding: 48.2px 47px 78.8px 45.1px;
  // border-radius: 12px;
  // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
  // background-color: #ffffff;
  `,
  Text: styled.span`
  flex-grow: 0;
  opacity: 0.8;
  font-family: SpoqaHanSansNeo;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  text-align: center;
  color: #00151c;
  `,
  Copyright: styled.p`
  flex-grow: 0;
  opacity: 0.5;
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  line-height: 1.6;
  letter-spacing: -0.35px;
  text-align: left;
  color: #00151c;
  `
}

export default Footer;
