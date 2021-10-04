import React from "react";
import axios from "axios";
import {AuthUrls} from "../../constants/urls";
import store from "../../store";
import {connect} from "react-redux";
import {getCompanyProfile, getUserProfile} from "../../actions/authActions";
import {Alert, Button} from "rsuite";
import {getUserToken} from "../../utils/authUtils";


const IMP = window.IMP; // 생략해도 괜찮습니다.
IMP.init("iamport"); // "imp00000000" 대신 발급받은 "가맹점 식별코드"를 사용합니다.

const RequestPay = (props) => {
    const { user, company, payinfo } = props;

    const requestPay = (payinfo) => {
        console.log('payinfo: ',payinfo);
        // IMP.request_pay(param, callback) 호출
        IMP.request_pay({ // param
            pg : 'inicis', // version 1.1.0부터 지원.
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : '서비스 이용료 ', //+ payinfo.ticket + '장',
            amount : payinfo.amount,
            buyer_email : 'iamport@siot.do',
            buyer_name : '구매자이름',
            buyer_tel : '010-1234-5678',
            buyer_addr : '서울특별시',
            buyer_postcode : '12345',
            // m_redirect_url : 'https://chaegong.co.kr/Mng/Invoice'
            m_redirect_url : 'http://chaema.co.kr/Mng/Invoice'
        }, rsp => { // callback
            if (rsp.success) {
                // 결제 성공 시 로직,
                let msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;

                // import 결제 히스토리 저장
                axios.post(AuthUrls.IMPORTPAYMENT, {
                    user: user.id,
                    paid_amount: payinfo.amount,
                    apply_num: rsp.apply_num,
                    imp_uid: rsp.imp_uid,
                    merchant_uid: rsp.merchant_uid
                }).then((data)=>{
                    Alert.success('결제가 완료되었습니다.');
                    const token = getUserToken(store.getState());
                    // 청구내역 저장
                    axios.post(AuthUrls.DEMAND, {
                        'demand_ym': payinfo.demand_ym,
                        'paidup_yn': true,
                    },{
                        headers: {
                            authorization: 'Token ' + token
                        },
                    }).then(resp=> {
                        console.log('resp', resp)
                    }).catch(err => alert(err));
                    // props.getUserProfile();
                });



            } else {
                // 결제 실패 시 로직,
                let msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
                alert(msg)
            }
        });
    };

    return (
        <>
            <Button appearance="ghost" className="ml-2" onClick={()=>requestPay(payinfo)}>결제하기</Button>
            {/*<button className="btn btn-sm btn-outline-danger" onClick={()=>requestPay(payinfo)}>결제하기</button>*/}
        </>
    );
};


function mapStateToProps(state) {
    return {
        user: state.auth.user,
        company: state.auth.company
    }
}

export default connect(mapStateToProps, {getUserProfile, getCompanyProfile})(RequestPay);

