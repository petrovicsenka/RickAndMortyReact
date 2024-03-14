import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Pagination } from "antd";
import styles from "./CharacterList.module.scss";
import { getCharacters } from "./CharacterList.service";
import { CharacterDataContext } from "../CharacterDataContext/CharacterDataContext";
import _ from "lodash";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
}

interface CharacterResponse {
  results: Character[];
  info: {
    pages: number;
  };
}

const PER_PAGE = 30;

const CharacterList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    nameFilter,
    statusFilter,
    speciesFilter,
    genderFilter,
    typeFilter,
    searchFilter,
  } = useContext(CharacterDataContext);

  const { data, isLoading, isError, refetch } = useQuery<CharacterResponse>(
    ["characters"],
    () =>
      getCharacters(
        currentPage,
        nameFilter ?? "",
        statusFilter ?? "",
        speciesFilter ?? "",
        genderFilter ?? "",
        typeFilter ?? ""
      )
  );

  //ovako se okida 1 request pri unosu inputa, ali i dalje postoji problem okidanja 2 request-a pri refresh-u app:
  const debouncedRefetch = useMemo(
    () => _.debounce(() => refetch(), 500),
    [refetch]
  );
  
  useEffect(() => {
    debouncedRefetch();
    console.log("debounceRefetch called");
  }, [nameFilter, speciesFilter, typeFilter, debouncedRefetch]); 

  useEffect(() => {
    refetch();
    console.log("refetch called");
  }, [statusFilter, genderFilter]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //*****

  // const filteredCharacters = data?.results?.filter((character: Character) => {
  //   if (!searchFilter) return true;
  //   const filterLowerCase = searchFilter?.toLowerCase();
  //   return (
  //     character?.name?.toLowerCase().includes(filterLowerCase) ||
  //     character?.status?.toLowerCase().includes(filterLowerCase) ||
  //     character?.species?.toLowerCase().includes(filterLowerCase) ||
  //     character?.location?.name?.toLowerCase().includes(filterLowerCase)
  //   );
  // });

  const pageCount = data?.info?.pages ?? 1;

  const filteredCharacters = data?.results?.filter((character) =>
    character.name.includes(searchFilter ?? '')
  );

  const filteredData = searchFilter ? filteredCharacters : data?.results;

  return (
    <>
      <div className={styles.pagination}>
        <Pagination
          current={currentPage}
          total={pageCount * PER_PAGE}
          pageSize={PER_PAGE}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <div className={styles.characters}>
        {/* {filteredCharacters?.map((character: Character) => ( */}
        {data?.results?.map((character: Character) => (
          <div key={character?.id} className={styles.characterItem}>
            <img src={character?.image} alt={character?.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterList;
