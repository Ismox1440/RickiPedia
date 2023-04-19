"use client";
import Balancer from "react-wrap-balancer";
import { Button, Input, Pagination, Select, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CharacterList from "./components/CharacterList";
import LoadingList from "./components/LoadingList";
import PagesButtons from "@/components/PagesButtons";
import useDebounce from "@/hooks/useDebounce";

const initialFilter = {
  status: "",
  species: "",
  gender: "",
  page: 1,
  search: "",
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const [filterState, setFilterState] = useState(initialFilter);
  const [totalPage, setTotalPage] = useState(0);
  const debounceSearch = useDebounce(filterState.search);

  const { data: characters, isLoading } = useSWR(
    `https://rickandmortyapi.com/api/character/?name=${debounceSearch}&status=${filterState.status}&species=${filterState.species}&gender=${filterState.gender}&page=${filterState.page}`,
    fetcher
  );

  const handleChange = (value: string | number, filter: string, page = 1) =>
    setFilterState({ ...filterState, [filter]: value, page });

  const handleReset = () => setFilterState(initialFilter);

  useEffect(() => {
    if (characters?.info?.pages) {
      setTotalPage(characters.info.pages);
    }
  }, [characters]);

  return (
    <main className="dark">
      <div className="animate-slide-up">
        <h1 className="py-2 gradient-heading mt-28 font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-300 text-center text-5xl leading-[48px] tracking-[-0.6px] sm:text-6xl sm:leading-[64px]">
          <Balancer>Rick And Morty</Balancer>
        </h1>
        <PagesButtons />
        <Input
          className="max-w-sm mx-auto mt-11"
          icon={<IconSearch />}
          placeholder="Search character"
          radius="md"
          onChange={(event) => handleChange(event.target.value, "search")}
          value={filterState.search}
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-2">
          <Select
            className="max-w-sm"
            placeholder="Status"
            value={filterState.status}
            onChange={(e: string) => handleChange(e, "status")}
            data={["Alive", "Dead", "Unknown"]}
          />
          <Select
            placeholder="Species"
            value={filterState.species}
            onChange={(e: string) => handleChange(e, "species")}
            data={["Human", "Alien", "Robot", "Mythological Creature"]}
          />
          <Select
            placeholder="Gender"
            value={filterState.gender}
            onChange={(e: string) => handleChange(e, "gender")}
            data={["Male", "Female", "Genderless", "Unknown"]}
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
            onChange={(pageNum) => handleChange(pageNum, "page", pageNum)}
            disabled={isLoading}
          />
        </div>

        {characters?.results?.length > 0 ? (
          <CharacterList characters={characters.results} />
        ) : isLoading ? (
          <LoadingList />
        ) : (
          <Text className="text-center mt-40 text-lg mx-auto">
            No characters
          </Text>
        )}
      </div>
    </main>
  );
}
