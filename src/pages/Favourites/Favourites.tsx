import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Character from '../../components/CharacterList/Character.interface';
import styles from './Favourites.module.scss';
import { Button } from 'antd';
import EditCharacter from '../../components/CharacterEdit/CharacterEdit';

const Favourites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [favouriteCharacters, setFavouriteCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const favouritesFromStorage =
      localStorage.getItem('favouriteCharacters') || '[]';
    const favourites = JSON.parse(favouritesFromStorage);
    setFavouriteCharacters(favourites);
  }, []);

  const back = () => {
    navigate('/character');
  };

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  const handleCharacterClose = (character: Character) => {
    const updatedCharacters = favouriteCharacters.map((c) =>
      c.id === character.id ? character : c
    );
    setFavouriteCharacters(updatedCharacters);
    closeModal();
  };

  return (
    <>
      <div className={styles.header}>
        <Button className={styles.buttonBack} onClick={back}>
          {t('back')}
        </Button>
        <span className={styles.title}>{t('favouritesList')}</span>
      </div>
      {/* <div className={styles.characters}> */}
      {favouriteCharacters.map((character) => (
        <div
          key={character.id}
          className={styles.characterItem}
          onClick={() => openModal(character)}
        >
          <img src={character.image} alt={character.name} />
        </div>
      ))}
      {/* <EditCharacter selectedCharacter={selectedCharacter} closeModal={closeModal} /> */}
      {selectedCharacter && (
        <EditCharacter
          character={selectedCharacter}
          onClose={handleCharacterClose}
        />
      )}
      {/* </div> */}
    </>
  );
};

export default Favourites;
