import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Algorithmes de tri</div>

      <nav>
        <ul>
          {/* <li>
            <Link to="/algo-react">Algorithmes</Link>
          </li>
          <li>
            <Link onClick={loadApropos()}>À propos</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
