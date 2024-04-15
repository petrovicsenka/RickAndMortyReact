import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

interface HeaderProps {
  setSearchFilter: (value: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchFilter }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchFilter(value);
  };

  const navigateToFavourites = () => {
    navigate('/favourites');
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <span className={styles.title}>{t('characterListTitle')}</span>
      <div className={styles.controls}>
        <Input
          type="text"
          placeholder={t('search')}
          value={searchValue as string}
          onChange={handleSearchChange}
          className={styles.headerElement}
        />
        <Button type="default" className={styles.headerElement} onClick={navigateToFavourites}>
          {t('favourites')}
        </Button>
        <Button type="default" className={styles.headerElement} onClick={logout}>
          {t('logout')}
        </Button>
      </div>
    </nav>
  );
}

export default Header;
