import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    height: '7px',
    overflow: 'hidden',
    position: 'relative',
  },
  colorPrimary: {
    backgroundColor: 'rgb(182, 188, 226)',
  },
  barColorPrimary: {
    backgroundColor: '#7466FF',
  }
});

export default function LinearDeterminate({progress}) {
  const classes = useStyles();

  return (
    <div>
      <LinearProgress variant="determinate" value={progress}
                      classes={{root: classes.root, colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}
      />
    </div>
  );
}
