import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const FaqAccordion = (props: {
  summary: string;
  children?: React.ReactNode;
}) => {
  const [height, setHeight] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: '560px',
        margin: '0 auto 10px',
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        minHeight: '60px',
        width: '100%',
        borderRadius: '6px',
        fontSize: '18px',
        margin: '0 auto',
        padding: '16px 20px',
        backgroundColor: '#333333',
        textAlign: 'left',
        position: 'relative',
        [theme.breakpoints.down(360)]: {
          fontSize: '14px',
          minHeight: '50px',
        },
      },
      summary: {
        color: '#FFFFFF',
        width: '100%',
      },
      mark: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: '30px',
        color: '#FFFFFF',
        marginLeft: 40,
        [theme.breakpoints.down(360)]: {
          marginLeft: 32,
        },
      },
      buttonImage: {
        height: '18px',
        width: '14px',
        position: 'absolute',
        right: '23.89px',
        left: 'auto',
        top: '0',
        bottom: '0',
        margin: 'auto',
      },
      content: {
        maxWidth: '560px',
        maxHeight: loading ? 'none' : '0',
        margin: '0 auto',
        transition: '1s',
        overflow: 'hidden',
      },
      openImage: {
        height: '28px',
      },
      openContent: {
        maxHeight: height || '200px',
      },
    })
  );

  const { summary, children } = props;
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
        <p className={classes.summary}>{summary}</p>
        <p className={classes.mark}>{open ? 'ー' : '＋'}</p>
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

export default FaqAccordion;
