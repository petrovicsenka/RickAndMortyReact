import axios from "axios";
import { useQuery } from "react-query";
import styles from "./CharacterList.module.scss";

//TO UPDATE?
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

const getCharacters = async () => {
  let apiUrl = "https://rickandmortyapi.com/api/character";
  const response = await axios.get(apiUrl);

  return response?.data?.results;
};

const CharacterList = () => {
  const { data, isLoading, isError } = useQuery("characters", getCharacters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className={styles.characters}>
      {data?.map((character: Character) => (
        <div key={character?.id} className={styles.characterItem}>
          <img src={character?.image} alt={character?.name} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
