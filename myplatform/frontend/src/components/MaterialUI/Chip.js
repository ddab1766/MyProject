import React from "react";
import {Chip, makeStyles} from '@material-ui/core';
import {withStyles} from "@material-ui/styles";

// const StyledChip = withStyles({
//   root: {
//     "&&:hover": {
//       backgroundColor: "purple"
//     },
//     "&&:focus": {
//       backgroundColor: "green"
//     }
//   }
// })(Chip);

const useStyles = makeStyles({
    root: {
        // display: "relative",
    },
    clickableColorPrimary: {
        backgroundColor: '#7466FF',
    },
    outlinedPrimary: {
        color: '#7466FF',
        border: '1px solid #7466FF'
    }
});

const StyledChip = withStyles({
  root: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "#7466FF"
    }
  }
})(Chip);

export default function CustomChip(props) {
    return (
        <>
            {/*<style jsx>{`
                .MuiChip-colorPrimary{
                  background-color: #7466FF;
                }
                .MuiChip-colorSecondary{
                  background-color: #7466FF;
                }
                .MuiChip-outlinedPrimary {
                  color: #7466FF;
                  border: 1px solid #7466FF;
                }
                .MuiChip-outlinedSecondary {
                  color: #7466FF;
                  border: 1px solid #7466FF;
                }
                .MuiChip-outlined {
                    border: 1px solid rgba(0, 0, 0, 0.23);
                    background-color: transparent;
                }
                .MuiChip-clickable {
                    cursor: pointer;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                .MuiChip-clickable:hover, .MuiChip-clickable:focus {
                    background-color: rgb(206, 206, 206);
                }
                .MuiChip-clickable.MuiChip-outlinedSecondary:hover, .MuiChip-clickable.MuiChip-outlinedSecondary:focus, .MuiChip-deletable.MuiChip-outlinedSecondary:focus {
                    background-color: rgba(245, 0, 87, 0.04);
                }
                .MuiChip-clickable.MuiChip-outlinedPrimary:hover, .MuiChip-clickable.MuiChip-outlinedPrimary:focus, .MuiChip-deletable.MuiChip-outlinedPrimary:focus {
                    background-color: rgba(245, 0, 87, 0.04);
                }
            `}
            </style>*/}
            <StyledChip {...props}/>
        </>
    );
}
