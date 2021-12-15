import { Box, VStack, Text, HStack, Badge } from "@chakra-ui/react";

export default function ApplicationStatus({ companyName }: any) {
  const stages = ["Submitted", "Interview", "HR Interview", "Result"];
  const mockCompany = ["Alpine Media", "Google", "Microsoft"];
  return (
    <>
      {companyName && (
        <Box
          style={{ border: "0.5px solid #d0d0d0" }}
          rounded={"10"}
          shadow={"md"}
          width={"98%"}
          borderWidth={0.5}
          p={3}
          mb={2}
        >
          <VStack
            w="100%"
            h="100%"
            alignItems={"center"}
            marginLeft={companyName ? -1 : -2}
          >
            <Text
              textAlign={"center"}
              fontWeight={"600"}
              color="gray.500"
              fontSize="xl"
              p={3}
            >
              Application Status for {companyName}
            </Text>
            <HStack width={"100%"} px={1} justifyContent={"space-between"}>
              {stages.map((stage, index) => (
                <HStack key={stage}>
                  <Badge
                    fontSize="sm"
                    align="center"
                    borderRadius={8}
                    colorScheme={index === 0 ? "teal" : "gray"}
                    p={2}
                  >
                    {stage}
                  </Badge>
                  {index !== stages.length - 1 && (
                    <Box bg="teal" width={2} height={2} borderRadius={8} />
                  )}
                </HStack>
              ))}
            </HStack>
            <Text align="center" py={7}>
              Welcome to {companyName}, we will reply you shortly, all the best
              for your application.
            </Text>
            <Text color="teal.500" fontWeight="700" align="center">
              Proudly powered by J0bz
            </Text>
          </VStack>
        </Box>
      )}
      {mockCompany.map((company) => (
        <Box
          key={company}
          style={{ border: "0.5px solid #d0d0d0" }}
          rounded={"10"}
          shadow={"md"}
          width={"98%"}
          p={3}
          mb={2}
        >
          <VStack
            w="100%"
            h="100%"
            alignItems={"center"}
            marginLeft={companyName ? -1 : -2}
          >
            <Text
              textAlign={"center"}
              fontWeight={"600"}
              color="gray.500"
              fontSize="xl"
              p={3}
            >
              Application Status for {company}
            </Text>
            <HStack width={"100%"} px={1} justifyContent={"space-between"}>
              {stages.map((stage, index) => (
                <HStack key={stage}>
                  <Badge
                    fontSize={companyName ? "sm" : "xs"}
                    align="center"
                    borderRadius={8}
                    colorScheme={index === 0 ? "teal" : "gray"}
                    p={2}
                  >
                    {stage}
                  </Badge>
                  {index !== stages.length - 1 && (
                    <Box bg="teal" width={2} height={2} borderRadius={8} />
                  )}
                </HStack>
              ))}
            </HStack>
            <Text align="center" py={7}>
              {company} is the worlds leading media company that impacts the
              world we will contact you shortly.
            </Text>
            <Text color="teal.500" fontWeight="700" align="center">
              Proudly powered by J0bz
            </Text>
          </VStack>
        </Box>
      ))}
    </>
  );
}
