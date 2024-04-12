import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Character from "../../components/CharacterList/Character.interface";
import styles from "./Favourites.module.scss";
import { Button } from "antd";

const Favourites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [favouriteCharacters, setFavouriteCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const favouritesFromStorage =
      localStorage.getItem("favouriteCharacters") || "[]";
    const favourites = JSON.parse(favouritesFromStorage);
    setFavouriteCharacters(favourites);
  }, []);

  const back = () => {
    navigate('/character');
  };

  return (
    <>
      <div className={styles.header}>
        <Button className={styles.buttonBack} onClick={back}>{t('back')}</Button>
        <h2>{t('favouritesList')}</h2>
        {/* mozda zameni za span da bi bilo uniformno sa characterList */}
      </div>
      {/* <div className={styles.characters}> */}
        {favouriteCharacters.map((character) => (
          <div key={character.id} className={styles.characterItem}>
            <img src={character.image} alt={character.name} />
          </div>
        ))}
      {/* </div> */}
      </>
  )
}

export default Favourites

// postavi da ti se klikom na ok u alert-u zatvori modal characterDetails - to si lako namestila u angular-u
