import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import Character from '../CharacterList/Character.interface';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
interface EditCharacterProps {
  character: Character;
  onClose: (character: Character) => void;
}

const EditCharacter: React.FC<EditCharacterProps> = ({
  character,
  onClose,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(true);
  const [editedCharacter, setEditedCharacter] = useState<Character>(character);

  useEffect(() => {
    setEditedCharacter(character);
  }, [character]);

  const handleCancel = () => {
    onClose(character);
    setVisible(false);
  };

  const saveChanges = () => {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');

    if (favouritesFromStorage) {
      let favouriteCharacters = JSON.parse(favouritesFromStorage);

      const index = favouriteCharacters.findIndex(
        (char: Character) => char.id === editedCharacter.id
      );

      if (index !== -1) {
        favouriteCharacters[index].name = editedCharacter.name;
        favouriteCharacters[index].status = editedCharacter.status;
        favouriteCharacters[index].species = editedCharacter.species;
        favouriteCharacters[index].gender = editedCharacter.gender;
        favouriteCharacters[index].type = editedCharacter.type;

        localStorage.setItem(
          'favouriteCharacters',
          JSON.stringify(favouriteCharacters)
        );
      }
    }

    onClose(editedCharacter);
    setVisible(false);
  };

  return (
    <Modal
      title='Edit Character'
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          {t('cancel')}
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={saveChanges}
          disabled={!editedCharacter.name || !editedCharacter.species}
        >
          {t('save')}
        </Button>,
      ]}
    >
      <Form layout='vertical'>
        <Form.Item label='Name'>
          <Input
            value={editedCharacter.name}
            onChange={(e) =>
              setEditedCharacter({ ...editedCharacter, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label='Status'>
          <Select
            value={editedCharacter.status}
            onChange={(value) =>
              setEditedCharacter({ ...editedCharacter, status: value })
            }
          >
            <Option value='Alive'>{t('aliveValue')}</Option>
            <Option value='Dead'>{t('deadValue')}</Option>
            <Option value='unknown'>{t('unknownValue')}</Option>
          </Select>
        </Form.Item>
        <Form.Item label='Species'>
          <Input
            value={editedCharacter.species}
            onChange={(e) =>
              setEditedCharacter({
                ...editedCharacter,
                species: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label='Gender'>
          <Select
            value={editedCharacter.gender}
            onChange={(value) =>
              setEditedCharacter({ ...editedCharacter, gender: value })
            }
          >
            <Option value='Female'>{t('femaleValue')}</Option>
            <Option value='Male'>{t('maleValue')}</Option>
            <Option value='Genderless'>{t('genderlessValue')}</Option>
            <Option value='unknown'>{t('unknownValue')}</Option>
          </Select>
        </Form.Item>

        <Form.Item label='Type'>
          <Input
            value={editedCharacter.type}
            onChange={(e) =>
              setEditedCharacter({ ...editedCharacter, type: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCharacter;
