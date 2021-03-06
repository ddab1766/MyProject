import React, {useEffect, useState} from "react";
import {Field, FieldArray, formValueSelector, initialize, reduxForm} from "redux-form";
import {
    renderAsyncCreatableSelectField,
    renderError,
    renderField,
    renderMultiSelectField,
    renderNumberField,
    renderTextAreaField
} from "../../utils/renderUtils";
import {updateHrProfile} from "../../actions/authActions";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardHeader, Col, Container, FormText, Row, Spinner} from "reactstrap";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import store from "../../store";
import history from "@/utils/historyUtils";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DaumPostcode from "../Etc/DaumPostcode_mng";
import Nothing from "../Common/Nothing";
import Chip from "@material-ui/core/Chip";
import {Checkbox} from "rsuite";
import {required} from "redux-form-validators";
import Slider from "@material-ui/core/Slider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import {renderInputField} from "../../utils/renderUtils_rsuite";

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

const HrProfileEdit = (props) => {
    const {handleSubmit, error, submitting, initialValues} = props;
    const {service_address, company_logo, services, hrfee} = props;
    const {comcode, hr} = useSelector(state => ({
            comcode: state.comcode.comcode,
            hr: state.auth.hr
        })
    );

    const [value, setValue] = useState(0);
    const [previewURL, setPreviewURL] = useState(null);
    const [previewImageURL, setPreviewImageURL] = useState(null);
    const [addressOptions, setAddressOptions] = useState(comcode.filter(v=> v.code_topidx === 'BE'));
    const [addressData, setAddressData] = useState(initialValues ? initialValues.service_address : []);

    const [taxRange, setTaxRange] = useState([5, 7]);
    const [dogubTaxRange, setDogubTaxRange] = useState([5, 7]);

    const hrprofile_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.hrprofile_file : null
    );
    const company_logo_file = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_logo_file : null
    );
    const company_image = useSelector((store) =>
        store.form.hrupdate.values ? store.form.hrupdate.values.company_image : null
    );

    const handleTaxChange = (event, newValue) => {
        setTaxRange(newValue);
        props.change('hrfee_AC0100000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0100000[0].fee_end', newValue[1]);
    };

    const handleDogubTaxChange = (event, newValue) => {
        setDogubTaxRange(newValue);
        props.change('hrfee_AC0200000[0].fee_start', newValue[0]);
        props.change('hrfee_AC0200000[0].fee_end', newValue[1]);
    };

    useEffect(()=>{
        if(addressData && addressData.length >= 0 ){
            props.change('service_address', addressData);
        }
    },[addressData])

    // tab value
    const handleChange = (event, newValue) => {
        const syncErrors = store.getState().form.hrupdate.syncErrors;
        if(syncErrors === undefined) {
            setValue(newValue);
        }else{
            alert('?????? ??????????????? ??????????????????!')
        }
    };

    const handleClick = (e, data, selected) => {
        // setLowData(service_address);
        if(selected){
            setAddressData(addressData.concat(data));
            e.currentTarget.classList.add('MuiChip-primary');
            e.currentTarget.classList.remove('MuiChip-outlined');
        }else{
            console.log('data?', data)
            setAddressData(addressData.filter(v => v.code_id !== data.code_id));
            e.currentTarget.classList.add('MuiChip-outlined');
            e.currentTarget.classList.remove('MuiChip-primary');
        }
        // props.change('service_address', lowData)
    };



    return (
        <div className="content">
            <Container>
                <div className="title">
                    <h3>????????? ?????? ????????? ???????????? ????????????.<br/>
                        <small></small>
                    </h3>
                </div>
                <hr/>
                <form className=""
                      onSubmit={handleSubmit}
                >
                    <Card>

                        <CardHeader>
                            <Tabs value={value} onChange={handleChange} textColor="Primary" aria-label="simple tabs example" indicatorColor="primary">
                                <Tab label="????????????" {...a11yProps(0)} />
                                <Tab label="????????????" {...a11yProps(1)} />
                                <Tab label="?????????" {...a11yProps(2)} />
                                <Tab label="?????????" {...a11yProps(3)} />
                                <Tab label="????????????" {...a11yProps(4)} />
                            </Tabs>
                        </CardHeader>
                        {/* </AppBar> */}
                        <CardBody>
                            <TabPanel value={value} index={0}>
                                {/* EnterKey Prevent */}
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custname" label="?????????" component={renderAsyncCreatableSelectField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custname ? true : false}
                                            />
                                            {initialValues && initialValues.custname && (
                                                <FormHelperText>????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="custid" label="???????????????" component={renderField}
                                                   type="text"
                                                   required={true}
                                                   disabled={initialValues && initialValues.custid ? true : false}
                                            />
                                            {initialValues && initialValues.custid && (
                                                <FormHelperText>??????????????? ????????? admin@chaegong.co.kr ??? ??????????????????</FormHelperText>
                                            )}
                                        </fieldset>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="gross_total" label="?????????(???)/????????????" component={renderInputField}
                                                   type="number"
                                                   size="lg"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="emp_count" label="????????????(???)" component={renderInputField}
                                                   type="number"
                                                   size="lg"
                                                   required={true}
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={1}>
                                        <fieldset className="form-group">
                                            <Field
                                                name="load_addr_code"
                                                component={renderInputField}
                                                size="lg"
                                                type="text"
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col>
                                        <DaumPostcode formName="hrupdate" filed1="load_addr" filed2='load_addr_code' filed3='load_addr_detail'/>
                                    </Col>
                                </Row>
                                <fieldset className="form-group">
                                    <Field name="load_addr" label="??????" component={renderInputField}
                                           type="text"
                                           size="lg"
                                           // labelSize={3}
                                           // colSize={9}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <Field name="load_addr_detail" label="????????????" component={renderInputField}
                                           type="text"
                                           size="lg"
                                           // labelSize={3}
                                           // colSize={9}
                                    />
                                </fieldset>



                                <fieldset className="form-group">
                                    <div style={{marginBottom: '10px',fontSize: '1.0em'}}>????????? ????????????(????????????)</div>
                                    <Checkbox onChange={(e, checked)=>{
                                        if(checked) setAddressData(comcode.filter(v=> v.code_topidx === 'BE'))
                                        else {
                                            setAddressData([])
                                        }
                                    }}
                                    > ??????
                                    </Checkbox>
                                    {addressOptions.map( data => {
                                        if(addressData && addressData.length > 0){
                                            if(addressData.filter(v=> v.code_id === data.code_id).length > 0){
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                        // onDelete={(e)=>console.log('e', e)}
                                                        // deleteIcon={<DoneIcon />}
                                                          onClick={(e) => {handleClick(e,data, false)}}
                                                          color="secondary"
                                                          variant="outlined"
                                                    />
                                                )
                                            }else{
                                                return (
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data, true)}
                                                          variant="outlined"
                                                    />
                                                )
                                            }
                                        } else {
                                            return (
                                                <>
                                                    <Chip label={data.code_name}
                                                          value={data.code_id}
                                                          onClick={(e) => handleClick(e,data,true)}
                                                          variant="outlined"
                                                    />
                                                </>
                                            )
                                        }
                                    })}
                                </fieldset>

                                <Row>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="homepage" label="????????????" component={renderInputField}
                                                   type="text"
                                                   size="lg"
                                            />
                                        </fieldset>
                                    </Col>
                                    <Col md={6}>
                                        <fieldset className="form-group">
                                            <Field name="since" label="????????????" component={renderInputField}
                                                   type="number"
                                                   size="lg"
                                            />
                                        </fieldset>
                                    </Col>
                                </Row>
                                <hr/>
                                {renderError(error)}
                            </TabPanel>
                            <TabPanel index={1} value={value}>
                                <fieldset className="form-group">
                                    <Field name="introduce" label="????????????" component={renderTextAreaField}
                                           type="text"
                                        // required={true}
                                    />
                                </fieldset>
                                <FormHelperText className="text-right">?????? ?????? 10,000??? ??????</FormHelperText>
                                <fieldset className="form-group">
                                    <Field name="hr_bokri" label="????????????" component={renderTextAreaField}
                                           type="text"
                                    />
                                </fieldset>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Col md={12}>
                                    <fieldset className="form-group">
                                        <Field name="services" label="???????????????" component={renderMultiSelectField}
                                               code_topidx="AC"
                                               code_topcd={null}
                                               type="text"
                                               options={comcode}
                                               multi
                                        />
                                    </fieldset>
                                </Col>

                                { services && (
                                    <Col md={6}>
                                        {services.filter(v=>v.code_id ==='AC0100000').length > 0 && (
                                            <>

                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>???????????? ???????????? ???????????? ??????????????????????</div>
                                                <FieldArray name={`hrfee_AC0100000`} component={renderServices1}
                                                            handleChange={handleTaxChange} taxRange={taxRange} setTaxRange={setTaxRange}/>
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0200000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>?????? ???????????? ???????????? ??????????????????????</div>
                                                <FieldArray name="hrfee_AC0200000" component={renderServices1}
                                                            handleChange={handleDogubTaxChange} taxRange={dogubTaxRange} setTaxRange={setDogubTaxRange}/>
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0300000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>???????????? ???????????? ?????? ????????? ???????????? ??????????????????????</div>

                                                <FieldArray name="hrfee_AC0300000" component={renderServices} />
                                            </>
                                        )}
                                        {services.filter(v=>v.code_id ==='AC0400000').length > 0 && (
                                            <>
                                                <div style={{marginBottom: '10px',fontSize: '1.0em'}}>???????????? ???????????? ?????? ????????? ???????????? ??????????????????????</div>
                                                <FieldArray name="hrfee_AC0400000" component={renderServices} />
                                            </>
                                        )}
                                    </Col>
                                )}
                                {renderError(error)}
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <>
                                    <Row>
                                        <Col className="col-md-4">
                                            <p>???????????????(410x250)</p>

                                            {typeof company_logo === 'object' && company_logo !== null &&  (
                                                <div className="thumbnail img-circle">
                                                    <img src={previewURL} alt="..." style={{width:410, height:250}}/>
                                                </div>
                                            )}

                                            {hr && hr.company_logo !== null && !previewURL && (
                                                <div className="thumbnail img-circle">
                                                    <img src={hr.company_logo} alt="..." style={{width:410, height:250}}/>
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
                                        </Col>
                                    </Row>
                                </>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <p>??????????????? ??? ?????? ??????????????? ?????????????????????</p>
                                {/* ?????? ????????? ?????? */}
                                {hrprofile_file && (
                                    <a href='#' target="_blank">{hrprofile_file.name}<br/></a>
                                )}

                                <input
                                    // accept="image/*"
                                    style={{ display: 'none' }}
                                    id="hrfile"
                                    type="file"
                                    onChange={(event)=>{
                                        event.preventDefault();
                                        let reader = new FileReader();
                                        let file = event.target.files[0];
                                        reader.onloadend = () => setPreviewURL(reader.result);
                                        reader.readAsDataURL(file);
                                        props.change('hrprofile_file', event.target.files[0])
                                    }}
                                />
                                <label htmlFor="hrfile">
                                    <Button color="primary"
                                            variant="outlined"
                                            component="span"
                                            type="submit"
                                    >
                                        ????????????
                                    </Button>
                                </label>
                                <hr/>
                                <p >???????????? ??????</p>
                                {hr && hr.hrprofile_file ? (
                                    <FileList file={hr.hrprofile_file}/>
                                ) : <Nothing text={'???????????? ????????? ????????????.'}/>}
                            </TabPanel>
                        </CardBody>
                    </Card>
                    <hr/>
                    <div className={"text-center"}>
                        <button className="btn btn-lg btn-outline-info "
                                onClick={()=>history.push(`/Hr/Profile`)}
                                disabled={submitting}
                        >????????????
                        </button>
                        <button action="submit" className="btn btn-lg btn-info" disabled={submitting}>
                            {submitting === true && (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />)
                            } ??????
                        </button>
                    </div>
                </form>

            </Container>
        </div>
    )
};

const ImageList = ({file}) => {
    return file ? (
        <>
            {
                file.map( v =>{
                    return (
                        <img src={v.hr_image} alt="..." style={{width:410, height:250}}/>
                    )
                })
            }
        </>
    ) : (
        <ul>?????? ????????? ????????????.</ul>
    )
}

const FileList = ({file}) => {
    return file ? (
        <ul>
            {file.map( v =>{
                return (
                    <li>
                        <a className="nav-link"
                           href={v.hr_file}
                        >{v.hr_filename}
                        </a>
                    </li>
                )
            })
            }
        </ul>
    ) : (
        <ul>??????????????? ????????????.</ul>
    )
};

// ????????????
const renderServices1 = ({ fields, taxRange, setTaxRange, handleChange, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                {submitFailed && error && <span>{error}</span>}
            </div>
            {fields && fields.map((item, index) => (
                <div className="input-group" key={index}>
                    <Col md="3">
                        <fieldset className="form-group">
                            <Field name={`${item}.fee_start`} component={renderField}
                                   type="number"
                                   value={taxRange[0]}
                                   onChange={(e)=>{
                                       setTaxRange([e.target.value, taxRange[1]])
                                   }}
                                   validate={[required({message: "?????? ?????????????????????."})]}
                                   inputAddon={true}
                                   inputAddonText={'%'}
                            />
                        </fieldset>
                    </Col>
                    <Col md="6">
                        <Slider
                            value={taxRange}
                            max={20}
                            min={0}
                            step={0.1}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Col>
                    <Col md="3">
                        <fieldset className="form-group">
                            <Field name={`${item}.fee_end`} component={renderField}
                                   type="number"
                                   value={taxRange[1]}
                                   onChange={(e)=>{
                                       setTaxRange([taxRange[0], e.target.value])
                                   }}
                                   validate={[required({message: "?????? ?????????????????????."})]}
                                   inputAddon={true}
                                   inputAddonText={'%'}
                            />
                        </fieldset>
                    </Col>
                </div>
            ))}
        </>
    )
}


// ????????????
const renderServices = ({ fields, meta: { error, submitFailed } }) => {
    if(fields.length === 0) fields.push({});
    return (
        <>
            <div>
                <FormText style={{fontSize: '1.0em'}}>
                    ??????) 3,000?????? ~ 4,000?????? : 10%<br/>
                </FormText>
                {submitFailed && error && <span>{error}</span>}
            </div>
            <br/>
            <>
                {fields.map((item, index) => (
                    <div key={index}>

                        {/*<h6>?????? #{index + 1} {item}</h6>*/}
                        <div className="input-group">
                            <Col md="4">
                                <fieldset className="form-group">
                                    <Field name={`${item}.start`} component={renderNumberField}
                                           required={true}
                                           validate={[
                                               required({message: "?????? ?????????????????????."}),
                                           ]}
                                           inputAddonText={'??????'}
                                    />
                                </fieldset>
                            </Col>

                            <Col md="4">
                                <fieldset className="form-group">
                                    <Field name={`${item}.end`} component={renderNumberField}
                                           inputAddonText={'??????'}
                                           validate={[required({message: "?????? ?????????????????????."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md="3">
                                <fieldset className="form-group">
                                    <Field name={`${item}.fee_start`} component={renderField}
                                           type={'number'}
                                           inputAddon={true}
                                           inputAddonText={'%'}
                                           validate={[required({message: "?????? ?????????????????????."})]}
                                    />
                                </fieldset>
                            </Col>
                            <Col md={"1"}>
                                {index >= 1 && (
                                    <IconButton aria-label="delete" >
                                        <DeleteIcon fontSize="small" onClick={()=>fields.remove(index)}/>
                                    </IconButton>
                                    /*<button
                                    className="btn"
                                    type="button"
                                    title="Remove"
                                    onClick={() => fields.remove(index)}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>*/
                                )}
                            </Col>

                        </div>
                    </div>

                ))}
            </>
            <button type="button" className="btn" onClick={() => fields.push()}>
                <i className="nc-icon nc-simple-add"/>
                ????????????
            </button>
        </>
    )
};



const validate = values => {
    const errors = {};
    // console.log('validate values', values)
    if (!values.custname) {
        errors.custname = '???????????? ???????????????.'
    }
    if (!values.custid) {
        errors.custid = '???????????? ???????????????.'
    }
    if (!values.gross_total) {
        errors.gross_total = '???????????? ???????????????.'
    }

    if (!values.emp_count) {
        errors.emp_count = '???????????? ???????????????.'
    } else if (isNaN(Number(values.emp_count))) {
        errors.emp_count = '????????? ??????????????????.'
    }

    if(!values.services){
        errors.services = '???????????? ???????????????.'
    }
    // if (!values.manager_email) {
    //     errors.manager_email = '???????????? ???????????????.'
    // }
    // if (!values.manager_phone) {
    //     errors.manager_phone = '???????????? ???????????????.'
    // }
    // errors.
    // if(!values.homepage){
    //
    // }else if(values.homepage && !validator.isURL(values.homepage)){
    //     errors.homepage = '????????? URL????????? ??????????????????'
    // }

    return errors;
};


function mapStateToProps(state, props) {
    const selector = formValueSelector('hrupdate');
    const service_address = selector(state, 'service_address');
    const services = selector(state, 'services');
    const company_logo = selector(state, 'company_logo');
    const hrfee = selector(state, 'hrfee');
    let hrfee_AC0100000 = {};
    let hrfee_AC0200000 = {};
    let hrfee_AC0300000 = {};
    let hrfee_AC0400000 = {};
    if(hrfee){
        hrfee_AC0100000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0100000')
                return { 'fee_start': item.fee_start, 'fee_end': item.fee_end }
        }).filter(o=>o);
        hrfee_AC0200000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0200000') return { 'fee_start': item.fee_start, 'fee_end': item.fee_end }
        }).filter(o=>o)
        hrfee_AC0300000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0300000') return { 'start': item.start, 'end': item.end, 'fee_start': item.fee_start }
        }).filter(o=>o)
        hrfee_AC0400000 = hrfee.map(item => {
            if(item.fee_gubun.code_id === 'AC0400000') return { 'start': item.start, 'end': item.end, 'fee_start': item.fee_start }
        }).filter(o=>o)
    }

    if(state.auth.hr) {
        delete state.auth.hr.cmp_manager;
        return {
            initialValues: {
                ...state.auth.hr,
                hrfee_AC0100000: hrfee_AC0100000,
                hrfee_AC0200000: hrfee_AC0200000,
                hrfee_AC0300000: hrfee_AC0300000,
                hrfee_AC0400000: hrfee_AC0400000,
                custname: {
                    label: state.auth.hr.custname,
                    value: state.auth.hr.custname,
                },
            },
            hr: state.auth.hr,
            service_address: service_address,
            services: services,
            company_logo: company_logo,
            hrfee: hrfee
        }
    }

}

const afterSubmit = (result, dispatch) => {
    dispatch(initialize('hrupdate', {}));
    history.push("/Hr/Profile");
}

export default connect(mapStateToProps)(reduxForm({
    form: "hrupdate",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmit: updateHrProfile,
    onSubmitSuccess: afterSubmit,
})(HrProfileEdit));

