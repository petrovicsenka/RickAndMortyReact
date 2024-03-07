import { useQuery } from "react-query";
import { Pagination } from "antd";
import styles from "./CharacterList.module.scss";
import { useState } from "react";
import { getCharacters } from "./CharacterList.service";

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


interface CharacterListProps {
  searchFilter: string | null;
}

const PER_PAGE = 30;

const CharacterList: React.FC<CharacterListProps> = ({ searchFilter }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isError } = useQuery<CharacterResponse>(
    ["characters", currentPage],
    () => getCharacters(currentPage)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCharacters = data?.results?.filter((character: Character) => {
    if (!searchFilter) return true;
    const filterLowerCase = searchFilter?.toLowerCase();
    return (
      character?.name?.toLowerCase().includes(filterLowerCase) ||
      character?.status?.toLowerCase().includes(filterLowerCase) ||
      character?.species?.toLowerCase().includes(filterLowerCase) ||
      character?.location?.name?.toLowerCase().includes(filterLowerCase)
    );
  });

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
        {filteredCharacters?.map((character: Character) => (
          <div key={character?.id} className={styles.characterItem}>
            <img src={character?.image} alt={character?.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterList;