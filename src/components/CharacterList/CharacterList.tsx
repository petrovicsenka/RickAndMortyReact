import axios from "axios";
import { useQuery } from "react-query";
import { Pagination } from "antd";
import styles from "./CharacterList.module.scss";
import { useState } from "react";

// TO UPDATE?
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const PER_PAGE = 30;

const getCharacters = async (page: number) => {
  let apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
  const response = await axios.get(apiUrl);

  return response?.data;
};

const CharacterList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery(
    ["characters", currentPage],
    () => getCharacters(currentPage)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageCount = data.info.pages;

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
          <div key={character?.id} className={styles.characterItem}>
            <img src={character?.image} alt={character?.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CharacterList;