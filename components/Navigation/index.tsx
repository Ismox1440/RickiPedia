import { useRouter } from "next/navigation";
import ButtonBack from "./ButtonBack";
import ButtonHome from "./ButtonHome";

const Navigation = () => {
  const router = useRouter();
  return (
    <div className="absolute top-8 left-10 flex items-center justify-center gap-4">
      <ButtonBack router={router} />
      <ButtonHome router={router} />
    </div>
  );
};

export default Navigation;
