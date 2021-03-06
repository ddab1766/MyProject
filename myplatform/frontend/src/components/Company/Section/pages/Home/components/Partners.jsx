import React from 'react';
import styled from 'styled-components';
import Component1 from "@/assets/main-image/Component1.png";
import Component2 from "@/assets/main-image/Component2.png";
import Component3 from "@/assets/main-image/Component3.png";
import Component4 from "@/assets/main-image/Component4.png";

const S = {
    Wrapper: styled.section`
    width: 100%;
    max-width: 1920px;
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
    margin-bottom: 1.5rem;
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

const Partners = () => {

    return (
        <S.Wrapper>
            <S.Label>????????????</S.Label>
            <S.Title>
                ?????? ?????? B2B ?????? ?????????
            </S.Title>
            <S.SubTitle>
                ?????? ????????? ????????? B2B ?????? ????????? ??????????????? ????????? ????????????.
            </S.SubTitle>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={Component1}/>
                    <S.ItemDescription>
                        ???????????????
                    </S.ItemDescription>
                    <S.ItemNumber>3,370???</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component2}/>
                    <S.ItemDescription>
                        ????????????
                    </S.ItemDescription>
                    <S.ItemNumber>16,152???</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component3}/>
                    <S.ItemDescription>
                        ???????????????
                    </S.ItemDescription>
                    <S.ItemNumber>31,228???</S.ItemNumber>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={Component4}/>
                    <S.ItemDescription>
                        ???????????????
                    </S.ItemDescription>
                    <S.ItemNumber>96.3%</S.ItemNumber>
                </S.ItemBox>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};


export default Partners;
