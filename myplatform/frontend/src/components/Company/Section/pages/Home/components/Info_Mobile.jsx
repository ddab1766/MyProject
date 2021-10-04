import React from 'react';
import styled from 'styled-components';
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
    margin-bottom: 1rem;
  `,
    ItemWrapper: styled.ul`
    padding:0px;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  `,
    ItemBox: styled.li`
    margin: 24px 15.6px 24.2px 16px;
    text-align: center;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
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
    font-size: 11px;
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

const Info_Mobile = () => {
    return (
        <S.Wrapper>
            <S.Label>특장점</S.Label>
            <S.Title>
                채용마켓은 빠르고<br/> 편리하고 안전합니다.
            </S.Title>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={illu1} width={70} height={70}/>
                    <S.ItemDescription>
                        빠르고 편리하게, <br/> 무료로 채용의뢰서 등록
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu2} width={70} height={70}/>
                    <S.ItemDescription>
                        적합한 인재를<br/>한눈에 비교하고 채용까지
                    </S.ItemDescription>
                </S.ItemBox>

            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={illu3} width={70} height={70}/>
                    <S.ItemDescription>
                        안전한 대금보호, <br/>간편한 개별계약 시스템
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu4} width={70} height={70}/>
                    <S.ItemDescription>
                        빠르고 편리하게, <br/> 무료로 채용의뢰서 등록
                    </S.ItemDescription>
                </S.ItemBox>
            </S.ItemWrapper>
            <S.ItemWrapper>
                <S.ItemBox>
                    <img src={illu5} width={70} height={70}/>
                    <S.ItemDescription>
                        적합한 인재를<br/>한눈에 비교하고 채용까지
                    </S.ItemDescription>
                </S.ItemBox>
                <S.ItemBox>
                    <img src={illu6} width={70} height={70}/>
                    <S.ItemDescription>
                        안전한 대금보호, <br/>간편한 개별계약 시스템
                    </S.ItemDescription>
                </S.ItemBox>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};

export default Info_Mobile;
