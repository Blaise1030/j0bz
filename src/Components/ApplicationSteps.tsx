import { Box, HStack, Badge, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ApplicationSteps = ({ datas }) => {
  let [DisplayComponent, setDisplayComponent] = useState(
    window.innerWidth <= 750 ? VStack : (HStack as any)
  );

  useEffect(() => {
    window.addEventListener("resize", function (_) {
      window.innerWidth <= 750
        ? setDisplayComponent(VStack)
        : setDisplayComponent(HStack);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <DisplayComponent
      justifyContent={"space-between"}
      width={"100%"}
      mr={"1px"}
    >
      {datas.map(({ statusID, statusName, isCurrent }, index) => (
        <DisplayComponent key={statusID}>
          <Badge
            width={["100px", "100%"]}
            align="center"
            borderRadius={8}
            colorScheme={isCurrent ? "teal" : "gray"}
            p={[1, 2]}
          >
            {statusName}
          </Badge>
          {index < datas.length - 1 && (
            <Box bg="teal" width={2} height={2} borderRadius={8} />
          )}
        </DisplayComponent>
      ))}
    </DisplayComponent>
  );
};

export default ApplicationSteps;
