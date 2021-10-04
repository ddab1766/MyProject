import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import illu1 from "@/assets/main-image/illu1.png";
import illu2 from "@/assets/main-image/illu2.png";
import illu3 from "@/assets/main-image/illu3.png";
import illu4 from "@/assets/main-image/illu4.png";
import illu5 from "@/assets/main-image/illu5.png";
import illu6 from "@/assets/main-image/illu6.png";

const S = {
    Wrapper: styled.section`
    width: 100%;
    // max-width: 1920px;
    margin: auto;
    padding: 120px 0;
    // margin-top: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
  `,
    Label: styled.p`
    display: inline-block;
    ${props => props.theme.typography.label};
    color: ${props => props.theme.palette.primary};
    margin-bottom: 1rem;
  `,
    Title: styled.h2`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    text-align: center;
    margin-bottom: 4rem;
  `,
    ItemWrapper: styled.ul`
    padding:0px;
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
    ItemBox: styled.li`
    // width: 251px;
    padding: 1rem 2rem;
    text-align: center;
    justify-content: flex-start;
    // background-color: ${props => props.theme.palette.white};
    display: flex;
    flex-direction: column;
    // box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    // border-radius: 0.5rem;
    margin-bottom:1rem;
  `,
    ItemTitle: styled.h3`
    ${props => props.theme.typography.heading};
    color: ${props => props.theme.palette.black};
    margin-bottom: 1rem;
  `,
    ItemDescription: styled.p`
    ${props => props.theme.typography.description};
    margin-bottom: 1.5rem;
    font-family: SpoqaHanSansNeo;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.36px;
  `,
    ItemImage: styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
    align-self: center;
    border-radius: 0.5rem 0.5rem 0 0;
    // background: no-repeat center/cover url(${props => props.image});
  `,
    ItemButton: styled.button`
    ${props => props.theme.typography.textbutton};
    color: ${props => props.theme.palette.secondary};
    margin-top: auto;
    cursor: pointer;
  `,
    Icon: styled.div`
    background-color: #ffffff;
  `
};

const Info = (props) => {
    const [loginModal, setLoginModal] = React.useState(false);

    return (
        <S.Wrapper>
            <S.Label>특장점</S.Label>
            <S.Title>
                채용마켓은 빠르고 편리하고 안전합니다.
            </S.Title>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={illu1}/>
                    <S.ItemDescription>
                        빠르고 편리하게, <br/> 무료로 채용의뢰서 등록
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu2}/>
                    <S.ItemDescription>
                        적합한 인재를<br/>한눈에 비교하고 채용까지
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu3}/>
                    <S.ItemDescription>
                        안전한 대금보호, <br/>간편한 개별계약 시스템
                    </S.ItemDescription>
                </S.ItemBox>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={illu4}/>
                    <S.ItemDescription>
                        보호 받을 수 있는 <br/> 안심계약
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu5}/>
                    <S.ItemDescription>
                       표준<br/>채용의뢰서
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu6}/>
                    <S.ItemDescription>
                        시작부터 끝까지<br/>함께하는 담당 매니저
                    </S.ItemDescription>
                </S.ItemBox>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        company: state.auth.company,
    }
}

export default connect(mapStateToProps)(Info);
