import React from 'react';
import styled from 'styled-components';
import star from "@/assets/main-image/Star 1.png";
import pushnews from "@/assets/main-image/pushnews.png";
import ktmns from "@/assets/main-image/kt m&s.jpg";

const S = {
    Wrapper: styled.section`
    width: 100%;
    max-width: 1920px;
    max-height: 673.7px;
    margin: auto;
    padding: 80px 0;
    // margin-top: 680px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #191f28;
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
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.72px;
    text-align: center;
    color: #ffffff;
  `,
    SubTitle: styled.p`
    ${props => props.theme.typography.subtitle};
    color: ${props => props.theme.palette.black};
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: left;
    color: #7A7D82;
  `,
    Logo: styled.div`
    width: 32px;
    height: 32px;
    flex-grow: 0;
    margin-right: 10px;
    border: solid 1px #d8d8d8;
    border-radius: 50%;
    `,
    ItemWrapper: styled.div`
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    margin: 40px 0px 31.7px 0;
    padding: 0;
  `,
    ItemCard: styled.div`
    width: 230.3px;
    height: 350px;
    flex-grow: 0;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 32px 16px;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
   `,
    ItemCardBody: styled.div`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
   `,
    ItemCardBodyText: styled.div`
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: left;
    color: #00151c;
   `,
    ItemCardFooter: styled.div`
    margin-top: 15px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
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
    flex-grow: 0;
    opacity: 0.8;
    font-family: SpoqaHanSansNeo;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.32px;
    text-align: left;
    color: #00151c;
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

const Reviews = () => {

    return (
        <S.Wrapper>
            <S.Label>생생한 리뷰</S.Label>
            <S.Title>
                채용마켓을 신뢰할 수 있는 이유
            </S.Title>
            <S.SubTitle>
                더 쉬워진 채용의 혜택을 파트너와 나눕니다.
            </S.SubTitle>
            <S.ItemWrapper>
                <S.ItemCard>
                    <S.ItemCardBody>
                        <div style={{paddingBottom: '15px'}}>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                        </div>
                        <S.ItemCardBodyText>
                            HR회사들을 한곳에 모아 여러 회사들에게서
                            다양하게 인력을 추천받고 한방에 해결할 수
                            있게 되었어요!<br/>
                            이곳저곳 찾아다닐 필요없이 채용마켓
                            플랫폼을 통해 한번에 견적을 비교해줘서
                            신속하게 HR회사를 선정할 수 있었어요!
                        </S.ItemCardBodyText>
                    </S.ItemCardBody>
                    <S.ItemCardFooter>
                        <S.Logo>
                            <img src={ktmns}/>
                        </S.Logo>
                        <S.ItemDescription>
                             KT M&S <small> · 채용담당자</small>
                        </S.ItemDescription>
                    </S.ItemCardFooter>
                </S.ItemCard>
                <S.ItemCard>
                    <S.ItemCardBody>
                        <div style={{paddingBottom: '15px'}}>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                        </div>
                        <S.ItemCardBodyText>
                        HR회사와 채용 담당자가 무엇을 원하는지
                        알고 있는 플랫폼이다!<br/>
                        이력서와 견적 등을 메일로 주고받을
                        필요 없이 채용마켓 플랫폼을 통해 한눈에
                        확인할 수 있어서 좋습니다. <br/><br/><br/>
                        </S.ItemCardBodyText>
                    </S.ItemCardBody>
                        <S.ItemCardFooter>
                            <S.Logo>
                                <img src={pushnews}/>
                            </S.Logo>
                            <S.ItemDescription>
                                푸쉬뉴스 <small>· 인사담당자</small>
                            </S.ItemDescription>
                        </S.ItemCardFooter>
                </S.ItemCard>
                <S.ItemCard>
                    <S.ItemCardBody>
                        <div style={{paddingBottom: '15px'}}>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                        </div>
                        <S.ItemCardBodyText>
                        10년 동안 헤드헌터로 일을 하면서 채용마켓
                        같은 플랫폼이 있으면 좋겠다고 생각했었는데
                        원하던 플랫폼이 생겨 좋습니다!<br/>
                        사용사업주 인사담당자들과 얼굴 붉히는 일이 줄어들었어요!<br/><br/>
                        </S.ItemCardBodyText>
                    </S.ItemCardBody>
                    <S.ItemCardFooter>
                        <S.Logo>
                            <img src={ktmns}/>
                        </S.Logo>
                        <S.ItemDescription>
                             KT M&S <small> · 채용담당자</small>
                        </S.ItemDescription>
                    </S.ItemCardFooter>
                </S.ItemCard>

                <S.ItemCard>
                    <S.ItemCardBody>
                        <div style={{paddingBottom: '15px'}}>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                            <img src={star}/>
                        </div>
                        <S.ItemCardBodyText>
                        세부적인 권한 관리까지 세심하게 반영하여
                        동료들끼리 동일한 채용건의 중복 진행을
                        미연에 방지 할 수 있어서 좋았어요.
                        구직자 이력서 취합에 집중할 수 있고,
                        채용진행 과정을 실시간 알림으로 확인할 수
                        있는 사용자 친화적 플랫폼입니다!
                        </S.ItemCardBodyText>
                    </S.ItemCardBody>
                    <S.ItemCardFooter>
                        <S.Logo>
                            <img src={pushnews}/>
                        </S.Logo>
                        <S.ItemDescription>
                            푸쉬뉴스 <small>· 인사담당자</small>
                        </S.ItemDescription>
                    </S.ItemCardFooter>
                </S.ItemCard>
            </S.ItemWrapper>
        </S.Wrapper>
    );
};


export default Reviews;
