import axios from "axios";

const getCharacters = async (page: number, name?: string, status?: string, species?: string, gender?: string, type?: string) => {
    let apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
  
    if (name) {
      apiUrl += `&name=${name}`;
    }
  
    if (status) {
      apiUrl += `&status=${status}`;
    }
  
    if (species) {
      apiUrl += `&species=${species}`;
    }
  
    if (gender) {
      apiUrl += `&gender=${gender}`;
    }

    if (type) {
      apiUrl += `&type=${type}`;
    }

    const response = await axios.get(apiUrl);
    return response?.data;
  };

export { getCharacters };