import React from 'react';
import classes from './toggle.module.scss';

const Toggle = ({ darkMode, setDarkMode }) => (
  // <div className="darkmodetoggle">
  <>
    {/* <button
      type="button"
      className={`${classes.sun} ${classes.dmtoggle}`}
      onClick={() => setDarkMode(false)}
      disabled
    >
      🔆
    </button> */}
    {/* <span className="togglecontrol"> */}
    <input
      className={classes.dmcheck}
      id="dmcheck"
      type="checkbox"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />

    <label htmlFor="dmcheck"></label>
    {/* </span> */}

    {/* <button
      className={`${classes.moon} ${classes.dmtoggle}`}
      onClick={() => setDarkMode(true)}
      disabled
    >
      🌙
    </button> */}
  </>
  // </div>
);

export default Toggle;
