import React from "react";
import styled from 'styled-components';
import {
    Input,
    Radio,
    RadioGroup,
    Checkbox,
    ControlLabel,
    FormControl,
    FormGroup,
    InputNumber,
    SelectPicker
} from "rsuite";
import InputMask from "react-input-mask";

const AlertText = styled.p`
    color: #7466ff;
    padding: .25rem !important;
`;

export class CheckField extends React.PureComponent {
    render() {
        const { filter, name, message, label, accepter, data, topidx, topcd, error, ...props } = this.props;
        const list = data.map((v,index) => {
            if (v.code_topidx === topidx && v.code_topcd === topcd) {
                return (
                    <Checkbox key={index} value={v.code_id}>{v.code_name}</Checkbox>
                )
            } else{
                return null;
            }
        }).filter(o => o);

        return (
            <FormGroup className={error ? 'has-error' : ''}>
                <ControlLabel>{label} </ControlLabel>
                <FormControl
                    name={name}
                    accepter={accepter}
                    errorMessage={error}
                    inline
                    onChange={v=>filter(name,v)}
                >{list}</FormControl>

                {/*<HelpBlock>{message}</HelpBlock>*/}
            </FormGroup>
        );
    }
}

export const renderInputField = ({input, label, type, placeholder, disabled, required, inputAddon, inputAddonText, size,
                                     meta: { touched, error}}) => {
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <Input {...input} type={type} placeholder={placeholder} disabled={disabled} size={size}/>
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};

export const renderTextAreaField = ({input, label, type, placeholder, disabled, required, rows, size,
                                        meta: { touched, error}}) => {
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <Input {...input} type={type} placeholder={placeholder} disabled={disabled} rows={rows}
                   componentClass="textarea"
            />
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};

export const renderSelectField = ({input, label, placeholder,  required, options, size,
                                      meta: {touched, error}}) => {
    const data = options.map( option => {
        return { 'label': option.code_name, 'value': option.code_id }
    });
    console.log('input.value', input.value)
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <SelectPicker
                name={input.name}
                data={data}
                onChange={(value)=> {input.onChange(value)}}
                cleanable={true}
                searchable={false}
                defaultValue={input.value}
                placeholder={placeholder}
                style={{ width: '100%' }}
                size={size}
            />
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};

export const renderInputNumberField = ({input, label, type, placeholder, postfix, required, size, meta: {touched, error}}) => {
    if(input.value < 0) input.value = 0;
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <InputNumber {...input}
                         scrollable={false}
                         placeholder={placeholder} postfix={postfix} size={size}/>
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};

export const renderCheckField = ({input, label, type, placeholder, postfix, required, size, meta: {touched, error}}) => {
    return (
        <>
            <Checkbox> {label}</Checkbox>
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};


export const renderRadioField = ({input, label, options, defaultChecked, type, code_topidx, code_topcd, selectValue, required, meta: {touched, error}}) => {
    // const option = options.filter(v => v.code_topidx === code_topidx && !v.code_topcd );
    const list = options.map((v, index) => {
        return (
            <Radio value={v.code_id}> {v.code_name} </Radio>
        )
    });
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <RadioGroup
                name={input.name}
                value={selectValue}
                onChange={(value) => input.onChange(value)}
            >
                {list}
                {touched && ((error && <AlertText>{error}</AlertText>))}
            </RadioGroup>
        </>
    )
};

export const renderPhoneNumberField = ({input, label, required, placeholder, size, meta: {touched, error}}) => {
    return (
        <>
            {label && (
                <label>
                    {label}
                    {required && (<small style={{color:"red"}}> 필수</small>)}
                </label>
            )}
            <InputMask
                {...input}
                size={size}
                mask="999-9999-9999"
            >
                {inputProps => <Input placeholder={placeholder} {...inputProps}/>}
            </InputMask>
            {touched && ((error && <AlertText>{error}</AlertText>))}
        </>
    )
};
