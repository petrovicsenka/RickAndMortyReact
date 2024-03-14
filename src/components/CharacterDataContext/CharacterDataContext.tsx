import { createContext, useState } from "react";

export type TUpdateFilterHandler = (
  filterType: "name" | "status" | "species" | "gender" | "type" | "search",
  newValue: string
) => void;

// This is interface that tells us what statefull data we will be passing down to contextConsumers
export interface CharacterDataContextValues {
  nameFilter: string | null;
  statusFilter: string | null;
  speciesFilter: string | null;
  genderFilter: string | null;
  typeFilter: string | null;
  searchFilter: string | null;
  handleUpdateFilter: TUpdateFilterHandler;
}
// Classic context generation
export const CharacterDataContext = createContext<CharacterDataContextValues>(
  null as any
);

export const CharactersContextProvider = ({ children }: any) => {
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const handleUpdateFilter: TUpdateFilterHandler = (
    filterType: "name" | "status" | "species" | "gender" | "type" | "search",
    newValue: string
  ) => { //switch...case dodaj!
    if (filterType === "name") {
      setNameFilter(newValue);
    }
    if (filterType === "status") {
      setStatusFilter(newValue);
    }
    if (filterType === "species") {
      setSpeciesFilter(newValue);
    }
    if (filterType === "gender") {
      setGenderFilter(newValue);
    }
    if (filterType === "type") {
      setTypeFilter(newValue);
    }
    if (filterType === "search") {
      setSearchFilter(newValue);
    }
  };

  const providerData = {
    nameFilter: nameFilter,
    statusFilter: statusFilter,
    speciesFilter: speciesFilter,
    genderFilter: genderFilter,
    typeFilter: typeFilter,
    searchFilter: searchFilter,
    handleUpdateFilter: handleUpdateFilter,
  };

  //   Wrap children in context.Provider so that we can use this component as a wrapper component
  return (
    <CharacterDataContext.Provider value={providerData}>
      {children}
    </CharacterDataContext.Provider>
  );
};
