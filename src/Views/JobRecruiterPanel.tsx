import {
  Text,
  Box,
  VStack,
  HStack,
  Button,
  useClipboard,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllJobApplicants, getJobDescription, hash } from "../db/services";
import ApplicationSteps from "../Components/ApplicationSteps";

const JobRecruiterPanel = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [applicant, setApplicants] = useState();
  const [applicationData, setApplicationData] = useState();
  const { hasCopied: hasCopiedUserLink, onCopy: onCopyRecruiter } =
    useClipboard((applicationData as any)?.userLink);

  useEffect(() => {
    const arrVars = id.split("-");
    const sct = arrVars.pop();
    const u = arrVars.join("-");
    const psd = hash(`${u}${sct}`);

    const getAllAppliantsData = async () => {
      try {
        const response = await getAllJobApplicants(psd);
        const applicationInformation = await getJobDescription(psd);
        setApplicationData(applicationInformation as any);
        setApplicants(response as any);
      } catch (e) {
        navigate("/", { replace: true });
      }
    };
    getAllAppliantsData();
  }, [id, navigate]);

  return (
    <Box
      borderColor={"gray.200"}
      overflowY={"auto"}
      borderRadius={5}
      borderWidth={1}
      height={"100%"}
      width={"100%"}
      padding={8}
    >
      {!applicationData || !applicant ? (
        <Center w="100%" h="100%">
          <Spinner size="xl" color="teal" thickness="2px" />
        </Center>
      ) : (
        <VStack alignItems={"start"}>
          <Text fontSize="30px" fontWeight={"bold"}>
            {(applicationData as any)?.jobTitle}
          </Text>
          <Text fontSize="20px">{(applicationData as any)?.companyName}</Text>
          <Text color={"gray.500"} maxHeight={"180px"} overflowY={"auto"}>
            {(applicationData as any)?.jobDescription}
          </Text>
          <HStack
            justifyContent="space-between"
            marginBottom={"20px"}
            width={"100%"}
          >
            <Text fontSize="20px" textColor={"teal"} fontWeight={"600"}>
              Applicants
            </Text>

            <Button size="md" px={4} onClick={onCopyRecruiter} variant="ghost">
              {hasCopiedUserLink
                ? "Copied Applicant Link!"
                : "Copy Applicant Link"}
            </Button>
          </HStack>

          {(applicant as []).map((applicantData: any, index: number) => (
            <ApplicantCard applicantData={applicantData} key={index} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

const ApplicantCard = ({ applicantData }) => {
  let navigate = useNavigate();
  const stages = [
    { statusID: 0, statusName: "Submitted", isCurrent: false },
    { statusID: 1, statusName: "Interview", isCurrent: false },
    { statusID: 2, statusName: "HR Interview", isCurrent: true },
    { statusID: 3, statusName: "Result", isCurrent: false },
  ].map((a) => ({
    ...a,
    isCurrent: (applicantData?.applicationStateID || 0) === a.statusID,
  }));

  return (
    <Box
      borderRadius={10}
      borderWidth={1}
      width={"100%"}
      padding={4}
      marginY={3}
      onClick={() =>
        navigate("/applicant-info", {
          state: {
            applicantData,
          },
        })
      }
    >
      <Text fontWeight={"bold"} align={"center"} height={10} pb={1}>
        {(applicantData as any)?.personalInformation?.firstName}{" "}
        {(applicantData as any)?.personalInformation?.lastName}
      </Text>
      <ApplicationSteps datas={stages as any} />
    </Box>
  );
};

export default JobRecruiterPanel;
