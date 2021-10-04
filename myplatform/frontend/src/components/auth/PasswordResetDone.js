import React, {Component} from "react";
import undraw_well_done_i2wr from "@/assets/img/undraw_well_done_i2wr.svg";

export default class PasswordResetDone extends Component {
    render() {
        return (
            <div className="content">
                <form
                    className="col col-sm-3 card mt-5 p-2 ml-auto mr-auto"
                >
                    <h3 className="text-md-center">비밀번호 찾기</h3>
                    <hr/>
                    <div className="text-md-center">
                        <div className="centered">
                            <img
                                alt="..."
                                className="border-gray centered"
                                width={"150px"}
                                src={undraw_well_done_i2wr}
                            />
                        </div>
                        <br/>
                        <h3>
                            <small>
                                입력하신 이메일로 패스워드 초기화 메일을 보냈습니다.<br/>
                                이메일을 확인해주세요.
                            </small>
                        </h3>
                    </div>
                </form>

            </div>
        )
    }
}
