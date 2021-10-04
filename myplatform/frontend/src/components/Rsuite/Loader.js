import React from "react";
import { Loader, Placeholder } from "rsuite";

const { Paragraph } = Placeholder;

const CustomLoader = (props) => (
  <>
    {/*<Paragraph rows={8}>*/}
    <style jsx="true">
      {`
        .rs-loader-spin::before {
          border: 3px solid #7466ff;
        }
        .rs-loader-spin::after {
          border-color: #bdb7f9 transparent transparent;
        }
      `}
    </style>
    <Loader content="로딩중..." backdrop vertical size="lg" center {...props} />
    {/*</Paragraph>*/}
  </>
);

export default CustomLoader;
