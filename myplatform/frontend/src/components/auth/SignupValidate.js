const SignupValidate = values => {

    const errors = {};
    const { password1, password2 } = values;
    const required = '필수 입력사항입니다.';
    if(password1){
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(password1)){
            errors.password1 = "영문, 숫자, 특수문자 조합 6자 이상"
        }
    }
    if (password1 !== password2) {
        errors.password2 = "비밀번호가 같지 않습니다."
    }
    return errors;
};

export default SignupValidate;
