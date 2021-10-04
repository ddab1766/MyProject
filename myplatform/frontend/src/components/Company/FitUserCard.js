import { CardBody, CardHeader } from "reactstrap";
import React from "react";
import DefaultAvatar from "@/assets/img/default-avatar.png";

const FitUserCard = (props) => {
  const { fituser } = props;
  return (
    <>
      <div className="box">
        <CardHeader>
          <div className="card-category">
            {fituser.jikjong_top.code_name} > {fituser.jikjong_mid.code_name}
          </div>
        </CardHeader>
        <CardBody>
          <div className="card-icon icon-primary">
            <img alt="..." className="avatar border-gray" src={DefaultAvatar} />
            <p></p>
            {/*<p>경력 {fituser.career_gigan}년</p>*/}
            {/*<p>희망연봉 {fituser.hope_salary}만원</p>*/}
            {/*<i className="nc-icon nc-spaceship"/>*/}
          </div>
        </CardBody>
      </div>
    </>
  );
};

export default FitUserCard;
