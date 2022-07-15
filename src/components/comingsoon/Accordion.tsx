import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Image from 'next/image';
import clsx from 'clsx';

const Accordion = (props: {
  summary: string;
  image: any;
  children?: React.ReactNode;
}) => {
  const [height, setHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        marginBottom: '38.31px',
        [theme.breakpoints.down('sm')]: {
          marginBottom: '25.75px',
        },
      },
      button: {
        display: 'block',
        height: '54.69px',
        width: '100%',
        maxWidth: '350px',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '7.4px',
        margin: '0 auto',
        padding: '23px 0',
        backgroundColor: '#FFD9AC',
        textAlign: 'center',
        position: 'relative',
      },
      buttonImage: {
        height: '7.41px',
        width: '12px',
        position: 'absolute',
        right: '23.89px',
        left: 'auto',
        top: '0',
        bottom: '0',
        margin: 'auto',
        transition: '0.5s',
        transform: 'rotateZ(0deg)',
      },
      content: {
        maxWidth: '560px',
        maxHeight: loading ? 'none' : '0',
        margin: '0 auto',
        textAlign: 'center',
        transition: '1s',
        overflow: 'hidden',
      },
      openImage: {
        transform: 'rotateZ(180deg)',
      },
      openContent: {
        maxHeight: height || '600px',
      },
    })
  );
  const { summary, image, children } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    //@ts-ignore TODO: 修正しよう
    setHeight(ref.current.clientHeight);
    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <button className={classes.button} onClick={() => setOpen(!open)}>
        <p>{summary}</p>
        <div
          className={`${classes.buttonImage} ${open ? classes.openImage : ''}`}
        >
          <Image src={image} alt={'accordionImage'} />
        </div>
      </button>
      <div
        className={clsx(classes.content, open && classes.openContent)}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
