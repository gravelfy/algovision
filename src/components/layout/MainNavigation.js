import { Link } from 'react-router-dom';
//import FavoritesContext from '../../store/favorites-context';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  //   const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <i>Algo</i>Fresh
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Visualisateur</Link>
          </li>
          <li>
            <Link to="/comparaison">Comparateur</Link>
          </li>
          <li>
            <Link to="/commentaires">Commentaires</Link>
          </li>
          <li>
            <Link to="/favoris">
              Favoris
              <span className={classes.badge}>
                {/* {favoritesCtx.totalFavorites} */}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
