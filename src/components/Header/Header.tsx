import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { CharacterDataContext } from '../../contexts/CharacterDataContext/CharacterDataContext';
import logo from '../../assets/rick-and-morty-icon.png';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateToFavourites = () => {
    navigate('/favourites');
  };

  const logout = () => {
    navigate('/login');
  };

  const { handleUpdateFilter, searchFilter } = useContext(CharacterDataContext);

  return (
    <nav className={styles.nav}>
      <img src={logo} alt={'Rick and Morty'} className={styles.logo} />
      <span className={styles.title}>{t('characterListTitle')}</span>
      <div className={styles.controls}>
        <Input
          type='text'
          placeholder={t('search')}
          value={searchFilter as string}
          onChange={(e) => handleUpdateFilter('search', e.target.value)}
          className={`${styles.headerElement} ${styles.inputElement}`}
        />
        <Button
          type='default'
          className={styles.headerElement}
          onClick={navigateToFavourites}
        >
          {t('favourites')}
        </Button>
        <Button
          type='default'
          className={styles.headerElement}
          onClick={logout}
        >
          {t('logout')}
        </Button>
      </div>
    </nav>
  );
};

export default Header;
