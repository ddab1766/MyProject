import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import Logo from "@/assets/main-image/logo.png";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
} from "reactstrap";
import { Badge, Modal, Button, Drawer as RDrawer } from "rsuite";
import PopupLogin from "@/components/auth/PopupLogin";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import history from "@/utils/historyUtils";
import CompanyMainSearch from "@/components/Company/CompanyMainSearch";
import styled from "styled-components";
import { compose } from "redux";

const SNavItem = styled(NavItem)`
  border-bottom: 3px solid ${(props) => (props.current ? "#7466ff" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  align-items: center;
  justify-content: center;
`;

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    color: "#4a4a4a",
  },
  logo: {
    width: "150px",
    height: "51.3px",
    margin: "0 67px 3.4px 320px",
    objectFit: "contain",
  },
}));
const CompanyNavbar = (props) => {
  // const userUrl = AuthUrls.USER_HOME;
  // const managerUrl = AuthUrls.MANAGER_HOME;
  const [loginModal, setLoginModal] = useState(false);
  const [sugubShow, setSugubShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    authenticated,
    company,
    location: { pathname },
  } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  console.log("pahtname?", pathname);

  const sugubClose = () => setSugubShow(false);
  const SugubDrawer = (placement) => {
    setSugubShow(true);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const toggleModalLogin = () => {
    setLoginModal(!loginModal);
  };

  const renderBrand = () => {
    if (company) {
      return (
        <>
          <Link to={"/Company"}>
            <NavbarBrand data-placement="bottom" title="* For Company">
              {company.custname}
            </NavbarBrand>
          </Link>
        </>
      );
    } else {
      return (
        <Link to={"/Company"}>
          <NavbarBrand data-placement="bottom" title="* For Company">
            사용사업주
            {/*<img src={require("@/assets/main-image/image 7.png")}
                                 srcSet={require('@/assets/main-image/image 7@2x.png')}
                                 width={'150px'} height={'51.3px'}/>*/}
          </NavbarBrand>
        </Link>
      );
    }
  };

  const renderLinks = (anchor) => {
    console.log("anchor?", anchor);
    return !anchor ? (
      <>
        <SNavItem current={pathname.indexOf("/Company/Sugub") !== -1}>
          <SLink className="nav-link" to="/Company/Sugub">
            인재채용
          </SLink>
        </SNavItem>
        <SNavItem current={pathname.indexOf("/Company/Partners") !== -1}>
          <SLink className="nav-link" to="/Company/Partners">
            파트너스
          </SLink>
        </SNavItem>
        {props.authenticated && (
          <SNavItem current={pathname.indexOf("/Company/Chat") !== -1}>
            <SLink className="nav-link" to="/Company/Chat">
              채팅
            </SLink>
          </SNavItem>
        )}
      </>
    ) : (
      <>
        <div
          className={clsx({
            [classes.fullList]: anchor === "top" || anchor === "bottom",
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <ListItem>
            <ListItemText
              primary={
                <Link className="nav-link" to="/Company/Sugub">
                  인재채용
                </Link>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary={
                <Link className="nav-link" to="/Company/Partners">
                  파트너스
                </Link>
              }
            />
          </ListItem>
          <Divider component="li" />
          {props.authenticated && (
            <>
              <ListItem>
                <ListItemText
                  primary={
                    <Link className="nav-link" to="/Company/Chat">
                      채팅
                    </Link>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </>
          )}
        </div>
      </>
    );
  };

  const [navbarColor, setNavbarColor] = React.useState();
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 299 || document.body.scrollTop > 299) {
        setNavbarColor("");
      } else if (document.documentElement.scrollTop < 300 || document.body.scrollTop < 300) {
        // setNavbarColor("navbar-transparent");
        // setNavbarColor("#274c5e");
        setNavbarColor("#FFFFFF");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <>
      <style>{`
        #root > div > div > nav > div > div.justify-content-end.collapse.navbar-collapse > ul > li > a,
        #root > div > div > nav > div > div > a > a {
          color: black;
        }
        .navbar {
          background: #ffffff;
        }
        .btn-nav-c,
        .btn-nav-c:hover {
          background: #6bd098 !important;
        }
        .MuiDrawer-paper {
          background: #ffffff;
        }
        .MuiListItem-root a,
        .MuiListItem-root li a {
          color: #4a4a4a;
        }
        .navbar-toggler-bar {
          background-color: #7466ff !important;
        }
      `}</style>
      <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
        <Container>
          <div className="ml-2">{renderBrand()}</div>
          <React.Fragment key="right">
            <button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler navbar-toggler", {
                toggled: navbarCollapse,
              })}
              // onClick={toggleNavbarCollapse}
              onClick={toggleDrawer("right", true)}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
            <Drawer
              anchor="right"
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
              className={classes.drawer}
            >
              <List style={{ width: 280, paddingTop: 0, paddingBotto: 0 }} onClick={toggleDrawer("right", false)}>
                <ListItem>
                  <img
                    src={Logo}
                    width={90}
                    height={30}
                    alt={"..."}
                    // srcSet={`${Logo2x} 2x ${Logo3x} 3x`}
                  />
                  <ListItemText primary={<CloseIcon />} style={{ textAlign: "right" }} />
                </ListItem>
                <Divider component="li" />
                {props.authenticated ? (
                  <>
                    <ListItem>
                      <PersonOutlineIcon style={{ color: "#7466ff" }} />
                      <ListItemText
                        primary={
                          <Link
                            to="/Company/My"
                            className="nav-link"
                            onClick={toggleDrawer("right", false)}
                            onKeyDown={toggleDrawer("right", false)}
                          >
                            내 정보
                          </Link>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem>
                      <PhonelinkSetupIcon style={{ color: "#7466ff" }} />
                      <ListItemText
                        primary={
                          <Link
                            to="/Company/Alarm_edit"
                            className="nav-link"
                            onClick={toggleDrawer("right", false)}
                            onKeyDown={toggleDrawer("right", false)}
                          >
                            알람 설정
                          </Link>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />

                    {props.hr === undefined ||
                      (props.hr === null && (
                        <>
                          <ListItem>
                            <ListItemText
                              primary={
                                <Link
                                  to="/Company/Profile"
                                  className="nav-link"
                                  onClick={toggleDrawer("right", false)}
                                  onKeyDown={toggleDrawer("right", false)}
                                >
                                  기업 정보
                                </Link>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </>
                      ))}

                    {props.company && (
                      <>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Link
                                to="/Company/Employee"
                                className="nav-link"
                                onClick={toggleDrawer("right", false)}
                                onKeyDown={toggleDrawer("right", false)}
                              >
                                합격자 정보
                              </Link>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                          <ListItemText
                            primary={
                              <Link
                                to="/Company/Account"
                                className="nav-link"
                                onClick={toggleDrawer("right", false)}
                                onKeyDown={toggleDrawer("right", false)}
                              >
                                계정 관리
                              </Link>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <ListItem style={{ justifyContent: "space-evenly", marginTop: "10px" }}>
                      <NavItem>
                        <div style={{ textAlign: "center" }}>
                          <Link className="nav-link" to="#" onClick={(e) => e.preventDefault(toggleModalLogin())}>
                            <ExitToAppIcon style={{ color: "#7466ff", fontSize: "35px" }} />
                            <div>로그인</div>
                          </Link>
                        </div>
                      </NavItem>
                      <NavItem>
                        <div style={{ textAlign: "center" }}>
                          <Link
                            className="nav-link"
                            to="/Company/signup"
                            onKeyDown={toggleDrawer("right", false)}
                            onClick={toggleDrawer("right", false)}
                          >
                            <PersonAddIcon style={{ color: "#7466ff", fontSize: "35px" }} />
                            <div>회원가입</div>
                          </Link>
                        </div>
                      </NavItem>
                    </ListItem>
                  </>
                )}

                <ListItem style={{ backgroundColor: "#EEEEEE", justifyContent: "center" }}>
                  <Button className="btn-block m-0" color="primary" onClick={() => SugubDrawer("top")}>
                    채용의뢰서 등록하기{"　"}
                  </Button>
                  {/*<Button style={{marginTop: '20px', marginBottom: '20px'}}*/}
                  {/*        onClick={()=>SugubDrawer('top')}*/}
                  {/*        appearance="primary"*/}
                  {/*>채용의뢰서 등록하기{'　'}<i className="fa fa-chevron-right" style={{fontSize: '11px'}}/> </Button>*/}
                </ListItem>

                {renderLinks("right")}

                <ListItem>
                  <ListItemText
                    primary={
                      <Button className="btn-block m-0" color="primary" onClick={() => history.push("/Hr")}>
                        파트너 서비스
                      </Button>
                    }
                  />
                </ListItem>
                {props.authenticated && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Button
                          className="btn-block m-0"
                          color="primary"
                          onClick={() => history.push("/Company/logout")}
                        >
                          로그아웃
                        </Button>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </Drawer>
          </React.Fragment>
          <div className="justify-content-end collapse navbar-collapse">
            <Nav className="ml-3 mr-auto" navbar>
              {renderLinks()}
            </Nav>
            <Nav className="ml-auto" navbar>
              {props.authenticated ? (
                <>
                  <NavItem>
                    <Link className="nav-link" to="/Company/Alarm">
                      <Badge
                        content={props.alarm != null && props.alarm.filter((v) => v.is_read === false).length}
                        // style={{backgroundCo:'#7466ff'}}
                      >
                        <i className="fa fa-bell-o" style={{ fontSize: "20px" }} />
                        {/*<NotificationsNoneOutlinedIcon style={{color:'#7466ff', fontSize: '25px'}}/>*/}
                      </Badge>
                      {/*    <i className="fa fa-bell-o"/>*/}
                      {/*    <span className="badge badge-danger" style={{"vertical-align": "top"}}>*/}
                      {/*    {props.alarm && props.alarm.filter(v=> v.is_read === false).length}*/}
                      {/*</span>*/}
                    </Link>
                  </NavItem>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} nav inNavbar>
                    <DropdownToggle caret nav style={{ textTransform: "none", display: "-webkit-inline-box" }}>
                      <Avatar
                        alt={props.user && props.user.nickname}
                        src={props.user && props.user.profile_image}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <Link to="/Company/My">
                        <DropdownItem>내 정보</DropdownItem>
                      </Link>
                      <Link to="/Company/Alarm_edit">
                        <DropdownItem>알람 설정</DropdownItem>
                      </Link>
                      {props.hr === null &&
                        (props.company === null ? (
                          <Link to="/Company/Profile">
                            <DropdownItem>기업 등록</DropdownItem>
                          </Link>
                        ) : (
                          <Link to="/Company/Profile">
                            <DropdownItem>기업 정보</DropdownItem>
                          </Link>
                        ))}
                      {props.company && (
                        <>
                          <Link to="/Company/Employee">
                            <DropdownItem>합격자 정보</DropdownItem>
                          </Link>
                          <Link to="/Company/Account">
                            <DropdownItem>계정 관리</DropdownItem>
                          </Link>
                        </>
                      )}

                      <Link to="/Company/logout">
                        <DropdownItem>로그아웃</DropdownItem>
                      </Link>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <Link className="nav-link" to="#" onClick={(e) => e.preventDefault(toggleModalLogin())}>
                      로그인
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to="/Company/signup">
                      회원가입
                    </Link>
                  </NavItem>
                </>
              )}
              <NavItem>
                <Link className="nav-link" to="/Hr" target="_blank">
                  파트너 서비스
                </Link>
              </NavItem>
            </Nav>
          </div>
          <div className="modal-container">
            <Modal show={loginModal} onHide={toggleModalLogin} size="xs">
              <PopupLogin loginSubmit={toggleModalLogin} toggle={toggleModalLogin} />
            </Modal>
          </div>

          <RDrawer placement="top" show={sugubShow} onHide={sugubClose}>
            <CompanyMainSearch />
          </RDrawer>
        </Container>
      </Navbar>
    </>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    company: state.auth.company,
    user: state.auth.user,
    alarm: state.alarm.alarm,
    hr: state.auth.hr,
  };
}

export default compose(withRouter, connect(mapStateToProps))(CompanyNavbar);
