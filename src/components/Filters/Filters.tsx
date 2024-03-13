import { Input, Select } from "antd";
import { useState } from "react";
import styles from "./Filters.module.scss";

interface FiltersProps {
  setNameFilter: (value: string | null) => void;
  setStatusFilter: (value: string | null) => void;
  setSpeciesFilter: (value: string | null) => void;
  setGenderFilter: (value: string | null) => void;
  setTypeFilter: (value: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  setNameFilter,
  setStatusFilter,
  setSpeciesFilter,
  setGenderFilter,
  setTypeFilter,
}) => {
  const [nameFilterValue, setNameFilterValue] = useState<string | null>(null);
  const [statusFilterValue, setStatusFilterValue] = useState<string | null>(null);
  const [speciesFilterValue, setSpeciesFilterValue] = useState<string | null>(null);
  const [genderFilterValue, setGenderFilterValue] = useState<string | null>(null);
  const [typeFilterValue, setTypeFilterValue] = useState<string | null>(null);
  
  //ovo je ok bez debounce-a
  const handleInputFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputFilterValue: (value: string | null) => void,
    setInputFilter: (value: string | null) => void
  ) => {
    const { value } = e.target;
    setInputFilterValue(value);
    setInputFilter(value);
  };

  const handleSelectFilterChange = (
    value: string,
    setSelectFilterValue: (value: string | null) => void,
    setSelectFilter: (value: string | null) => void
  ) => {
    setSelectFilterValue(value);
    setSelectFilter(value);
  };

  return (
    <div className={styles.filters}>
      <Input
        className={styles.filterItem}
        type="text"
        placeholder="Name"
        value={nameFilterValue as string}
        // onChange={handleNameFilterChange}
        onChange={(e) => handleInputFilterChange(e, setNameFilterValue, setNameFilter)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select status"
        value={statusFilterValue as string}
        // onChange={(value) => handleSelectFilterChange(value)}
        onChange={(value) => handleSelectFilterChange(value, setStatusFilterValue, setStatusFilter)}
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
        value={speciesFilterValue as string}
        // onChange={handleSpeciesFilterChange}
        onChange={(e) => handleInputFilterChange(e, setSpeciesFilterValue, setSpeciesFilter)}
      />
      <Select
        className={styles.filterItem}
        placeholder="Select gender"
        value={genderFilterValue as string}
        // onChange={(value) => handleGenderFilterChange(value)}
        onChange={(value) => handleSelectFilterChange(value, setGenderFilterValue, setGenderFilter)}
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
        value={typeFilterValue as string}
        // onChange={handleTypeFilterChange}
        onChange={(e) => handleInputFilterChange(e, setTypeFilterValue, setTypeFilter)}
      />
    </div>
  );
};

export default Filters;