"use client";
import { Text } from "@mantine/core";
import useSWR from "swr";
import { useEffect, useState } from "react";
import CharacterList from "@/app/components/CharacterList";
import LoadingList from "@/app/components/LoadingList";
import CharacterCard from "@/app/components/CharacterCard";
import { Navigation } from "@/components";

interface IProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: IProps) => {
  const { id } = params;
  const [residentsId, setResidentsId] = useState(["null"]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: location } = useSWR(
    `https://rickandmortyapi.com/api/location/${id}`,
    fetcher
  );

  const { data: characters, isLoading } = useSWR(
    `https://rickandmortyapi.com/api/character/${residentsId}`,
    fetcher
  );

  useEffect(() => {
    if (location?.residents) {
      setResidentsId(
        location.residents.length > 0
          ? location.residents.map((c: string) => c.split("/").pop())
          : ["null"]
      );
    }
  }, [location]);

  if (!location) return;

  const { name, type, dimension, created } = location;

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="px-4 sm:px-6 lg:px-8 pb-16 pt-20">
        <div className="max-w-[80%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Text weight={700} className=" text-3xl">
                {name}
              </Text>
              <div className="flex flex-col sm:flex-row gap-11 my-11">
                <div className="flex flex-col">
                  <Text size="sm" className="mb-1">
                    Type
                  </Text>
                  <Text>{type}</Text>
                </div>
                <div className="flex flex-col">
                  <Text size="sm" className="mb-1">
                    Dimension
                  </Text>
                  <Text>{dimension}</Text>
                </div>
              </div>
              <div className="flex flex-col mb-8">
                <Text size="sm" className="mb-1">
                  Created
                </Text>
                <Text>{created}</Text>
              </div>
            </div>
          </div>

          <Text size="lg" className="mt-11">
            Residents - {characters?.length}
          </Text>
        </div>

        {characters?.length > 0 ? (
          <CharacterList characters={characters} />
        ) : isLoading ? (
          <LoadingList />
        ) : characters && !characters.hasOwnProperty("error") ? (
          <div className="max-w-[80%] mx-auto">
            <CharacterCard character={characters} />
          </div>
        ) : (
          <Text className="text-center mt-40 text-lg mx-auto">
            No characters
          </Text>
        )}
      </div>
    </div>
  );
};

export default Page;
