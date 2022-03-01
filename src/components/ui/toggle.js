import React from 'react';
import classes from './toggle.module.scss';

const Toggle = ({ darkMode, setDarkMode }) => (
  <div className="darkmodetoggle">
    <button
      type="button"
      className={`${classes.sun} ${classes.dmtoggle}`}
      onClick={() => setDarkMode(false)}
    >
      🔆
    </button>
    <span className="toggle-control">
      <input
        className={classes.dmcheck}
        id="dmcheck"
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />

      <label htmlFor="dmcheck"></label>
    </span>

    <button
      className={`${classes.moon} ${classes.dmtoggle}`}
      onClick={() => setDarkMode(true)}
    >
      🌙
    </button>
  </div>
);

export default Toggle;
