import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {
    renderAsyncCreatableSelectField,
    renderError,
} from "../../../utils/renderUtils";
import {getCompanyProfile, updateCompanyProfile} from "../../../actions/authActions";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, Row, Spinner} from "reactstrap";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../../store";
import history from "@/utils/historyUtils";
// import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {checkCorporateRegistrationNumber} from "../../../function/common";
import {
    renderInputField,
    renderInputNumberField,
    renderPhoneNumberField,
    renderTextAreaField
} from "../../../utils/renderUtils_rsuite";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="span">{children}</Typography>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CompanyProfileEdit = (props) => {
    const {handleSubmit, error, submitting} = props;
    let initialValues = store.getState().form.companyupdate.initial;
    const company = props.company;
    const [value, setValue] = useState(0);
    const [previewURL, setPreviewURL] = useState(null);

    const company_logo_file = useSelector((store) =>
        store.form.companyupdate.values ? store.form.companyupdate.values.company_logo_file : null
    );
    const company_image = useSelector((store) =>
        store.form.companyupdate.values ? store.form.companyupdate.values.company_image : null
    );

    // tab value
    const handleChange = (event, newValue) => {
        // setValue(newValue);
        const syncErrors = store.getState().form.companyupdate.syncErrors;
        if(syncErrors === undefined) {
            setValue(newValue);
        }else{
            alert('?????? ??????????????? ??????????????????!')
        }
    };

    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>?????? ????????? ??????????????????<br/>
                        <small>HR?????? ?????? ????????????(????????????)?????? ???????????? ?????????.</small>
                    </h3>
                </div>
                <hr/>
                <form className="mx-md-1 "
                      onSubmit={handleSubmit}
                >
                    <Card style={{minHeight: '600px'}}>
                        <CardHeader>
                            <Tabs variant="fullWidth" value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
                                <Tab label="????????????" {...a11yProps(0)} />
                                <Tab label="????????????" {...a11yProps(1)} />
                                <Tab label="?????????" {...a11yProps(2)} />
                            </Tabs>
                        </CardHeader>
                        <CardBody>
                            <TabPanel value={value} index={0}>
                                {/* EnterKey Prevent */}
                                <fieldset className="form-group">
                                    <Field name="custname" label="????????????" component={renderAsyncCreatableSelectField}
                                           type="text" required
                                           disabled={initialValues && initialValues.custname ? true : false}
                                    />
                                    {initialValues && initialValues.custname && (
                                        <FormHelperText>????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                    )}
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="custid" label="???????????????" component={renderInputField}
                                           size="lg"
                                           type="text"
                                        // required={true}
                                           disabled={initialValues && initialValues.custid ? true : false}
                                    />
                                    {initialValues && initialValues.custid && (
                                        <FormHelperText>??????????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                    )}
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="gross_total" label="?????????(???)/????????????" component={renderInputField}
                                           type="number"
                                           size="lg"
                                        //validate={[required({message: "?????? ?????????????????????."})]}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <Field name="emp_count" label="????????????(???)" component={renderInputField}
                                           size="lg"
                                           type="number" //validate={[required({message: "?????? ?????????????????????."})]}
                                    />
                                </fieldset>
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_email" label="????????? ?????????" component={renderInputField}
                                                   type="text"
                                                   size="lg"
                                                // required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="manager_phone" label="????????? ?????????" component={renderPhoneNumberField}
                                                   type="text"
                                                   size="lg"
                                                // required={true}
                                                   placeholder={"ex) 010-0000-0000"}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>

                                {renderError(error)}
                                <hr/>
                                {/*<fieldset className="form-group">
                                    <button action="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting === true && (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />)
                                        }??????
                                    </button>
                                </fieldset>*/}

                            </TabPanel>
                            <TabPanel index={1} value={value}>
                                <fieldset className="form-group">
                                    <Field name="introduce" label="????????????" component={renderTextAreaField}
                                           type="text"
                                           rows={9}
                                    />
                                </fieldset>
                                <FormHelperText className="text-right">?????? ?????? 5,000??? ??????</FormHelperText>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Row>

                                    <>
                                        {/*<Col className="col-md-4">
                                                <div className='title'>???????????????</div>
                                                {imageFile != null ? (
                                                    <div className="thumbnail img-circle">
                                                        <img src={imageFile} alt="..." style={{width:300, height:300}}/>
                                                    </div>
                                                ): (<div className="thumbnail img-circle">
                                                    {company.company_image ? (
                                                        <img src={company.company_image} alt="..." style={{width:300, height:300}}/>
                                                    ):(<><br/>?????? ???????????? ?????????????????????</>)}
                                                </div>)
                                                }
                                                <input
                                                    // accept="image/*"
                                                    // className={classes.input}
                                                    style={{ display: 'none' }}
                                                    id="company_image"
                                                    type="file"
                                                    onChange={(e)=>setImage(e.target.files[0])}
                                                />

                                                <label htmlFor="company_image">
                                                    <button className="btn btn-info"
                                                            type="submit"
                                                        // className={classes.button}
                                                    >
                                                        ?????????
                                                    </button>
                                                </label>
                                            </Col>*/}

                                        <Col className="col-md-4">
                                            <p>???????????????(410x250)</p>

                                            {typeof company_logo === 'object' && (
                                                <div className="thumbnail img-circle">
                                                    <img src={previewURL} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            {company &&  company.company_logo !== null && !previewURL && (
                                                <div className="thumbnail img-circle">
                                                    <img src={company.company_logo} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="company_logo"
                                                type="file"
                                                onChange={(event)=>{
                                                    event.preventDefault();
                                                    let reader = new FileReader();
                                                    let logofile = event.target.files[0];
                                                    reader.onloadend = () => setPreviewURL(reader.result);
                                                    reader.readAsDataURL(logofile);
                                                    // props.change('company_logo_file', event.target.files[0]);
                                                    props.change('company_logo', event.target.files[0]);
                                                }}
                                            />
                                            <label htmlFor="company_logo">
                                                <Button color="primary"
                                                        variant="outlined"
                                                        component="span"
                                                        type="submit"
                                                    // className={classes.button}
                                                >
                                                    ????????????
                                                </Button>
                                            </label>
                                            {/*<div className='title'>???????????????</div>
                                                {logoFile != null ? (
                                                    <div className="thumbnail img-circle">
                                                        <img src={logoFile} alt="..." style={{width:300, height:300}}/>
                                                    </div>
                                                ): (<div className="thumbnail img-circle">
                                                    {company.company_logo ? (
                                                        <img src={company.company_logo} alt="..." style={{width:300, height:300}}/>
                                                    ) : (<><br/>?????? ???????????? ?????????????????????</>)}
                                                </div>)
                                                }
                                                <input
                                                    accept="image/*"
                                                    // className={classes.input}
                                                    style={{ display: 'none' }}
                                                    id="company_logo"
                                                    type="file"
                                                    onChange={(e)=>setLogo(e.target.files[0])}
                                                />
                                                <label htmlFor="company_logo">
                                                    <button className="btn btn-info"
                                                            component="span"
                                                            type="submit"
                                                        // className={classes.button}
                                                    >
                                                        ?????????
                                                    </button>
                                                </label>*/}
                                        </Col>
                                    </>
                                </Row>
                            </TabPanel>
                        </CardBody>
                    </Card>
                    <Col className="text-center">
                        <fieldset className="form-group">

                            <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                                {submitting === true && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />)
                                }??????
                            </button>
                            <button className="btn btn-lg btn-info "
                                    onClick={()=>history.push(`/Company/Profile`)}
                                    disabled={submitting}
                            >????????????
                            </button>
                        </fieldset>
                    </Col>
                </form>

            </Container>
        </div>
    )
};


const validate = values => {
    const errors = {};
    if (!values.custname) {
        errors.custname = '???????????? ???????????????.'
    }

    if(values.custid){
        if(values.custid.length > 12) errors.custid = '????????? ?????????????????? ??????????????????.';
        if(!checkCorporateRegistrationNumber(values.custid)) errors.custid = '????????? ?????????????????? ??????????????????.';
    }

    return errors;
};


function mapStateToProps(state, props) {
    // console.log('state.auth.company:', state.auth.company)
    if(state.auth.company){
        delete state.auth.company.cmp_manager;
        return {
            initialValues: {
                ...state.auth.company,
                custname: {
                    label: state.auth.company.custname,
                    value: state.auth.company.custname,
                }
            },
            company: state.auth.company
        }
    }
}

const afterSubmit = (result, dispatch) => {
    history.push("/Company/Profile");
}

export default connect(mapStateToProps, {getCompanyProfile})(reduxForm({
    form: "companyupdate",
    validate,
    onSubmitSuccess: afterSubmit,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: updateCompanyProfile
})(CompanyProfileEdit));

