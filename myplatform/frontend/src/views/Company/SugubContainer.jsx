import React, {useState} from "react";
import {useSelector} from "react-redux";
import SugubList from "./SugubList"
import SectionSugub from "./SectionSugub"
import {Container} from "reactstrap";
import SugubDrawer from "../../components/Company/Sugub/SugubDrawer";
import SugubHistoryModal from "../../components/Company/Sugub/SugubHistoryModal";
import styled from "styled-components";
import {isMobile} from "react-device-detect"
import {Modal} from "rsuite";

const SugubContainer = (props) => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const { company, loading } = useSelector(state => ({
            company: state.auth.company,
            loading: state.common.loading
        })
    );
    // const dispatch = useDispatch();
    // const onGetSugub = useCallback(id => dispatch(getSugub({page:1})), [dispatch]);

    return (
        <div className="content">
            {company ? (
                    <Container className={isMobile && "pl-0 pr-0"}>
                        <div className={`${!isMobile && 'title'} pl-3 pr-3 `}>
                            <h3 className="text-md-left mb-0">
                                인재채용
                            </h3>
                            <div className="text-right">
                                <button className={`btn btn-info btn-md`}
                                        color="danger"
                                        onClick={toggleModal}
                                >
                                    채용의뢰 시작하기
                                </button>
                            </div>

                        </div>
                        <SugubList />
                    </Container>
                )
                : (
                    /*<SugubList />*/
                    <SectionSugub/>
                )
            }

            <Modal
                show={modal}
                onHide={toggleModal}
                size="xs"
            >
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggleModal}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h5
                        className="modal-title text-center"
                        id="shareModal"
                    >
                        채용의뢰서 작성
                    </h5>
                </div>
                <div className="modal-body">
                    <S.Wrapper>
                        <S.ItemWrapper>
                            <S.ItemBox>
                                <S.ItemTitle>
                                    <SugubDrawer btnSize={'btn-sm'} label={'신규'} newComponent/>
                                </S.ItemTitle>
                            </S.ItemBox>
                            <S.ItemBox>
                                <S.ItemTitle>
                                    <SugubHistoryModal buttonLabel={'기존'}/>
                                </S.ItemTitle>
                            </S.ItemBox>
                        </S.ItemWrapper>
                    </S.Wrapper>
                </div>
            </Modal>
        </div>
    )
};


const S = {
    Header: styled.h1`
     width: 100%;
    max-width: 1180px;
    margin: auto;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    text-align:center;
    `,
    HeaderDes:styled.div`
    text-align:center;
    padding-top:1rem;
    padding-bottom:2rem;
    font-size:1rem;
    line-height:2rem;
    `,
    Wrapper: styled.section`
    width: 100%;
    max-width: 974px;
    margin: auto;
    // padding: 120px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 500px){
    padding:50px 0;
    }
  `,
    Title: styled.h2`
  font-weight:bold;
  padding-top:5rem;
    text-align: center;
    margin-bottom: 4rem;
  `,
    ItemWrapper: styled.ul`
    padding:0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // flex-wrap: wrap;
    @media screen and (max-width:760px){
        justify-content:center;
    }
  `,
    ItemBox: styled.li`
    text-align: center;
    display: flex;
    flex-direction: column;
    // box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.03);
    // border-radius: 0.5rem;
    border:3px solid rgba(255,255,255,0.25);
    transition: 0.4s all ease;
    margin-bottom: 1rem;
    
    &:hover{
     background-color: #ffffff;
    color: #252525;
    transition: 0.4s all ease;
    cursor:pointer;
    transform: scale(1.1);
    }
  `,

    ItemTitle: styled.h3`
    margin-bottom: 1rem;
    font-weight:bold;
    font-size:1.5rem;
    // color: #6bd098;
  `,
    ItemDescription: styled.p`
    margin-bottom: 1.5rem;
  `,
    ItemButton: styled.button`
    margin-top: auto;
    cursor: pointer;
  `,
};

function mapStateToProps(state) {
    return {
        company: state.auth.company,
        user : state.auth.user,
        authenticated:state.auth.authenticated,
    }
}

// export default connect(mapStateToProps)(SugubContainer);
export default SugubContainer;

