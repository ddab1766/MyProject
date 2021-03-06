import React, {useState} from 'react';
import styled from 'styled-components';
import {Button} from '../../../components';
import {useScrollFadeIn} from '../../../hooks';
import {backGroundImg} from '../../../assets';
import {connect} from "react-redux";
import CompanyMainSearch from "../../../../CompanyMainSearch";
import {Drawer} from "rsuite";

const S = {
    Wrapper: styled.section`
    width: 100%;
    padding: 40px 0;
    background-color: ${props => props.theme.palette.background};
    background: no-repeat center/cover url(${backGroundImg});
    // background: ${backGroundImg};
    display: flex;
    flex-direction: column;
    height: 320px;
    align-items: center;
    color:white;
    @media screen and (max-width: 760px){
    height: 46vh;
    }
  `,
    Label: styled.p`
    display: inline-block;
    ${props => props.theme.typography.label};
    color: ${props => props.theme.palette.primary};
    margin-bottom: 1rem;
    // color:white;
  `,
    Descrip: styled.p`
    flex-grow: 0;
    opacity: 0.8;
    font-family: SpoqaHanSansNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: left;
    color: #ffffff;
  `,
    Title: styled.h2`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    margin-bottom: 10px;
    text-align: center;
    color:white;
  `,
    SubTitle: styled.p`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    font-family: SpoqaHanSansNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: center;
    color: #7A7D82;
  `,
};

const Banner_Mobile = (props) => {
    const [loginModal, setLoginModal] = React.useState(false);
    const toggleModalLogin = () => setLoginModal(!loginModal)
    const animatedItem = {
        0: useScrollFadeIn('up', 1),
        1: useScrollFadeIn('up', 1, 0.2),
        2: useScrollFadeIn('up', 1, 0.3),
    };

    const [show, setShow] = useState(false);
    const [placement, setPlacement] = useState('top');
    const close = () => setShow(false)
    const toggleDrawer = (placement) => {
        setPlacement(placement)
        setShow(true)
    }

    return (
        <S.Wrapper>
            <S.Label {...animatedItem[0]}>????????????</S.Label>
            <S.Title {...animatedItem[1]}>
                B2B ?????? ?????? ?????????
                <br />
            </S.Title>
            <S.SubTitle>
                ???????????? ???????????? ???????????? ????????? ???????????? ?????????.
            </S.SubTitle>
            <div {...animatedItem[2]}>
                <br/>
                {/*{renderButton()}*/}
                <Button fill="solid"
                        style={{marginTop: '20px', marginBottom: '2rem'}}
                        onClick={()=>toggleDrawer('top')}
                >???????????? ?????? ????????????{'???'}<i className="fa fa-chevron-right" style={{fontSize: '11px'}}/> </Button>
                {/*<Modal isOpen={loginModal} style={{width: '395px'}} toggle={toggleModalLogin}>
                    <PopupLogin loginSubmit={toggleModalLogin} toogle={toggleModalLogin}/>
                </Modal>*/}
                <Drawer placement={placement} show={show} onHide={close}>
                    <CompanyMainSearch/>
                </Drawer>
            </div>
        </S.Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
    }
}

export default connect(mapStateToProps)(Banner_Mobile);

// export default Banner;
