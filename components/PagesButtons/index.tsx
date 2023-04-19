import Link from "next/link";
import { usePathname } from "next/navigation";

const PagesButtons = () => {
  const path = usePathname();
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Link
        className={path === "/" ? "text-orange-600" : "hover:text-orange-600 "}
        href={"/"}
      >
        Characters
      </Link>
      <Link
        className={
          path === "/location" ? "text-orange-600" : "hover:text-orange-600 "
        }
        href={"/location"}
      >
        Locations
      </Link>
    </div>
  );
};

export default PagesButtons;
