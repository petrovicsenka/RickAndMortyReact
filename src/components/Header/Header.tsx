import { Button } from "antd";
import { useNavigate } from 'react-router-dom';
import styles from "./Header.module.scss";

//TO DO
const navigateToFavourites = () => {
  console.log("Favourites");
  // navigate('/favourites');
};

//TO DO
const logout = () => {
  console.log("Log out");
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.nav}>
        <span className={styles.title}>Rick&Morty Character List</span>
        <div>
          <Button type="default" className={styles.button} onClick={navigateToFavourites}>
            Favourites
          </Button>
          <Button type="default" className={styles.button} onClick={logout}>
            Log out
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Header;
