import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/authActions";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import PopupLogin from "../auth/PopupLogin";
import { makeStyles } from "@material-ui/core/styles";
import tap from "../../assets/img/tap.svg";
import CardMedia from "@material-ui/core/CardMedia";
import defaultLogo from "@/assets/img/default-logo.jpg";
import { Modal } from "rsuite";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  img: {
    float: "right",
    marginRight: "2rem",
    opacity: "0.7",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));
const SugubCard = (props) => {
  const { authenticated, hr, company } = props;
  const [loginModal, setLoginModal] = useState(false);
  const toggleModalLogin = () => setLoginModal(!loginModal);
  const classes = useStyles();

  return (
    hr && (
      <>
        <Card
          className="card"
          key={hr.id}
          variant="outlined"
          style={{
            minHeight: "320px",
          }}
        >
          <CardContent className="pb-2">
            <div style={{ fontSize: "1.2em" }}>
              <Row>
                <Col>
                  {/*<div className={classes.root}>*/}
                  {/*    <Avatar alt="Remy Sharp" src={hr.company_logo} style={{width:'30px',height:'30px',margin:'0 0.5rem 0 0'}}/>*/}
                  <CardMedia
                    className={classes.media}
                    image={hr.company_logo ? hr.company_logo : defaultLogo}
                    title="Paella dish"
                  />
                  {/*</div>*/}
                  {/*{sugub.sugub_title.length >= 18 ? sugub.sugub_title.substr(0,18) + '...' : sugub.sugub_title}*/}
                </Col>
              </Row>
            </div>

            <Row style={{ maxHeight: "182px", overflow: "hidden" }}>
              <Col>
                <strong>{hr.custname}</strong>
                <dl>
                  <dt>????????? ?????????</dt>
                  <dd>
                    <strong>{hr.resume_count} ???</strong>
                  </dd>
                </dl>
                <dl>
                  <dt>????????????</dt>
                  <dd>
                    <strong>{hr.jobad_count} ???</strong>
                  </dd>
                </dl>
                <dl>
                  <dt>??????</dt>
                  <dd>
                    <strong>
                      {hr.hr_sugub_reviews.length} ???
                      {hr.hr_sugub_reviews.length > 0 && (
                        <>
                          (??????:
                          {hr.hr_sugub_reviews
                            .map((v) => {
                              return v.point_avg;
                            })
                            .reduce(function add(sum, cur) {
                              return sum + cur;
                            }) / hr.hr_sugub_reviews.length}{" "}
                          ??? )
                        </>
                      )}
                    </strong>
                  </dd>
                </dl>
                {/*<p>????????????</p>*/}
                <hr />
                {/*{hr.hrspecial && hr.hrspecial.map(v2=>{*/}
                {/*    return (*/}
                {/*        <Chip variant="outlined" size="small" label={v2.hr_jikjong_mid.code_name} style={{margin:'2px'}}/>*/}
                {/*    )*/}
                {/*})}*/}
              </Col>
            </Row>

            <br />

            <div
              style={{ bottom: "1rem", position: "absolute", width: "100%" }}
            >
              <div>
                {authenticated ? (
                  <>
                    {/* Hr ?????? ?????? ?????? ?????? ?????? ??????*/}
                    {company ? (
                      <Link
                        to={{
                          pathname: `/Company/ProfileDetail/${hr.id}`,
                          state: {
                            hrprofile: hr,
                          },
                        }}
                      >
                        {/*<button className="btn btn-danger btn-sm">????????? ??????</button>*/}
                        <img
                          className={classes.img}
                          src={tap}
                          width="30px"
                          title="????????? ??????"
                        />
                      </Link>
                    ) : (
                      <Link
                        to={"/Company/Profile"}
                        onClick={() => alert("?????? ??????????????? ??????????????????!")}
                      >
                        {/*<button className="btn btn-danger btn-sm">????????? ??????</button>*/}
                        <img
                          className={classes.img}
                          src={tap}
                          width="30px"
                          title="????????? ??????"
                        />
                      </Link>
                    )}
                  </>
                ) : (
                  <Link to={"#"} onClick={() => toggleModalLogin()}>
                    {/*<button className="btn btn-danger btn-sm" onClick={()=>toggleModalLogin()}>????????? ??????</button>*/}
                    <img
                      className={classes.img}
                      src={tap}
                      width="30px"
                      title="????????? ??????"
                    />
                  </Link>
                )}
                {/*<Modal isOpen={loginModal} toggle={toggleModalLogin}>*/}
                <Modal show={loginModal} onHide={toggleModalLogin} size="xs">
                  <PopupLogin loginSubmit={toggleModalLogin} />
                </Modal>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    )
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    company: state.auth.company,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, { getUserProfile })(SugubCard);
