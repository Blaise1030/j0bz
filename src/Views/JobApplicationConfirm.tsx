import {
  CheckIcon,
  WarningIcon,
  InfoOutlineIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Box,
  VStack,
  HStack,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { addProfileToUniqueLink, getJobDescription } from "../db/services";
import { useParams } from "react-router-dom";

const JobApplicationConfirm = () => {
  const [confirm, setConfirm] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState<any>({});
  const { id } = useParams();
  const psd = id.split("-").pop();

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const result = await getJobDescription(psd);
        setJobData(result as any);
      } catch (error) {
        setConfirm(3);
      }
    };

    checkDatabase();
  }, [psd]);

  const onConfirm = async () => {
    setLoading(true);
    let userData = {};
    ["personalInformation", "workExperience", "educationExperience"].forEach(
      (category) => {
        const localStored = localStorage.getItem(category);
        if (localStored != null) {
          userData[category] = JSON.parse(localStored);
        } else {
          userData[category] = {};
        }
      }
    );
    await addProfileToUniqueLink(userData, psd);
    setLoading(false);
    setConfirm(2);
  };

  return (
    <Box width={"100%"} height={"100%"} bg={"white"}>
      {confirm !== 3 && Object.keys(jobData).length === 0 ? (
        <Center w="100%" h="100%">
          <Spinner size="xl" color="teal" thickness="2px" />
        </Center>
      ) : (
        <VStack justifyContent="center" alignItems="center" h="100%">
          {confirm === 0 && <InfoOutlineIcon w={32} h={32} color="blue.500" />}
          {confirm === 1 && <WarningIcon w={32} h={32} color="red.500" />}
          {confirm === 2 && <CheckIcon w={32} h={32} color="green.500" />}
          {confirm === 3 && <NotAllowedIcon w={32} h={32} color="red.500" />}
          <Text fontSize="xl" color="gray.500" align="center" p="5">
            {confirm === 0 &&
              `Are you sure you want to send your appliction data to ${jobData?.companyName} ?`}
            {confirm === 1 && `Application canceled`}
            {confirm === 2 &&
              `Application successfully sent to ${jobData?.companyName} `}
            {confirm === 3 && `No Job Applicable !`}
          </Text>
          <HStack spacing={4} w="100%" justifyContent="center" height={10}>
            {confirm === 0 && (
              <>
                <Button
                  onClick={onConfirm}
                  isLoading={loading}
                  colorScheme="teal"
                  variant="outline"
                  size="lg"
                  w={"40%"}
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => setConfirm(1)}
                  colorScheme="red"
                  size="lg"
                  w={"40%"}
                >
                  Cancel
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default JobApplicationConfirm;
