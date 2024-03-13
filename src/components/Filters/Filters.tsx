import { Input, Select } from "antd";
import { useContext, useState } from "react";
import styles from "./Filters.module.scss";
import { CharacterDataContext } from "../CharacterDataContext/CharacterDataContext";

interface FiltersProps {
  setNameFilter: (value: string | null) => void;
  setStatusFilter: (value: string | null) => void;
  setSpeciesFilter: (value: string | null) => void;
  setGenderFilter: (value: string | null) => void;
  setTypeFilter: (value: string | null) => void;
}

// const Filters: React.FC<FiltersProps> = ({
  const Filters: React.FC = ({
  // setNameFilter,
  // setStatusFilter,
  // setSpeciesFilter,
  // setGenderFilter,
  // setTypeFilter,
}) => {
  // const [nameFilterValue, setNameFilterValue] = useState<string | null>(null);
  // const [statusFilterValue, setStatusFilterValue] = useState<string | null>(null);
  // const [speciesFilterValue, setSpeciesFilterValue] = useState<string | null>(null);
  // const [genderFilterValue, setGenderFilterValue] = useState<string | null>(null);
  // const [typeFilterValue, setTypeFilterValue] = useState<string | null>(null);
  
  const { handleUpdateFilter, nameFilter, statusFilter, speciesFilter, genderFilter, typeFilter } = useContext(CharacterDataContext)

  return (
    <div className={styles.filters}>
      
      <Input
        className={styles.filterItem}
        type="text"
        placeholder="Name"
        value={nameFilter as string}
        // onChange={handleNameFilterChange}
        onChange={(e) => handleUpdateFilter('name', e.target.value)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select status"
        value={statusFilter as string}
        // onChange={(value) => handleSelectFilterChange(value)}
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
        // onChange={handleSpeciesFilterChange}
        onChange={(e) => handleUpdateFilter('species', e.target.value)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select gender"
        value={genderFilter as string}
        // onChange={(value) => handleGenderFilterChange(value)}
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
        // onChange={handleTypeFilterChange}
        onChange={(e) => handleUpdateFilter('type', e.target.value)}
      />
    </div>
  );
};

export default Filters;