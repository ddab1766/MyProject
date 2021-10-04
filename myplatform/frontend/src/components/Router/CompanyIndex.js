import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import RequireAuth from "@/components/auth/RequireAuth";
// import Login from "@/components//auth/Login";
import Logout from "@/components/auth/Logout";
import Signup from "@/components/auth/Signup";
import SignupDone from "@/components/auth/SignupDone";
import AccountActivation from "@/components/auth/AccountActivation";
import PasswordChange from "@/components/auth/PasswordChange";
import PasswordReset from "@/components/auth/PasswordReset";
import PasswordResetDone from "@/components/auth/PasswordResetDone";
import PasswordResetConfirm from "@/components/auth/PasswordResetConfirm";
import ProfileView from "@/views/Common/Profile";
import ProfileEdit from "@/components/Common/ProfileEdit";
// 기업
// import CompanyNavbar from "@/components/Company/CompanyNavbar";
import CompanyHome from "@/components/Company/CompanyHome";
import SugubForm from "@/components/Company/Sugub/SugubForm";
import CompanyProfileView from "@/views/Company/CompanyProfile";
import CompanyAccountView from "@/views/Company/CompanyAccount";
import EmployeeView from "@/views/Company/Employee";
import PartnersView from "@/views/Company/Partners";
import CompanyProfileEdit from "@/components/Company/Auth/CompanyProfileEdit";
import SugubStatus from "@/views/Company/SugubDetailStatus";
import Sugub from "@/views/Company/SugubContainer.jsx";
// import SugubCreate from "@/views/Company/SugubCreate";
import Footer from "../Footers/Footer";
import SugubDetailForm from "../Company/Sugub/SugubDetailForm";
// import "@/assets/css/paper-dashboard_mng.css";
import NoMatch from "../NoMatch";
// import { connect } from "react-redux";
import { getComCode } from "../../actions/commonActions";
import HrProfileDetail from "../Company/HrProfileDetail";
import Reviews from "../../views/Company/Reviews";
import AlarmView from "../../views/Company/Alarm";
import Chat from "../Chat/Chat";
import ChatView from "../../views/Chat/Chat";
import AlarmEdit from "../Common/AlarmEdit";
import PasswordChangeDone from "../auth/PasswordChangeDone";
import CompanyNavbar from "../Company/CompanyNavbar";

const CompanyIndex = (props) => {
  const { match } = props;
  // 공통코드
  useEffect(() => {
    if (props.comcode) return;
    getComCode();
  }, []);
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <CompanyNavbar />
        <Switch>
          <Route exact path={`${match.url}/`} render={(props) => <CompanyHome {...props} />} />
          <Route path={`${match.url}/Home/:recuser`} render={(props) => <CompanyHome {...props} />} />
          <Route path={`${match.url}/SugubInfo/:sugubid`} component={RequireAuth(SugubStatus)} />
          <Route path={`${match.url}/SugubDetailForm/:sugubid`} component={RequireAuth(SugubDetailForm)} />
          <Route path={`${match.url}/SugubDetailForm/`} component={RequireAuth(SugubDetailForm)} />
          <Route path={`${match.url}/Sugub`} component={Sugub} />
          <Route path={`${match.url}/ReqSugub/:jikjong`} render={(props) => <SugubForm {...props} />} />
          <Route path={`${match.url}/ReqSugub`} component={RequireAuth(SugubForm)} />
          <Route path={`${match.url}/ProfileDetail/:id`} component={HrProfileDetail} />
          <Route path={`${match.url}/Account`} component={RequireAuth(CompanyAccountView)} />
          <Route path={`${match.url}/Employee`} component={RequireAuth(EmployeeView)} />
          <Route path={`${match.url}/Profile`} component={RequireAuth(CompanyProfileView)} />
          <Route path={`${match.url}/Profile_edit`} render={(props) => <CompanyProfileEdit {...props} />} />
          <Route path={`${match.url}/Partners`} component={PartnersView} /> {/* 파트너스 찾기 */}
          <Route path={`${match.url}/Review/:sugubid`} render={(props) => <Reviews {...props} />} />{" "}
          {/* 수급리뷰남기기 */}
          <Route path={`${match.url}/Alarm_edit`} component={AlarmEdit} />
          <Route path={`${match.url}/Alarm`} render={(props) => <AlarmView {...props} />} />
          <Route path={`${match.url}/Chat/:receiver/:sugubid`} component={Chat} />
          <Route path={`${match.url}/Chat/:room_number`} component={Chat} />
          <Route path={`${match.url}/Chat`} component={ChatView} /> {/* 채팅 */}
          <Route path={`${match.url}/My`} component={RequireAuth(ProfileView)} />
          <Route path={`${match.url}/My_edit`} component={RequireAuth(ProfileEdit)} />
          <Route path={`${match.url}/logout`} component={Logout} />
          <Route path={`${match.url}/signup`} component={Signup} />
          <Route path={`${match.url}/signup_done`} component={SignupDone} />
          <Route path={`${match.url}/reset_password`} component={PasswordReset} />
          <Route path={`${match.url}/reset_password_done`} component={PasswordResetDone} />
          <Route path={`${match.url}/reset/:uid/:token`} component={PasswordResetConfirm} />
          <Route path={`${match.url}/change_password`} component={RequireAuth(PasswordChange)} />
          <Route path={`${match.url}/change_password_done`} component={PasswordChangeDone} />
          <Route path={`${match.url}/invitations/accept-invite/:key`} component={Signup} />
          <Route path={`/accounts/confirm-email/:key`} component={AccountActivation} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </>
  );
};
export default CompanyIndex;
