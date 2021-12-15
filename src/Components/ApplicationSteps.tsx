import { Box, HStack, Badge } from "@chakra-ui/react";

const ApplicationSteps = ({ datas }) => {
  return (
    <HStack width={"100%"} justifyContent={"space-between"}>
      {datas.map(({ statusID, statusName, isCurrent }, index) => (
        <HStack key={statusID}>
          <Badge
            fontSize="11px"
            align="center"
            borderRadius={8}
            colorScheme={isCurrent ? "teal" : "gray"}
            p={2}
          >
            {statusName}
          </Badge>
          {index < datas.length - 1 && (
            <Box bg="teal" width={2} height={2} borderRadius={8} />
          )}
        </HStack>
      ))}
    </HStack>
  );
};

export default ApplicationSteps;
