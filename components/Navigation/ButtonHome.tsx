import { Button } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";

const ButtonHome = ({router}: {router: any}) => {
  return (
    <Button onClick={() => router.push("/")} variant="default">
      <IconHome />
    </Button>
  );
};

export default ButtonHome;
