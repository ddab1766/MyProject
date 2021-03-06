import React, {useState} from 'react'
import {Field, initialize, reduxForm} from 'redux-form'
import {renderError, renderField,} from "../../utils/renderUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import {loginUser} from "../../actions/authActions";
import AddOnSignup from "../auth/AddOnSignup";
import {Card, CardBody, CardTitle, Col, FormText, Spinner} from "reactstrap";
import LoaderSpinner from "../Etc/LoaderSpinner";

const SignFormEmailCheck = props => {
    const {handleSubmit, previousPage, error, submitting} = props;
    const [auth, setAuth] = useState(false);
    const [existEmail, setExistEmail] = useState('');
    const [passwordInput, setPasswordInput] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailCheck = (values) => {
        setTimeout(() => {
            setLoading(true);
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
                axios
                    .get(AuthUrls.SIGNUP_CHECK, {
                        params: {
                            email_address: values
                        }
                    })
                    .then((response) => {

                        if (response.status == '200' && response.data.email == values) {
                            setPasswordInput(true);
                            setAuth(true);
                            setExistEmail(values);
                        }else if ( response.status == '404'){
                            setPasswordInput(false);
                            setAuth(true);
                        }
                        setLoading(false)
                    })
                    .catch((error) => {
                        setPasswordInput(false);
                        setAuth(true);
                        setLoading(false)
                        // const processedError = processServerError(error.response.data);
                        //  throw new SubmissionError(error);
                    });
            } else {
                //return '????????? ????????? ????????? ??????????????????.'
            }
        }, 500)
    };

    return (
        <>
            <form onSubmit={handleSubmit}
            >
                <Card className="card card-plain">
                    <CardTitle>??????????????? ????????? ????????? ????????? ??????????????????.(??????????????? ???????????????)</CardTitle>
                    <CardBody>
                        <fieldset className="form-group">
                            <Field name="email" label="????????????" component={renderField}
                                   type="text"
                                   value={existEmail}
                                   onChange={(e) => {
                                       emailCheck(e.target.value)
                                   }}
                            />
                        </fieldset>
                        {loading ? (<LoaderSpinner/>) : (
                            <>
                                {/* ?????? ????????? ??????*/}
                                {passwordInput &&
                                <>
                                    <FormText>?????? ????????? ???????????? ????????????! ??????????????? ??????????????????.</FormText>
                                    {/*<AddOnLogin/>*/}
                                    <fieldset className="form-group">
                                        <Field name="password" label="????????????" component={renderField}
                                               type="password"
                                        />
                                    </fieldset>
                                    {renderError(error)}
                                    <Col className="text-center" md="12">
                                        <button type="button" className="btn btn-outline-primary" onClick={previousPage}>
                                            <span className="btn-label">
                                                <i className="nc-icon nc-minimal-left" />
                                            </span>
                                            ??????
                                        </button>

                                        <button action="submit" className="btn btn-primary" disabled={submitting}>
                                            {submitting === true && (
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />)
                                            }
                                            <span className="btn-label">
                                              <i className="nc-icon nc-check-2" />
                                            </span>????????????
                                        </button>
                                    </Col>
                                </>
                                }
                            </>
                        )}

                    </CardBody>
                </Card>
            </form>
            {/* ?????? ???????????? ??????*/}
            {!passwordInput && auth &&
            <AddOnSignup/>
            }
        </>
    )
};


const afterSubmit = (result, dispatch) => {
    dispatch(initialize('signup_wizard', {}));

};

// Sync field level validation for password match
const validate = values => {
    const errors = {};
    const {password1, password2} = values;
    if (password1 !== password2) {
        errors.password2 = "??????????????? ?????? ????????????."
    }
    return errors;
};

// function mapStateToProps(state, props) {
//     console.log('mapStateToProps:', props)
//     return {
//     }
// }
// export default connect(mapStateToProps)(reduxForm({
//     form: 'signup_wizard',
//     destroyOnUnmount: false,
//     forceUnregisterOnUnmount: true,
//     onSubmit: loginUser,
//     onSubmitSuccess: afterSubmit,
// })(SignFormEmailCheck))

export default reduxForm({
    form: 'signup_wizard',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: loginUser,
    onSubmitSuccess: afterSubmit,
})(SignFormEmailCheck)