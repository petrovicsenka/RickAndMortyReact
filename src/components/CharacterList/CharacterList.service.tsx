import axios from "axios";

const getCharacters = async (page: number) => {
    let apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
    const response = await axios.get(apiUrl);
  
    return response?.data;
  };

export { getCharacters };