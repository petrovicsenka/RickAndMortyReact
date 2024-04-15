import { Button, Modal } from 'antd';
import Character from '../Character.interface';
import styles from './CharacterDetails.module.scss';
import { useTranslation } from 'react-i18next';

interface CharacterDetailsProps {
  selectedCharacter: Character | null;
  closeModal: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  selectedCharacter,
  closeModal,
}) => {
  const { t } = useTranslation();

  const addToFavourites = () => {
    const favouritesFromStorage =
      localStorage.getItem('favouriteCharacters') || '[]';
    const favourites = JSON.parse(favouritesFromStorage);
    if (
      !favourites.some((char: Character) => char.id === selectedCharacter?.id)
    ) {
      localStorage.setItem(
        'favouriteCharacters',
        JSON.stringify([...favourites, selectedCharacter])
      );

      Modal.info({
        content: 'You added the character to Favourites List successfully!',
        onOk: closeModal,
        className: styles.antModal
      });
    } else {
      Modal.error({
        content: 'This character is already in your Favourites List!',
        className: styles.antModal
      });
    }
    closeModal();
  };

  const removeFromFavourites = () => {
    const favouritesFromStorage =
      localStorage.getItem('favouriteCharacters') || '[]';
    const favourites = JSON.parse(favouritesFromStorage);
    const updatedFavourites = favourites.filter(
      (char: Character) => char.id !== selectedCharacter?.id
    );
    if (
      favourites.some((char: Character) => char.id === selectedCharacter?.id)
    ) {
      localStorage.setItem(
        'favouriteCharacters',
        JSON.stringify(updatedFavourites)
      );
      Modal.info({
        content: 'You removed the character from Favourites List successfully!',
        onOk: closeModal,
        className: styles.antModal
      });
    } else {
      Modal.error({
        content: 'This character is already out of your Favourites List!',
        className: styles.antModal
      });
    }
    closeModal();
  };

  return (
    <Modal
      open={!!selectedCharacter}
      title={selectedCharacter?.name}
      onCancel={closeModal}
      footer={null}
      centered
      className={styles.modelStyle}
    >
      {selectedCharacter && (
        <>
          <img src={selectedCharacter.image} alt={selectedCharacter.name} />
          <p>
            {t('name')}: <b>{selectedCharacter.name}</b>
          </p>
          <p>
            {t('gender')}: <b>{selectedCharacter.gender}</b>
          </p>
          <p>
            {t('species')}: <b>{selectedCharacter.species}</b>
          </p>
          <p>
            {t('locationName')}: <b>{selectedCharacter.location.name}</b>
          </p>
          <div className={styles.buttonContainer}>
            <Button onClick={closeModal}>{t('cancel')}</Button>
            <Button type="primary" onClick={addToFavourites}>{t('addToFavourites')}</Button>
            <Button type="primary" onClick={removeFromFavourites}>
              {t('removeFromFavourites')}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CharacterDetails;
