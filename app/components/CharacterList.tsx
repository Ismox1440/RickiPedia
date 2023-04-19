import { Character } from "@/models/character";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ characters }: { characters: Character[] }) => {
  return (
    <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start justify-start">
      {characters.map((character: Character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
