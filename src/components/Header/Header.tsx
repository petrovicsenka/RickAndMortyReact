import { Button, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  setSearchFilter: (value: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchFilter }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchFilter(value);
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <>
      <nav className={styles.nav}>
        <span className={styles.title}>Rick&Morty Character List</span>
        <div className={styles.controls}>
          <Input
            type="text"
            placeholder="Search"
            value={searchValue as string}
            onChange={handleSearchChange}
          />
          <Button type="default" className={styles.button} onClick={logout}>
            Log out
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Header;
