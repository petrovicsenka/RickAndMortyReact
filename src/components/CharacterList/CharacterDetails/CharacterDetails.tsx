import { Modal } from "antd"
import Character from "../Character.interface";
import styles from "./CharacterDetails.module.scss";

interface CharacterDetailsProps {
    selectedCharacter: Character | null;
    closeModal: () => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ selectedCharacter, closeModal }) => {
  
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
            <p>Name: <b>{selectedCharacter.name}</b></p>
            <p>Gender: <b>{selectedCharacter.gender}</b></p>
            <p>Species: <b>{selectedCharacter.species}</b></p>
            <p>Location Name: <b>{selectedCharacter.location.name}</b></p>
          </>
        )}
      </Modal>
    );
};

export default CharacterDetails;
