import React, { useEffect, useState } from "react";
import ChannelService from "../ChannelService";
import { connect } from "react-redux";
import { getRecUser } from "../../actions/authActions";
import CompanyMainSearch from "./CompanyMainSearch";
import { ThemeProvider } from "styled-components";
import { theme } from "../Company/Section/styles";
import { Banner, Services, Works } from "./Section/pages/Home/components";
import Info from "./Section/pages/Home/components/Info";
import Report from "./Section/pages/Home/components/Report";
import Reviews from "./Section/pages/Home/components/Reviews";
import Process from "./Section/pages/Home/components/Process";
import { isMobile } from "react-device-detect";
import Services_Mobile from "./Section/pages/Home/components/Services_Mobile";
import Process_Mobile from "./Section/pages/Home/components/Process_Mobile";
import Report_Mobile from "./Section/pages/Home/components/Report_Mobile";
import Info_Mobile from "./Section/pages/Home/components/Info_Mobile";
import Banner_Mobile from "./Section/pages/Home/components/Banner_Mobile";
import Works_Mobile from "./Section/pages/Home/components/Works_Mobile";
import Reviews_Mobile from "./Section/pages/Home/components/Reviews_Mobile";

const CompanyHome = (props) => {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const [recUser, setRecUser] = useState(props.match.params.recuser);

  useEffect(() => {
    props.getRecUser(recUser);
  }, []);

  const channelTalk = () => {
    if (window.location.pathname.match("/Company")) {
      return ChannelService.boot({
        pluginKey: "fcc2eadf-5d9b-4d5d-a4eb-6687478b2485", //please fill with your plugin key
      });
    }
  };

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <CompanyMainSearch />
          {!isMobile ? <Services /> : <Services_Mobile />}
          {!isMobile ? <Works /> : <Works_Mobile />}
          {!isMobile ? <Process /> : <Process_Mobile />}
          {!isMobile ? <Reviews /> : <Reviews_Mobile />}
          {!isMobile ? <Report /> : <Report_Mobile />}
          {!isMobile ? <Banner /> : <Banner_Mobile />}
          {!isMobile ? <Info /> : <Info_Mobile />}
        </ThemeProvider>
      </div>
      {channelTalk()}
      {/* 채널톡 */}
      {ChannelService.boot({
        pluginKey: "fcc2eadf-5d9b-4d5d-a4eb-6687478b2485", //please fill with your plugin key
      })}
    </>
  );
};

// function mapStateToProps(state) {
//     return {
//         user: state.auth.user,
//         authenticated: state.auth.authenticated
//     }
// }

export default connect(null, { getRecUser })(CompanyHome);
