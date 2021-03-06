import React from "react";
// import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {required} from "redux-form-validators"
import {renderAsyncCreatableSelectField} from "../../../utils/renderUtils";
import {renderInputField} from "@/utils/renderUtils_rsuite";
import {getRecUser, getUserProfile} from "../../../actions/authActions";
import {connect} from "react-redux";
import {Spinner} from "reactstrap";
import {sugubSignupFormSubmit} from "../../../actions/sugubActions";
import FormText from "reactstrap/es/FormText";

const AddOnCompanySignup = (props) => {

    const {handleSubmit, error, submitting} = props;

    return (
        <form
            onSubmit={handleSubmit}
        >
            {/*<p>AddOnCompanySignUp</p>*/}
            {/*<fieldset className="form-group">
                        <Field name="email" label="이메일＊" component={renderField}
                               type="text" validate={[required({message: "필수입력값입니다."})]}/>
                    </fieldset>*/}
            <fieldset className="form-group">
                <Field name="nickname" label="본인의 이름(실명)을 입력해주세요" component={renderInputField}
                       type="text"
                       size="lg"
                       required={true}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="password1" label="비밀번호" component={renderInputField}
                       type="password"
                       size="lg"
                       required={true}
                />
                <FormText>영문, 숫자, 특수문자 조합 6자 이상</FormText>
            </fieldset>

            <fieldset className="form-group">
                <Field name="password2" label="비밀번호 확인" component={renderInputField}
                       type="password"
                       size="lg"
                       required={true}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="custname" label="회사명" component={renderAsyncCreatableSelectField}
                       validate={[required({message: "필수 입력사항입니다."})]}
                       type="text"
                       required={true}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="phone" component={renderInputField}
                       label="담당자 연락처"
                       required={true}
                       type="text"
                       size="lg"
                       validate={[required({message: "필수 입력사항입니다."})]}
                />
            </fieldset>

            <fieldset className="form-group">
                <Field name="custid" label="사업자번호" component={renderInputField}
                       size="lg"
                       type="text"
                />
            </fieldset>

            {/*<fieldset className="form-group">*/}
            {/*    <Field name="is_agree" component={renderCheckboxField}*/}
            {/*           label={'개인정보 처리방침 및 이용약관에 동의합니다'}*/}
            {/*           type="checkbox"*/}
            {/*           required={true}*/}
            {/*    />*/}
            {/*    */}
            {/*</fieldset>*/}
            <p>회원가입 시 <a href="/HelpCenter/privacy" target="_blank">개인정보 처리방침</a>과 <a href="/HelpCenter/terms" target="_blank">이용약관</a>을 확인하였으며, 동의합니다.</p>

            {/*{ renderError(error) }*/}
            <hr/>
            <div className="text-center">
                <button action="submit"
                        className="btn btn-lg btn-info" disabled={submitting}>
                    {submitting === true && (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />)
                    }
                    등록하기
                </button>
            </div>
        </form>
    );
}

// Sync field level validation for password match
const validateForm = values => {
    const errors = {};
    const {password1, password2, manager_phone} = values;
    if(password1){
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(password1)){
            errors.password1 = "영문, 숫자, 특수문자 조합 6자 이상"
        }
    }
    if (password1 !== password2) {
        errors.password2 = "비밀번호가 같지 않습니다."
    }
    // 담당자 연락처
    if(!values.phone){
        errors.phone = '필수 입력사항입니다.'
    }else if(values.phone.length > 13){
        errors.phone = '13글자 이하로 작성해주세요.'
    }
    return errors
};

function mapStateToProps(state) {
    return {
        initialValues: {
            ...state.form.sugub_wizard.values,
            recuser: state.auth.recUser,
        },
    }
}


const afterSubmit = (result, dispatch) => {
    // dispatch(initialize('sugub_wizard', {}));
    // store.dispatch(reset('sugub_wizard'));
    // history.push("/Company/Sugub/CC0100000");
}

export default connect(mapStateToProps, {getUserProfile, getRecUser})(reduxForm({
    form: "sugub_wizard",
    destroyOnUnmount: false,
    // form: "AddOnSignup",
    validate: validateForm,
    // onSubmitSuccess: afterSubmit,
    onSubmit: sugubSignupFormSubmit
})(AddOnCompanySignup));

