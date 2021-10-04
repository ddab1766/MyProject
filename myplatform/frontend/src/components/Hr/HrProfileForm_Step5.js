import React from 'react'
import {Field, reduxForm} from 'redux-form'
// import validateSugubForm from '../Validate_SugubForm'
import {connect} from "react-redux";
import {Card, CardBody, Col, Row} from "reactstrap";
import HrProfileValidate from "./HrProfileValidate";
import {
    renderAsyncCreatableSelectField,
    renderError,
} from "../../utils/renderUtils";
import { renderInputField, renderPhoneNumberField } from "../../utils/renderUtils_rsuite";
import {required} from "redux-form-validators";


const HrProfileFormStep5 = props => {
    const {handleSubmit, pristine, previousPage, submitting, error} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Card className="card card-sugub">
                <CardBody>

                    <fieldset className="form-group">
                        <Field name="custname" label="회사이름" component={renderAsyncCreatableSelectField}
                               type="text"
                               required={true}
                               validate={[required({message: "필수 입력사항입니다."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="custid" label="사업자번호" component={renderInputField}
                               size="lg"
                               type="text"
                        />
                    </fieldset>
                    <Row>
                        <Col md={6}>
                            <fieldset className="form-group">
                                <Field name="gross_total" label="매출액(억)/투자금액" component={renderInputField}
                                       size="lg"
                                       type="number"
                                />
                            </fieldset>
                        </Col>
                        <Col md={6}>
                            <fieldset className="form-group">
                                <Field name="emp_count" label="임직원수(명)" component={renderInputField}
                                       size="lg"
                                       type="number"
                                />
                            </fieldset>
                        </Col>
                    </Row>
                    <fieldset className="form-group">
                        <Field name="phone" component={renderPhoneNumberField}
                               label="연락처"
                               type="text"
                               size="lg"
                               required={true}
                               placeholder={'(예) 010-0000-0000'}
                               // validate={[required({message: "필수 입력사항입니다."})]}
                        />
                    </fieldset>
                    {/*<fieldset className="form-group">*/}
                    {/*    <Field name="introduce" label="회사소개" component={renderTextAreaField}*/}
                    {/*           type="text"*/}
                    {/*        // required={true}*/}
                    {/*    />*/}
                    {/*</fieldset>*/}
                    {/*<FormHelperText className="text-right">한글 기준 10,000자 미만</FormHelperText>*/}
                    {/*<fieldset className="form-group">*/}
                    {/*    <Field name="hr_bokri" label="복리후생" component={renderTextAreaField}*/}
                    {/*           type="text"*/}
                    {/*    />*/}
                    {/*</fieldset>*/}
                    { renderError(error) }

                </CardBody>
            </Card>
            <div className="text-center">
                <button type="button" className="btn btn-lg btn-outline-info" onClick={previousPage}>
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-left" />*/}
                    </span>
                    이전
                </button>
                <button action="submit" className="btn btn-lg btn-info">
                    다음
                    <span className="btn-label">
                      {/*<i className="nc-icon nc-minimal-right" />*/}
                    </span>
                </button>
            </div>
        </form>
    )
}


export default connect(null, {})(reduxForm({
    form: 'hr_profile_wizard', //Form name is same
    // enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: HrProfileValidate
    // onSubmitSuccess: afterSubmit,
    // onSubmit: updateHrProfile
})(HrProfileFormStep5))
