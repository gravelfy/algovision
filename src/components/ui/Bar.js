import classes from './Bar.module.css';

function Bar(props) {
  let n;
  props.barre !== undefined ? (n = props.barre) : (n = 100);
  //const h = 15 + n * 5;
  const h = (n * 300) / props.cpc;

  return (
    <div className={classes.column}>
      <div className={classes.barre} style={{ flexBasis: h }}>
        {props.cpc < 34 ? n : null}
      </div>
    </div>
  );
}

export default Bar;
