//import FavoritesContext from '../../store/favorites-context';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  //   const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Visualisation d'algorithme de tri</div>
      <nav>
        <ul></ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
