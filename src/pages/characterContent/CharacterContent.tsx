import { useState } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";

const CharacterContent = () => {
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  return (
    <>
      <Header setSearchFilter={setSearchFilter} />
      <Filters
        setNameFilter={setNameFilter}
        setStatusFilter={setStatusFilter}
        setSpeciesFilter={setSpeciesFilter}
        setGenderFilter={setGenderFilter}
        setTypeFilter={setTypeFilter}
      />
      <CharacterList
        searchFilter={searchFilter}
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        speciesFilter={speciesFilter}
        genderFilter={genderFilter}
        typeFilter={typeFilter}
      />
    </>
  );
};

export default CharacterContent;
