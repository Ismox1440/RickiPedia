import { Skeleton } from "@mantine/core";

const LoadingCard = () => {
  return (
    <div className="max-w-md mx-auto mt-11">
      <Skeleton width={200} height={200} mb="xl" />

      <div className="p-1">
        <Skeleton height={8} width="70%" radius="xl" />
      </div>
    </div>
  );
};

export default LoadingCard;
