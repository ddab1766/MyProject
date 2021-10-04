import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import Route from "react-router-dom/Route";
import LoaderSpinnerContainer from "../components/Etc/LoaderSpinnerContainer";
import { Viewer } from "../components/DocViewer/";
import { getComCode } from "../actions/commonActions";
import CustomLoader from "./Rsuite/Loader";
import NoMatch from "./NoMatch";
import ProgressContainer from "./Etc/ProgressContainer";

const CompanyIndex = lazy(() => import("@/components/Router/CompanyIndex"));
const HrIndex = lazy(() => import("@/components/Router/HrIndex"));
const HelpCenterIndex = lazy(() => import("@/components/Router/HelpCenterIndex"));
const AdminLayout = lazy(() => import("@/layouts/Admin.jsx"));
const AuthLayout = lazy(() => import("@/layouts/Auth.jsx"));

const App = ({ hideLoader }) => {
  // 공통코드
  useEffect(() => {
    getComCode();
  }, []);
  window.scrollTo(0, 0);

  return (
    <Suspense fallback={<CustomLoader content="페이지 로딩중...." />}>
      <div className="main">
        <ProgressContainer />
        <LoaderSpinnerContainer />
        <Switch>
          <Route exact path="/" render={(props) => <CompanyIndex {...props} />} />
          <Route path="/Company" render={(props) => <CompanyIndex {...props} />} />
          <Route path="/Mng" render={(props) => <AdminLayout {...props} />} />
          <Route path="/Hr" render={(props) => <HrIndex {...props} />} />
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/HelpCenter" component={HelpCenterIndex} />
          <Route path="/Viewer/:uri" render={(props) => <Viewer {...props} />} />
          <Route path="/accounts" render={(props) => <CompanyIndex {...props} />} />
          {/*<Route component={NoMatch}/>*/}
        </Switch>
      </div>
    </Suspense>
  );
};

export default App;
