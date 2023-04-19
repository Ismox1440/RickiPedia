import { Character } from "@/models/character";
import Image from "next/image";
import { Text } from "@mantine/core";
import Link from "next/link";
import StatusPoint from "./StatusPoint";

const CharacterCard = ({ character }: { character: Character }) => {
  const { image, name, status, species, id } = character;
  return (
    <Link href={`/character/${id}`} className="max-w-md mx-auto mt-11 animate-slide-up">
      <div className="p-[3px] border-2 border-transparent w-fit  rounded-md hover:border-lime-500 transition-all">
        <div className="relative overflow-hidden rounded w-[200px] h-[200px]">
          <Image
            className="object-cover object-center transition-all duration-200 ease-out rounded hover:scale-105"
            src={image}
            alt={name}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="p-1">
        <Text className="mt-2">{name}</Text>
        <Text className="flex gap-2 items-center "  fz="sm">
          <StatusPoint status={status} /> {status} - {species}
        </Text>
      </div>
    </Link>
  );
};

export default CharacterCard;
