import React from "react";
import {Icon} from "rsuite";
import styled from "styled-components";
import useScroll_manager from "./useScroll_manager";

const StyleBtn = styled.div`
   position: fixed; 
  bottom: 2%; 
  z-index:9999;
  opacity: .5;
  cursor:pointer;
`;
const UpButton_manager = () => {
    const { y } = useScroll_manager();
    return (
        <>
            <style jsx>{`
            .btn-up {
                position: fixed; 
                  bottom: 2%; 
                  z-index:9999;
                  opacity: .5;
                  cursor:pointer;
            }
            `}</style>
            {y > 500 && <div style={{textAlign:'center'}}>
                <Icon icon="chevron-circle-up"   className="btn-up" size="3x" onClick={()=>document.getElementsByClassName('wrapper')[0].scrollTop = 0}/>
            </div>}
        </>
    )
}


export default UpButton_manager;
