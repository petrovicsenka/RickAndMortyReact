import { createContext } from "react";
import { CharacterDataContextType } from "../../pages/CharacterContent/CharacterContent";

export const CharacterDataContext = createContext<CharacterDataContextType | null>(null);


// import { createContext, useContext, useState } from "react";

// // interface CharacterDataContextType {
// //     nameFilter: string | null;
// //     statusFilter: string | null;
// //     speciesFilter: string | null;
// //     genderFilter: string | null;
// //     typeFilter: string | null;
// // }

// // const CharacterDataContext = createContext<CharacterDataContextType | null>(null);

// export const CharacterProvider = () => { //: React.FC  //{ children }
//     const [nameFilter, setNameFilter] = useState<string | null>(null);
//     const [statusFilter, setStatusFilter] = useState<string | null>(null);
//     const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
//     const [genderFilter, setGenderFilter] = useState<string | null>(null);
//     const [typeFilter, setTypeFilter] = useState<string | null>(null);

//     const characterData = {
//         nameFilter,
//         statusFilter,
//         speciesFilter,
//         genderFilter,
//         typeFilter,
//         setNameFilter,
//         setStatusFilter,
//         setSpeciesFilter,
//         setGenderFilter,
//         setTypeFilter
//     };

//     // return (
//     //     <CharacterDataContext.Provider value={characterData}>
//     //         {children}
//     //     </CharacterDataContext.Provider>
//     // );
// }

// //sredi ovo naknadno
// export function useCharacterDataContext() {
//     const character = useContext(CharacterDataContext);

//     if (character === null) {
//         throw new Error('useCharacterDataContext must be used with a CharacterDataContext');
//     }

//     return character;
// }
