"use client";
import Image from "next/image";
import { Text } from "@mantine/core";
import useSWR from "swr";
import StatusPoint from "@/app/components/StatusPoint";
import Link from "next/link";
import { Navigation } from "@/components";

interface IProps {
  params: {
    id: string;
  };
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Page = ({ params }: IProps) => {
  const { id } = params;
  const { data: character } = useSWR(
    `https://rickandmortyapi.com/api/character/${id}`,
    fetcher
  );

  if (!character) return;
  const { name, image, species, status, origin, location, gender, episode } =
    character;

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="rounded-lg shadow-md mx-auto"
          />

          <div>
            <Text size="lg" weight={700} className="mb-2">
              {name}
            </Text>
            <Text className="flex gap-2 items-center mb-2" fz="sm">
              <StatusPoint status={status} /> {status} - {species}
            </Text>
            <div className="flex flex-col mb-8">
              <Text size="sm" className="mb-1">
                Gender
              </Text>
              <Text>{gender}</Text>
            </div>
            <div className="flex flex-col mb-8">
              <Text size="sm" className="mb-1">
                Origin
              </Text>
              {origin.url ? (
                <Link href={`/location/${origin.url.split("/").pop()}`}>
                  <Text className="hover:text-orange-500">{origin.name}</Text>
                </Link>
              ) : (
                <Text>{origin.name}</Text>
              )}
            </div>
            <div className="flex flex-col mb-8">
              <Text size="sm" className="mb-1">
                Last known location
              </Text>
              {location.url ? (
                <Link href={`/location/${location.url.split("/").pop()}`}>
                  <Text className="hover:text-orange-500">{location.name}</Text>
                </Link>
              ) : (
                <Text>{location.name}</Text>
              )}
            </div>
          </div>
        </div>

        <Text size="lg" weight={700} className="mt-11 mb-4">
          Episodes
        </Text>

        <ul className="flex flex-wrap gap-4">
          {episode.map((ep: string) => (
            <div
              key={ep}
              className="border border-gray-500 rounded w-[100px] py-1  text-center flex items-center justify-center"
            >
              <Text size="lg" className="text-gray-200 text-center">
                {ep.split("/").pop()}
              </Text>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
