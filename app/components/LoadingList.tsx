import LoadingCard from "./LoadingCard";

const LoadingList = () => {
  const items = new Array(20).fill("loading");
  return (
    <div className="w-[80%] mx-auto grid grid-cols-5 items-start justify-start">
      {items.map((e) => (
        <LoadingCard key={e} />
      ))}
    </div>
  );
};

export default LoadingList;
