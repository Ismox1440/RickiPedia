import { Avatar, Text } from "@mantine/core";
import Link from "next/link";
import { Location } from "@/models/location";
import useSWR from "swr";
import { Character } from "@/models/character";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const LocationCard = ({ location }: { location: Location }) => {
  const { name, id, type, dimension } = location;
  const residentsId =
    location.residents.length > 0
      ? location.residents.slice(0, 3).map((c) => c.split("/").pop())
      : ["null"];
  const { data: characters } = useSWR(
    `https://rickandmortyapi.com/api/character/${residentsId}`,
    fetcher
  );

  return (
    <Link
      href={`/location/${id}`}
      className="max-w-md mx-auto mt-11 animate-slide-up"
    >
      <div className="p-[3px] border-2 border-transparent w-fit  rounded-md hover:border-lime-500 transition-all">
        <div className="relative flex items-center justify-center overflow-hidden rounded  w-[200px] h-[200px]">
          {characters?.length > 0 ? (
            <Avatar.Group spacing="sm">
              {characters.map((c: Character) => (
                <Avatar key={c.id} src={c.image} radius={"xl"} />
              ))}
              {location.residents.length > 3 && (
                <Avatar radius="xl">+{location.residents.length - 3}</Avatar>
              )}
            </Avatar.Group>
          ) : (
            characters &&
            !characters.hasOwnProperty("error") && (
              <Avatar src={characters.image} radius={"xl"} />
            )
          )}
        </div>
      </div>
      <div className="p-1">
        <Text className="mt-2">{name}</Text>
        <Text className="flex gap-2 items-center " fz="sm">
          {type} - {dimension}
        </Text>
      </div>
    </Link>
  );
};

export default LocationCard;
