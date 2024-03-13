import { createContext, useState } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { CharacterDataContext } from "../../components/CharacterDataContext/CharacterDataContext";
// import { CharacterDataContext } from "../../components/CharacterDataContext/CharacterDataContext";

export interface CharacterDataContextType {
  nameFilter: string | null;
  statusFilter: string | null;
  speciesFilter: string | null;
  genderFilter: string | null;
  typeFilter: string | null;
  setNameFilter: (value: string | null) => void;
  setStatusFilter: (value: string | null) => void;
  setSpeciesFilter: (value: string | null) => void;
  setGenderFilter: (value: string | null) => void;
  setTypeFilter: (value: string | null) => void;
}

// const characterDataContext = createContext<CharacterDataContextType | null>(null);

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
      <CharacterDataContext.Provider value={CharacterDataContextType}>
        <Filters
          // setNameFilter={setNameFilter}
          // setStatusFilter={setStatusFilter}
          // setSpeciesFilter={setSpeciesFilter}
          // setGenderFilter={setGenderFilter}
          // setTypeFilter={setTypeFilter}
        />
        <CharacterList
          // searchFilter={searchFilter}
          // nameFilter={nameFilter}
          // statusFilter={statusFilter}
          // speciesFilter={speciesFilter}
          // genderFilter={genderFilter}
          // typeFilter={typeFilter}
        />
      </CharacterDataContext.Provider>
    </>
  );
};

export default CharacterContent;
