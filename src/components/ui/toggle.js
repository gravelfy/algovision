import React from 'react';
import classes from './toggle.module.scss';

const Toggle = ({ darkMode, setDarkMode }) => (
  <>
    <input
      className={classes.dmcheck}
      id="dmcheck"
      type="checkbox"
      checked={darkMode}
      onChange={() => setDarkMode(!darkMode)}
    />

    <label htmlFor="dmcheck"></label>
  </>
);

export default Toggle;
