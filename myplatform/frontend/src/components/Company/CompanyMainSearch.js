import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { JIKJONGTOP_SIMPLE } from "../../variables/common";
import { AuthUrls } from "../../constants/urls";
import axios from "axios";
import { COMPANY_JIKJONG } from "../../variables/frequency_jikjong";
import store from "@/store";
import { initialize } from "redux-form";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "rsuite";
import { isMobile } from "react-device-detect";
import icon1 from "@/assets/main-image/icon1.svg";
import icon2 from "@/assets/main-image/icon2.svg";
import icon3 from "@/assets/main-image/icon3.svg";
import icon4 from "@/assets/main-image/icon4.svg";
import icon5 from "@/assets/main-image/icon5.png";
import undraw_Agreement_re_d4dv from "@/assets/main-image/undraw_Agreement_re_d4dv.svg";

function CompanyMainSearch(props) {
  // const [jikjongTop, setJikjongTop] = useState(JIKJONGTOP_SIMPLE);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);

  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = React.useRef(null);

  let initialValues = COMPANY_JIKJONG;
  const [options, setOptions] = React.useState(initialValues);

  // const { sugub_wizard } = useSelector(state => ({
  //         sugub_wizard: state.form.sugub_wizard,
  //     }),
  //     shallowEqual
  // );

  useEffect(() => {
    store.dispatch(initialize("sugub_wizard"));
  }, []);

  const filterJikjong = (inputValue) => {
    setLoading(true);
    return axios
      .get(AuthUrls.JIKJONG_INFO, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          search: inputValue,
          index: "jikjong",
        },
      })
      .then(({ data }) => {
        const results = data.data;
        setSearchResult(results);

        let options = results.map((values) => {
          return {
            jikjong_mid_cd: values.jikjong_mid_cd,
            jikjong_mid_name: values.jikjong_mid_name,
          };
        });
        const uniqueArray = options.filter((thing, index) => {
          const _thing = JSON.stringify(thing);
          return (
            index ===
            options.findIndex((obj) => {
              return JSON.stringify(obj) === _thing;
            })
          );
        });

        return uniqueArray;
      })
      .then((value) => {
        setOptions(value);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!searchTerm || searchTerm === "") setOptions(initialValues);
    let word_check = true;
    // for (let i=0; i<searchTerm.length; i++) {
    //     if (searchTerm.charCodeAt(i) < 44032 || searchTerm.charCodeAt(i) > 55203) {
    //         word_check = false;
    //     }
    // }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    if (searchTerm && searchTerm !== "" && searchTerm.length >= 1 && word_check) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        filterJikjong(searchTerm);
      }, 500);
    }
  }, [searchTerm]);

  return (
    <div className="section">
      <Container>
        <div className="main-search" style={{ padding: "10px" }}>
          <Row>
            <Col md="6">
              <h3>
                <div className="">
                  ??????????????????, <br /> ???????????? ?????????????????? ??????????????????.{" "}
                </div>
              </h3>
              <div>
                <div className="input-group">
                  <TextInput
                    placeholder={"?????? ????????? ????????? ???????????????????"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="input-group-append">
                    {/*<span className={'input-group-text'}> <i className="fa fa-search"/> </span>*/}
                  </div>
                </div>

                <div className="search-results" style={{ width: "100%" }}>
                  {/*{open && (*/}
                  <ListGroup>
                    {loading ? (
                      <Loader size="lg" content="?????????...." vertical center />
                    ) : (
                      <>
                        {searchTerm.length > 0 ? (
                          <ListGroupItem className="search-title">"{searchTerm}" ?????? ??????</ListGroupItem>
                        ) : (
                          <>
                            <ListGroupItem>
                              <>?????? ???????????? ???????????????</>
                            </ListGroupItem>
                          </>
                        )}
                      </>
                    )}

                    {options.map((item) => {
                      return (
                        <>
                          <Link
                            to={{
                              pathname: `/Company/ReqSugub/${item.jikjong_mid_cd.substr(0, 4)}`,
                              state: {
                                searchResults: searchResult,
                                selected: {
                                  sec: "mid", // ??????(???) ??????
                                  groupName: item.jikjong_mid_name,
                                  code_name: item.jikjong_mid_name,
                                  code_topcd: item.jikjong_mid_cd.substr(0, 4) + "00000",
                                  code_id: item.jikjong_mid_cd,
                                },
                              },
                            }}
                          >
                            <ListGroupItem tag="button" action={true} style={{ textAlign: "left", width: "100%" }}>
                              <i className="fa fa-search" /> {item.jikjong_mid_name}
                            </ListGroupItem>
                          </Link>
                        </>
                      );
                    })}
                    {/*<Link to={'/HelpCenter/pagyeon'} target="_blank">
                                                <ListGroupItem
                                                    tag="button"
                                                    style={{"textAlign":"left", width:"100%"}}
                                                ><i className="fa fa-info"/>{' '}
                                                    <small>?????? ?????? ?????? ????????????</small>

                                                    <div className="col-md-3 ml-auto">
                                                        <button className='btn'>??????</button>
                                                    </div>
                                                </ListGroupItem>
                                            </Link>*/}
                  </ListGroup>
                </div>
              </div>
              <style>
                {`
                  .icon-card {
                    border-radius: 12px;
                    box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);
                    background-color: #ffffff;
                    color: #252422;
                    margin-bottom: 20px;
                    position: relative;
                    border: 0 none;
                  }
                  .icon-card ul li {
                    width: 20%;
                    float: left;
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 0.25em;
                    transition: background 0.2s;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    overflow: hidden;
                  }
                `}
              </style>
              <div className="icon-card">
                <ul style={{ paddingLeft: "0px" }}>
                  <li>
                    <Link
                      to={{
                        pathname: `/Company/ReqSugub/AA01`,
                        state: {
                          selected: {
                            sec: "top", // ??????(???) ??????
                            groupName: "??????/??????",
                            code_name: "??????/??????",
                            code_topcd: "AA0100000",
                            code_id: "AA0100000",
                          },
                        },
                      }}
                    >
                      <img src={icon1} className="icon" />
                      <IconText>??????/??????</IconText>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/Company/ReqSugub/AA02`,
                        state: {
                          selected: {
                            sec: "top", // ??????(???) ??????
                            groupName: "??????/????????????",
                            code_name: "??????/????????????",
                            code_topcd: "AA0200000",
                            code_id: "AA0200000",
                          },
                        },
                      }}
                    >
                      <img src={icon2} className="icon" />
                      <IconText>??????/????????????</IconText>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/Company/ReqSugub/AA03`,
                        state: {
                          selected: {
                            sec: "top", // ??????(???) ??????
                            groupName: "IT/?????????",
                            code_name: "IT/?????????",
                            code_topcd: "AA0300000",
                            code_id: "AA0300000",
                          },
                        },
                      }}
                    >
                      <img src={icon3} className="icon" />
                      <IconText>IT/?????????</IconText>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/Company/ReqSugub/AA05`,
                        state: {
                          selected: {
                            sec: "top", // ??????(???) ??????
                            groupName: "?????????",
                            code_name: "?????????",
                            code_topcd: "AA0500000",
                            code_id: "AA0500000",
                          },
                        },
                      }}
                    >
                      <img src={icon4} className="icon" />
                      <IconText>?????????</IconText>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/Company/ReqSugub/AA10`,
                        state: {
                          selected: {
                            sec: "top", // ??????(???) ??????
                            groupName: "??????/??????",
                            code_name: "??????/??????",
                            code_topcd: "AA1000000",
                            code_id: "AA1000000",
                          },
                        },
                      }}
                    >
                      <img src={icon5} className="icon" />
                      <IconText>??????/??????</IconText>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md="6">
              {!isMobile && (
                <div className="centered">
                  <img src={undraw_Agreement_re_d4dv} width={"471px"} height={"453px"} />
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

const TextInput = styled.input`
  width: 100%;
  height: 56px;
  flex-grow: 0;
  // margin: 24px 179px 40px 428px;
  padding: 19.5px 16.5px 19.5px 15.5px;
  border-radius: 2px;
  border: solid 2px #9266ff;
  background-color: #ffffff;
`;
const IconText = styled.p`
  flex-grow: 0;
  opacity: 0.7;
  font-family: SpoqaHanSansNeo;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.28px;
  text-align: center;
  color: #00151c;
`;

const IconCard = styled.div`
  border-radius: 12px;
  box-shadow: 0 6px 10px -4px rgb(0 0 0 / 15%);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  border: 0 none;
`;

export default CompanyMainSearch;
