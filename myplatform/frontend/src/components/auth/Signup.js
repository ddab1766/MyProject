import React, {useEffect} from "react";
// import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {renderError, renderField} from "../../utils/renderUtils";
import {renderInputField} from "../../utils/renderUtils_rsuite";
import {getRecUser, getUserProfile, signupUser} from "../../actions/authActions";
import {Container, Spinner} from "reactstrap";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import FormText from "reactstrap/es/FormText";
import SignupValidate from "./SignupValidate";

const Signup = (props) => {
    const { handleSubmit, error, submitting } = props;

    useEffect(()=>{
        if(props.match.params) props.change('key', props.match.params.key)
    },[]);

    return (
        <div className="content">
            <Container>
                <Card>
                    <CardContent>
                        <div className="col-md-6 ml-auto mr-auto pt-lg-4">
                            <form
                                className=""
                                onSubmit={handleSubmit}
                            >
                                <h4 className="">
                                    회원가입
                                </h4>
                                <hr/>
                                <fieldset className="form-group">
                                    <Field name="email" label="이메일" component={renderInputField}
                                           required={true}
                                           size="lg"
                                           type="text" validate={[required({message: "필수입력값입니다."})]}
                                    />
                                    <FormText>이메일은 아이디로 사용됩니다.</FormText>
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="nickname" label="이름" component={renderInputField}
                                           size="lg"
                                           required={true}
                                           type="text" validate={[required({message: "필수입력값입니다."})]}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="password1" label="비밀번호" component={renderInputField}
                                           size="lg"
                                           required={true}
                                           type="password" validate={[required({message: "필수입력값입니다."})]}
                                    />
                                    <FormText>영문, 숫자, 특수문자 조합 6자 이상</FormText>
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="password2" label="비밀번호 확인" component={renderInputField}
                                           size="lg"
                                           required={true}
                                           type="password" validate={[required({message: "필수입력값입니다."})]}
                                    />
                                </fieldset>

                                { renderError(error) }

                                {/*<fieldset className="form-group">*/}
                                <button action="submit"
                                        className="btn btn-lg btn-primary"
                                        style={{width:"100%"}}
                                        disabled={submitting}>
                                    {submitting === true && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />)
                                    }
                                    회원가입
                                </button>
                                <hr/>
                                <p>회원가입 시 <a href="/HelpCenter/privacy" target="_blank">개인정보 처리방침</a>과 <a href="/HelpCenter/terms" target="_blank">이용약관</a>을 확인하였으며, 동의합니다.</p>
                                <br/>
                                {/*<a className="btn nav-link" href="http://localhost:8000/accounts/kakao/login/">*/}
                                {/*    카카오톡으로 시작하기1*/}
                                {/*</a>*/}
                                {/*/!*<a className="btn nav-link" href="https://kauth.kakao.com/oauth/authorize?client_id=9167dbb75ac51661ea045e32f11f15e8&redirect_uri=http://localhost:8000/rest-auth/kakao/login/callback/&response_type=code">*!/*/}
                                {/*/!*    카카오톡으로 시작하기2*!/*/}
                                {/*/!*</a>*!/*/}
                                {/*<a className="btn nav-link"*/}
                                {/*   href="https://kauth.kakao.com/oauth/authorize?client_id=9167dbb75ac51661ea045e32f11f15e8&redirect_uri=http://localhost:8000/rest-auth/kakao/&response_type=code">*/}
                                {/*    카카오톡으로 시작하기3*/}
                                {/*</a>*/}

                                {/*<MyKakaoLogin/>*/}
                                {/*<MyfacebookLogin/>*/}
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        initialValues: {
            recuser: state.auth.recUser,
        },
    }
}

export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
    form: "signup",
    // validate: validateForm,
    validate: SignupValidate,
    onSubmit: signupUser,
})(Signup));
