"use client";
import Balancer from "react-wrap-balancer";
import { Button, Input, Pagination, Select, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingList from "../components/LoadingList";
import LocationList from "./components/LocationList";
import PagesButtons from "@/components/PagesButtons";
import useDebounce from "@/hooks/useDebounce";

const initialFilter = {
  type: "",
  dimension: "",
  page: 1,
  search: "",
};

const locationTypes: string[] = [
  "Planet",
  "Microverse",
  "Cluster",
  "Space station",
  "TV",
  "Resort",
  "Fantasy town",
  "Dream",
  "Dimension",
  "Menagerie",
  "Game",
  "Customs",
  "Daycare",
  "Dwarf planet (Celestial Dwarf)",
  "Miniverse",
  "Teenyverse",
  "Box",
  "Couch",
  "Diegesis",
  "Non-Diegetic Alternative Reality",
  "Dream Level",
  "Arcade",
  "unknown",
];

const dimensions: string[] = [
  "Replacement Dimension",
  "Cronenberg Dimension",
  "Post-Apocalyptic Dimension",
  "Fantasy Dimension",
  "Dimension 35-C",
  "Dimension C-137",
  "Dimension 304-X",
  "Dimension 9-2184",
  "Dimension K-22",
  "Dimension J-22",
  "Eric Stoltz Mask Dimension",
  "Dimension D-99",
  "Dimension D716",
  "Pizza Dimension",
  "Phone Dimension",
  "Chair Dimension",
  "Fascist Dimension",
  "Fascist Dystopian Dimension",
  "Wasp Dimension",
  "Tusk Dimension",
  "Magic Dimension",
  "Merged Dimension",
  "Morty's Story Dimension",
  "Giant Telepathic Spiders Dimension",
  "Microverse",
  "Teenage Simulation Dimension",
  "Noob Noob's Dimension",
  "Testicle Monster Dimension",
  "TINY RICKS DIMENSION",
  "Fascist Shrimp Dimension",
  "Purge Planet",
  "Giraffe Dimension",
  "Two Guys Dimension",
  "Pencilvester Dimension",
  "Cromulon Dimension",
  "Butter Robot Dimension",
  "Zigerion's Base Dimension",
  "Gromflom Prime",
  "Mr. Meeseeks Box Dimension",
  "Gazorpazorp",
  "Earth (304-X)",
  "Greasy Grandma World",
  "Glaagablaaga",
  "Hideout Planet",
  "Alien Day Spa Dimension",
  "Dorian 5",
  "Interdimensional Cable",
  "Jerryboree",
  "The Menagerie",
  "Girvonesk",
  "Plopstar",
  "Planet Squanch",
  "The Creepy Morty Dimension",
  "Wasp World",
  "Yarple-2",
  "Gazorpazorpfield Dimension",
  "Roy: A Life Well Lived",
  "Gazorpazorpazorp",
  "Bird World",
  "Birdperson's World",
  "Nuptia 4",
  "Toxic Rick's Planet",
  "Hamster in Butt World",
  "Cronenberged Dimension",
  "The Mastermind's Reality",
  "Tusk World",
  "Globafin",
  "Immortality Field Resort",
  "Snuffles' Dream",
  "Merged Universe",
  "Wasteland",
  "Venzenulon 7",
  "Greasy Grandpa World",
  "Larva Alien Planet",
  "Neutrino Bomb Universe",
  "Simulation",
  "Bepis-5",
  "Gazorpazorpfield",
  "Mortytown",
  "Mortytown Loco",
  "Z-292",
  "Nuptia",
  "Post-Apocalyptic Earth",
  "Froopyland",
  "Story Train",
  "Planetina's Planet",
  "Dr. Wong's Reality",
  "Forbodulon Prime",
  "Froopy World",
  "Fascist Dystopian Universe",
  "Shmooglite Runner Prime",
  "Krootabulon",
  "Storylord World",
  "Cromulon Universe",
  "Evil Rick's Target Dimension",
  "Girvonesk 7",
  "Shrimp Universe",
  "Jerryboree",
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function Home() {
  const [filterState, setFilterState] = useState(initialFilter);
  const [totalPage, setTotalPage] = useState(0);
  const debounceSearch = useDebounce(filterState.search);

  const { data: location, isLoading } = useSWR(
    `https://rickandmortyapi.com/api/location/?name=${debounceSearch}&type=${filterState.type}&dimension=${filterState.dimension}&page=${filterState.page}`,
    fetcher
  );

  const handleChange = (value: string | number, filter: string, page = 1) =>
    setFilterState({ ...filterState, [filter]: value, page });

  const handleReset = () => setFilterState(initialFilter);

  useEffect(() => {
    if (location?.info?.pages) {
      setTotalPage(location.info.pages);
    }
  }, [location]);

  return (
    <main className="dark">
      <div className="animate-slide-up">
        <h1 className="pt-2 gradient-heading mt-28 font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-300 text-center text-5xl leading-[48px] tracking-[-0.6px] sm:text-6xl sm:leading-[64px]">
          <Balancer>Rick And Morty</Balancer>
        </h1>
        <PagesButtons />
        <Input
          className="max-w-sm mx-auto mt-11"
          icon={<IconSearch />}
          placeholder="Search location"
          radius="md"
          value={filterState.search}
          onChange={(event) => handleChange(event.target.value, "search")}
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
          <Select
            placeholder="Type"
            data={locationTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            searchable
            value={filterState.type}
            onChange={(e: string) => handleChange(e, "type")}
          />
          <Select
            placeholder="Dimension"
            data={dimensions.map((dimension) => ({
              value: dimension,
              label: dimension,
            }))}
            value={filterState.dimension}
            searchable
            onChange={(e: string) => handleChange(e, "dimension")}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button className="mt-6" variant="default" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="flex items-center justify-center">
          <Pagination
            className="mx-auto mt-11"
            value={filterState.page}
            total={totalPage}
            onChange={(page) => handleChange(page, "page", page)}
            disabled={isLoading}
          />
        </div>

        {location?.results?.length > 0 ? (
          <LocationList locations={location.results} />
        ) : isLoading ? (
          <LoadingList />
        ) : (
          <Text className="text-center mt-40 text-lg mx-auto">
            No locations
          </Text>
        )}
      </div>
    </main>
  );
}
