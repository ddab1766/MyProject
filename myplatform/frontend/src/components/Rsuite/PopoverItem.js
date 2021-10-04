import React, {useEffect, useRef, useState} from "react";
// import Button from "@material-ui/core/Button";
// import {Popover, PopoverBody, PopoverHeader} from "reactstrap";
import {Popover, Whisper, Button} from "rsuite";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        background:'#4c4c4c',
        color:'#ffffff',
        "&:hover": {
            backgroundColor: '#272727'
        }
    },
});

const PopoverItem = props => {
    const classes = useStyles();
    const { id, item, data } = props;
    // const [popoverOpen, setPopoverOpen] = useState(false);
    // const popoverRef = useRef();
    // const toggle = () => setPopoverOpen(!popoverOpen);

    const triggerRef = React.createRef();
    const open = () => triggerRef.current.open();
    const close = () => triggerRef.current.close();

    useEffect(()=>{
        // if(popoverRef.current) setPopoverOpen(true);
        open()
        // setPopoverOpen(true);
    },[]);
    return (
        <span>
            <Whisper
                trigger="none"
                ref={triggerRef}
                placement={item.placement}
                // trigger="active"
                speaker={<Popover title={`${item.title} ${data.percentage} %`}>{item.body} </Popover>}
            >
              <Button
                  className="mr-1"
                  // className={classes.container}
                  appearance="ghost"
                  // id={"Popover-" + id}
                  // ref={popoverRef}
                  size="small"
              >
                {item.text}
              </Button>
            </Whisper>

            {/*<Popover
          placement={item.placement}
          isOpen={popoverOpen}
          target={"Popover-" + id}
          toggle={toggle}
      >
        <PopoverHeader>
            {item.title}{' '}
            <span style={{color: 'blue', fontWeight: 'bold'}}>{data.percentage} %</span>
        </PopoverHeader>
        <PopoverBody>
          완성도가 높을수록 채용 확률이 올라가요 !
        </PopoverBody>
      </Popover>*/}
    </span>
    );
};

export default PopoverItem;
