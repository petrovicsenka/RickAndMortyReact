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
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector(`.${styles.nav}`);
      if (headerElement) {
        const height = headerElement.clientHeight;
        setHeaderHeight(height);
      }
    };

    calculateHeaderHeight();

    window.addEventListener('resize', calculateHeaderHeight);

    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1440) {
        setIsBurgerMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const closeMenuOnClickOutside = (event: MouseEvent) => {
      if (
        isBurgerMenuOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.bm-menu')
      ) {
        setIsBurgerMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenuOnClickOutside);

    return () => {
      document.removeEventListener('click', closeMenuOnClickOutside);
    };
  }, [isBurgerMenuOpen]);

  const renderHeaderItems = () => (
    <>
      <div className={`${isBurgerMenuOpen ? '' : styles.burgerMenuClosed}`}>
        <Input
          type='text'
          placeholder={t('search')}
          value={searchFilter as string}
          onChange={(e) => handleUpdateFilter('search', e.target.value)}
          className={styles.inputElement}
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
    </>
  );

  return (
    <div>
      <nav className={styles.nav}>
        <img src={logo} alt={t('altRickAndMorty')} className={styles.logo} />
        <span className={styles.title}>{t('characterListTitle')}</span>
        <div className={styles.headerData}>{renderHeaderItems()}</div>
        <FontAwesomeIcon
          icon={isBurgerMenuOpen ? faTimes : faBars}
          className={styles.burgerIcon}
          onClick={toggleBurgerMenu}
        />
      </nav>
      {isBurgerMenuOpen && (
        <Menu
          right
          isOpen={isBurgerMenuOpen}
          onOpen={toggleBurgerMenu}
          onClose={toggleBurgerMenu}
          styles={{
            bmOverlay: {
              right: '0',
              zIndex: '999',
            },
            bmMenuWrap: {
              height: `calc(100vh - ${headerHeight}px)`,
              backgroundColor: 'rgba(246, 246, 246, 0.9)',
              width: '40%',
              bottom: '0'
            },
            bmMenu: {
              display: 'flex',
              justifyContent: 'center',
              overflow: 'hidden',
            },
            bmCrossButton: {
              display: 'none',
            },
            bmItemList: {
              marginTop: '4vh',
              width: '100%'
            },
          }}
        >
          {renderHeaderItems()}
        </Menu>
      )}
    </div>
  );
};

export default Header;
