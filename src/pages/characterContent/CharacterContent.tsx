import CharacterList from "../../components/CharacterList/CharacterList";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";

const CharacterContent = () => {

  return (
    <>
      {/* proveri da li si u Header i u CharacterList fajlu sve prosledila kako treba da bi ti proradio searchbar 
      + mozda sredi da ti se i za Header prenose podaci putem useContext (svakako je i Header, tj. cela app wrappovana sa CharacterDataContext)
      * mozda ne radi searchBar jer se u CharacterDataContext nigde ne koristi setSearchFilter 
      + mozda bi trebalo odavde da izbacis useState za to i iz Header komponente da izbacis props za to*/}
      {/* <Header setSearchFilter={setSearchFilter} /> */}
      <Header />
      <Filters />
      <CharacterList />
    </>
  );
};

export default CharacterContent;
