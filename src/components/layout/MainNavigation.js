import { useTranslation } from 'react-i18next';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { t, i18n } = useTranslation();

  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    document.title = t('Sorting Algorithms');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>{t('Sorting Algorithms')}</div>
      <select
        className="custom-select"
        style={{ width: 50 }}
        onChange={changeLanguageHandler}
        value={i18n.language}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </header>
  );
}

export default MainNavigation;
