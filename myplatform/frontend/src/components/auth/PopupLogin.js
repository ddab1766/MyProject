import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import history from "@/utils/historyUtils";
import { Field, reduxForm } from "redux-form";
import { required } from "redux-form-validators";
import { renderError, renderField } from "../../utils/renderUtils";
import { renderInputField } from "../../utils/renderUtils_rsuite";
import { loginUser } from "../../actions/authActions";
import MyfacebookLogin from "./FacebookLogin";
import { Container, Spinner } from "reactstrap";
import MygoogleLogin from "./GoogleLogin";
import { Link } from "react-router-dom";
import logo from "@/assets/main-image/image 6.png";
import styled from "styled-components";

const S = {
  Logo: styled.div`
    text-align: center;
    padding: 10px;
  `,
  LogoText: styled.p``,
};

const PopupLogin = (props) => {
  const { handleSubmit, error, submitting, toggle, url } = props;
  const [path, setPath] = useState(url);
  useEffect(() => {
    if (!url) setPath("Company");
  }, []);

  return (
    <Container>
      <form
        // className="col col-sm-4 card mt-5 p-4 m-3"
        onSubmit={handleSubmit}
      >
        <S.Logo>
          <img src={logo} />
          <S.LogoText>국내 최초 B2B 채용 플랫폼</S.LogoText>
        </S.Logo>
        {/*<h4 className="text-md-center">로그인</h4>*/}
        <hr />
        <fieldset className="form-group">
          <Field
            name="email"
            // label="이메일"
            placeholder={"이메일"}
            component={renderInputField}
            size={"lg"}
            type="text"
            validate={[required({ message: "필수 입력사항입니다." })]}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            // label="패스워드"
            placeholder="비밀번호"
            component={renderInputField}
            size={"lg"}
            type="password"
            validate={[required({ message: "필수 입력사항입니다." })]}
          />
        </fieldset>
        {renderError(error)}
        <div className="">
          <button
            type="submit"
            className="btn btn-info btn-lg"
            disabled={submitting}
            style={{ width: "100%", "margin-top": "10px", padding: "10px" }}
          >
            {submitting === true && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
            로그인
          </button>
        </div>
        <Link to={`/Company/reset_password`} onClick={toggle}>
          비밀번호 찾기
        </Link>
        <hr />
        {/*SNS 로그인*/}
        {/*<p className="text-center">Or</p>*/}
        {/*<MyKakaoLogin/>*/}
        {/*<MyNaverLogin/>*/}
        <div onClick={toggle}>
          <MygoogleLogin />
        </div>
        <div onClick={toggle}>
          <MyfacebookLogin />
        </div>
        <hr />
        아직 회원이 아니세요?
        <Link to={`/${path}/signup`} onClick={toggle}>
          {" "}
          회원가입
        </Link>
      </form>
      {/*</Row>*/}
    </Container>
  );
};

export default reduxForm({
  form: "popup_login",
  onSubmit: loginUser,
  onSubmitSuccess: (result, dispatch, props) => {
    // loginSubmit 존재시
    if (props.loginSubmit) props.loginSubmit();
    if (props.redirectUrl) history.push(props.redirectUrl);
  },
})(PopupLogin);
