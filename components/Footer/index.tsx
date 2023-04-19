import { Text } from "@mantine/core";
const Footer = () => {
  return (
    <div className="w-full h-16 mt-11 flex justify-center items-center">
      <Text>
        Desarrollado por{" "}
        <a
          href="http://saragusti.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500"
        >
           saragusti.dev 💻
        </a>
      </Text>
    </div>
  );
};

export default Footer;
