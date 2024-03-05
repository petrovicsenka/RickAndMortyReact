import axios from 'axios';
import { useQuery } from 'react-query';

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

  const { data, isLoading, isError } = useQuery('characters', getCharacters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h2>Character List</h2>
      {data?.map((character: Character) => (
        <div key={character?.id}>
            <img src={character?.image} alt={character?.name} />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
