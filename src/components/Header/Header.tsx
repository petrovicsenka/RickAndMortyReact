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
  const { handleUpdateFilter, searchFilter } = useContext(CharacterDataContext);

  const navigateToFavourites = () => navigate('/favourites');
  const logout = () => navigate('/login');

  const toggleBurgerMenu = () => {
    console.log('clikc')
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setIsBurgerMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderHeaderItems = () => (
    <>
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
      <Button type='default' className={styles.headerElement} onClick={logout}>
        {t('logout')}
      </Button>
    </>
  );

  return (
    <>
      <nav className={styles.nav}>
        <img src={logo} alt={'Rick and Morty'} className={styles.logo} />
        <span className={styles.title}>{t('characterListTitle')}</span>
        <div className={styles.headerData}>{renderHeaderItems()}</div>
        <FontAwesomeIcon
          icon={isBurgerMenuOpen ? faTimes : faBars}
          className={styles.burgerIcon}
          onClick={toggleBurgerMenu}
        />
      </nav>
      {isBurgerMenuOpen && <Menu
        right
        isOpen={isBurgerMenuOpen}
        onOpen={toggleBurgerMenu}
        onClose={toggleBurgerMenu}
        styles={{
          bmOverlay: {
            width: '40%',
            right: '0',
            height: '100%',
            zIndex: '999',
          },
          bmMenuWrap: {
            marginTop: '44px',
          },
          bmMenu: {
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'flex-start',
            overflow: 'hidden',
          },
          bmCrossButton: {
            display: 'none',
          },
          bmItemList: {
            marginTop: '4vh',
            // left: '70%',
            width: '40%'
          },
        }}
      >
        {/* <Input
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
        </Button> */}

        { renderHeaderItems()}
      </Menu>}
    </>
  );
};

export default Header;
