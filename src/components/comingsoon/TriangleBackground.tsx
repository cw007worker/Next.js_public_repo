import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const PCHEIGHT = 82.42;
const SMHEIGHT = 29.45;

const TriangleBackground = (props: {
  triangleColor: string;
  backgroundColor: string;
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: props.backgroundColor,
      },
      triangle: {
        borderTop: `${PCHEIGHT}px solid ${props.triangleColor}`,
        borderRight: '50vw solid transparent',
        borderLeft: '50vw solid transparent',
        width: '0',
        [theme.breakpoints.down('sm')]: {
          borderTop: `${SMHEIGHT}px solid ${props.triangleColor}`,
        },
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.triangle}></div>
    </div>
  );
};

export default TriangleBackground;
