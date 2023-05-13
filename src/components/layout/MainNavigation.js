import { useTranslation } from 'react-i18next';
import useDarkMode from '../../hooks/use-dark-mode';
import Toggle from '../ui/toggle';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useDarkMode();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    document.title = t('Algovision') + ' : ' + t('Sorting Algorithms');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>{t('Algovision')}</div>
      <div className={classes.settings}></div>
      <select
        className={classes.lang}
        onChange={changeLanguageHandler}
        value={i18n.language}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
      <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
  );
}

export default MainNavigation;
