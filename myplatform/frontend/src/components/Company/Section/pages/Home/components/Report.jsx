import React from 'react';
import styled from 'styled-components';
import Component1 from "@/assets/main-image/Component1.png";
import Component2 from "@/assets/main-image/Component2.png";
import Component3 from "@/assets/main-image/Component3.png";
import Component4 from "@/assets/main-image/Component4.png";

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
    margin-bottom: 1rem;
  `,
    SubTitle: styled.p`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    opacity: 0.8;
    // font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: left;
    color: #00151c;
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
    padding: 1rem 0rem;
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
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.36px;
  `,
    ItemNumber: styled.p`
    flex-grow: 0;
    opacity: 0.89;
    font-family: SpoqaHanSansNeo;
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.72px;
    text-align: center;
    color: #00151c;
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

const Report = () => {

    return (
        <S.Wrapper>
            <S.Label>현황</S.Label>
            <S.Title>
                국내 최초 B2B 채용 플랫폼
            </S.Title>
            <S.SubTitle>
                많은 분들이 간편한 B2B 채용 플랫폼 채용마켓을 만나고 있습니다.
            </S.SubTitle>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={Component1}/>
                    <br/>
                    <S.ItemDescription>
                        채용의뢰서
                    </S.ItemDescription>
                    <S.ItemNumber>3,370건</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component2}/>
                    <br/>
                    <S.ItemDescription>
                        파트너사
                    </S.ItemDescription>
                    <S.ItemNumber>16,152건</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component3}/>
                    <br/>
                    <S.ItemDescription>
                        앱다운로드
                    </S.ItemDescription>
                    <S.ItemNumber>31,228건</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component4}/>
                    <br/>
                    <S.ItemDescription>
                        매칭성사율
                    </S.ItemDescription>
                    <S.ItemNumber>96.3%</S.ItemNumber>
                </S.ItemBox>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};


export default Report;
