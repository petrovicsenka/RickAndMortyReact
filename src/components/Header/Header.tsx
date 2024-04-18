import { Button, Input } from 'antd';
import { slide as Menu } from 'react-burger-menu';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { CharacterDataContext } from '../../contexts/CharacterDataContext/CharacterDataContext';
import logo from '../../assets/rick-and-morty-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const navigateToFavourites = () => {
    navigate('/favourites');
  };

  const logout = () => {
    navigate('/login');
  };

  const { handleUpdateFilter, searchFilter } = useContext(CharacterDataContext);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setIsBurgerMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <img src={logo} alt={'Rick and Morty'} className={styles.logo} />
        <span className={styles.title}>{t('characterListTitle')}</span>

        <div className={styles.headerData}>
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

        <FontAwesomeIcon
          icon={isBurgerMenuOpen ? faTimes : faBars}
          className={styles.burgerIcon}
          onClick={toggleBurgerMenu}
        />
      </nav>
      <Menu
        right
        isOpen={isBurgerMenuOpen}
        customBurgerIcon={false} //?
        onStateChange={(state) => setIsBurgerMenuOpen(state.isOpen)} //?
        styles={{
          bmOverlay: {
            width: '40%',
            right: '0',
            height: '100%',
            zIndex: '999'
          },
          bmMenuWrap: {
            marginTop: '44px',
          },
          bmMenu: {
            overflow: 'hidden',
          },
          bmCrossButton: {
            display: 'none'
          },
          bmItemList: {
            marginTop: '4vh'
          }
        }}
      >
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
      </Menu>
    </>
  );
};

export default Header;
