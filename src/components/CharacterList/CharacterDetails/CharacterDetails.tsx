import { Modal } from "antd"
import Character from "../Character.interface";
import styles from "./CharacterDetails.module.scss";
import { useTranslation } from "react-i18next";

interface CharacterDetailsProps {
    selectedCharacter: Character | null;
    closeModal: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ selectedCharacter, closeModal }) => {
  const { t } = useTranslation();

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
          <p>{t('name')}: <b>{selectedCharacter.name}</b></p>
          <p>{t('gender')}: <b>{selectedCharacter.gender}</b></p>
          <p>{t('species')}: <b>{selectedCharacter.species}</b></p>
          <p>{t('locationName')}: <b>{selectedCharacter.location.name}</b></p>
        </>
      )}
    </Modal>
  );
};

export default CharacterDetails;
