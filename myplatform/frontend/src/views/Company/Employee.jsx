import React, {useEffect, useState} from "react";
// reactstrap components
import {Container} from "reactstrap";
import {connect} from "react-redux";
import {getEmployeeList} from "../../actions/employeeActions";
import Nothing from "../../components/Common/Nothing";
import Employee from "../../components/Company/Employee";
import CustomLoader from "../../components/Rsuite/Loader";

const EmployeeView = (props) => {
    const [employee, setEmployee] = useState(null);
    const [count, setCount] = useState(0)

    useEffect(() => {
        getEmployeeList().then((response)=>{
            setEmployee(response.results)
            setCount(response.count)
        })
    }, []);

    return (
        <>
            <div className="content">
                <Container>
                    <div className="title">
                        <h5>
                            합격자 정보 <small> 총 {count} 명</small><br/>
                            <small>내부 담당자 확인이 완료된 합격자만 표시됩니다.</small>
                        </h5>
                    </div>
                    <hr/>
                    {
                        employee ? (
                            employee.length > 0 ?
                                (<Employee employee={employee}/>) : <Nothing text="해당 내역이 없습니다."/>
                        ) : <CustomLoader/>
                    }
                </Container>
            </div>

        </>
    )
};

export default connect(null, {getEmployeeList})(EmployeeView);

