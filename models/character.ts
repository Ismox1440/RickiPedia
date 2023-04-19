import { Location } from "./location";

export interface Character {
  id: number;
  name: string;
  status: status;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
  name: string;
  url: string;
}

type status = "Alive" | "Dead" | "unknown"
