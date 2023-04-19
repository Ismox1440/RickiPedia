import { Button } from "@mantine/core";

const ButtonBack = ({router}: {router: any}) => {
  return (
    <Button onClick={router.back} variant="default">
      Back
    </Button>
  );
};

export default ButtonBack;
