import { Location } from "@/models/location";
import LocationCard from "./LocationCard";

const LocationList = ({ locations }: { locations: Location[] }) => {
  return (
    <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start justify-start">
      {locations.map((location: Location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};

export default LocationList;
