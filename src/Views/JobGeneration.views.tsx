import { useState } from "react";
import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react";
import TextInput from "../Components/TextInput";
import { generateUniqueLink } from "../db/services";
import LinkDisplayer from "../Components/LinkDisplayer";

const JobGeneration = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedLink, setGeneratedLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const onGenerateUniqueLink = async () => {
    setLoading(true);
    const generatedLinkRes = await generateUniqueLink(
      {
        companyName,
        jobTitle,
        jobDescription,
      },
      Date.now()
    );
    setGeneratedLink(generatedLinkRes as any);
    setLoading(false);
  };

  return (
    <Box overflowY={"auto"} w="100%" h="100%" rounded={10} padding={2}>
      <VStack>
        <Text
          fontWeight={"bold"}
          textAlign={"center"}
          width={"100%"}
          paddingY={3}
        >
          Create your Jobz Recruitement Link
        </Text>
        <TextInput
          disable={Boolean(generatedLink)}
          onChange={setCompanyName}
          title={"Company Name"}
          value={companyName}
          type={"text"}
        />
        <TextInput
          disable={Boolean(generatedLink)}
          onChange={setJobTitle}
          title={"Job Title"}
          type={"text"}
          value={jobTitle}
        />
        <TextInput
          disable={Boolean(generatedLink)}
          onChange={setJobDescription}
          title={"Job Description"}
          value={jobDescription}
          type={"text"}
        />
        <HStack width={"100%"} alignItems={"start"} justifyContent={"start"}>
          <Button
            disabled={Boolean(generatedLink)}
            onClick={onGenerateUniqueLink}
            colorScheme="teal"
            marginRight={"auto"}
            marginTop={3}
            isLoading={loading}
          >
            Generate Link
          </Button>
        </HStack>
      </VStack>
      <br />
      {generatedLink && <LinkDisplayer generatedLink={generatedLink} />}
    </Box>
  );
};

export default JobGeneration;
