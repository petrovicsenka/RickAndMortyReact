import React, { useContext, useEffect, useState } from "react";
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
  const [skipFirstEffect, setSkipFirstEffect] = useState<boolean>(true);

  const {
    nameFilter,
    statusFilter,
    speciesFilter,
    genderFilter,
    typeFilter,
  } = useContext(CharacterDataContext);

  const { isLoading, isError, data, refetch } = useQuery<CharacterResponse>(
    "characters",
    () => getCharacters(
      currentPage,
      nameFilter ?? null,
      statusFilter ?? null,
      speciesFilter ?? null,
      genderFilter ?? null,
      typeFilter ?? null
    ),
    {
      // This option will ensure the query does not automatically refetch on window focus
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const debouncedRefetch = _.debounce(() => {
      refetch();
    }, 500);

    if (skipFirstEffect) {
      setSkipFirstEffect(false);
    } else {
      debouncedRefetch();
    }

    // Cleanup function to cancel the debounce if the component unmounts
    return () => {
      debouncedRefetch.cancel();
    };
  }, [currentPage, nameFilter, statusFilter, speciesFilter, genderFilter, typeFilter, refetch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const pageCount = data?.info?.pages ?? 1;

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
        {data?.results?.map((character: Character) => (
          <div key={character.id} className={styles.characterItem}>
            <img src={character.image} alt={character.name} />
            <div>{character.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterList;
