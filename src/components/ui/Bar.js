import classes from './Bar.module.css';

function Bar(props) {
  let n;
  props.barre !== undefined ? (n = props.barre) : (n = 100);
  const h = 15 + n * 5;
  // const h = (n * 100) / props.cpc;

  return (
    <div className={classes.column}>
      <div className={classes.barre} key={n} style={{ flexBasis: h }}>
        {n}
      </div>
    </div>
  );
}

export default Bar;
