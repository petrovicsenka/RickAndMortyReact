import { Input, Select } from "antd";
import { useContext } from "react";
import styles from "./Filters.module.scss";
import { CharacterDataContext } from "../CharacterDataContext/CharacterDataContext";

const Filters: React.FC = () => {

  const { handleUpdateFilter, nameFilter, statusFilter, speciesFilter, genderFilter, typeFilter } = useContext(CharacterDataContext)

  return (
    <div className={styles.filters}>
      <Input
        className={styles.filterItem}
        type="text"
        placeholder="Name"
        value={nameFilter as string}
        onChange={(e) => handleUpdateFilter('name', e.target.value)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select status"
        value={statusFilter as string}
        onChange={(value) => handleUpdateFilter('status', value)}
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="Alive">Alive</Select.Option>
        <Select.Option value="Dead">Dead</Select.Option>
        <Select.Option value="unknown">Unknown</Select.Option>
      </Select>
      <Input
        className={styles.filterItem}
        type="text"
        placeholder="Species"
        value={speciesFilter as string}
        onChange={(e) => handleUpdateFilter('species', e.target.value)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select gender"
        value={genderFilter as string}
        onChange={(value) => handleUpdateFilter('gender', value)}
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="Female">Female</Select.Option>
        <Select.Option value="Male">Male</Select.Option>
        <Select.Option value="Genderless">Genderless</Select.Option>
        <Select.Option value="unknown">Unknown</Select.Option>
      </Select>
      <Input
        className={styles.filterItem}
        type="text"
        placeholder="Type"
        value={typeFilter as string}
        onChange={(e) => handleUpdateFilter('type', e.target.value)}
      />
    </div>
  );
};

export default Filters;