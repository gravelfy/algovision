import { useWindowSize } from '../../hooks/useWindowSize';
import classes from './Bar.module.css';

function Bar(props) {
  let n;
  props.barre !== undefined ? (n = props.barre) : (n = 100);
  const h = (n * 50) / props.cpc + 'vh';
  const size = useWindowSize();

  if (
    (props.cpc < 34 && size.width > 600) ||
    (props.cpc < 20 && size.width < 600)
  ) {
    //n = n;
  } else {
    n = null;
  }

  return (
    <div className={classes.column}>
      {/* {size.width} */}
      <div className={classes.barre} style={{ flexBasis: h }}>
        {n}
      </div>
    </div>
  );
}

export default Bar;
