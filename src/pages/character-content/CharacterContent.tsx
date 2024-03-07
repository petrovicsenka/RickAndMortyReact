import { useState } from "react";
import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";

const CharacterContent = () => {

    const [searchFilter, setSearchFilter] = useState<string | null>(null);

    return (
        <>
            <Header setSearchFilter={setSearchFilter} />
            <CharacterList searchFilter={searchFilter} />
        </>
    );
    
}

export default CharacterContent;