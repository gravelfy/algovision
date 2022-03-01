import React from 'react';
import classes from './toggle.module.scss';

const Toggle = ({ darkMode, setDarkMode }) => (
  <div className="dark-mode-toggle">
    {/* <button type="button" onClick={() => setDarkMode(false)}></button> */}
    <span className="toggle-control">
      <input
        className={classes.dmcheck}
        id="dmcheck"
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label htmlFor="dmcheck" />
    </span>

    <span className={classes.moon}>🌙</span>
  </div>
);

export default Toggle;
