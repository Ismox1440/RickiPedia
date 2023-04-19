const StatusColor = {
  Alive: "bg-lime-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-500",
};

type Status = "Alive" | "Dead" | "unknown";

const StatusPoint = ({ status }: { status: Status }) => {
  return (
    <span
      className={`block w-[0.5rem] h-[0.5rem] bg-lime-500 rounded-full ${StatusColor[status]}`}
    ></span>
  );
};

export default StatusPoint;
