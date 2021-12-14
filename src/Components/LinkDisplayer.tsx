import { Box, VStack, Text, Button, HStack, Heading } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";

const LinkDisplayer = ({ generatedLink }) => {
  const { hasCopied: hasCopiedUser, onCopy: onCopyUser } = useClipboard(
    generatedLink?.userLink
  );
  const { hasCopied: hasCopiedRecruiter, onCopy: onCopyRecruiter } =
    useClipboard(generatedLink?.recruiterLink);

  return (
    <VStack borderColor={"gray.300"} borderWidth={1} padding={3} rounded={10}>
      <Box align="flex-start" justify="center" w="100%">
        <Heading fontSize="lg">User Link</Heading>
        <Text fontSize="xs" color={"gray.600"}>
          Copy this link and put it at your job listing
        </Text>
      </Box>
      <HStack>
        <Text
          borderColor={"gray.100"}
          borderWidth={1}
          fontSize={10}
          padding={1}
        >
          {generatedLink["userLink"]}
        </Text>
        <Button
          size="md"
          isDisabled={!Boolean(generatedLink)}
          onClick={onCopyUser}
        >
          {hasCopiedUser ? "Copied" : "Copy"}
        </Button>
      </HStack>
      <Box align="flex-start" justify="center" w="100%">
        <Heading fontSize="lg">Recruiter Link</Heading>
        <Text fontSize="xs" color={"gray.600"}>
          This is your secret link. Keep this link to yourself
        </Text>
      </Box>
      <HStack>
        <Text
          borderColor={"gray.100"}
          borderWidth={1}
          fontSize={10}
          padding={1}
        >
          {generatedLink["recruiterLink"]}
        </Text>
        <Button
          size="md"
          px={4}
          isDisabled={!Boolean(generatedLink)}
          onClick={onCopyRecruiter}
        >
          {hasCopiedRecruiter ? "Copied" : "Copy"}
        </Button>
      </HStack>
    </VStack>
  );
};

export default LinkDisplayer;
