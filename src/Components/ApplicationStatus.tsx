import { Box, VStack, Text, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getApplicantApplications } from "../db/services";
import { v4 as uuidv4 } from "uuid";
import { getJobDescription } from "../db/services";
import ApplicationSteps from "./ApplicationSteps";
import logo from "../assets/kitten.gif";

export default function ApplicationStatus({ companyName }: any) {
  const [jobsAppliedTo, setJobsAppliedTo] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    let applicantID = localStorage.getItem("applicantID");
    if (!applicantID) {
      applicantID = uuidv4();
      localStorage.setItem("applicantID", applicantID);
    }
    async function getData() {
      const res = await getApplicantApplications(applicantID);
      setLoading(true);
      const jobs = await Promise.all(
        res.map(async ({ jobsRecruiter, applicationStatusID }) => {
          return {
            ...(await getJobDescription(jobsRecruiter)),
            applicationStatusID,
          };
        })
      );
      setJobsAppliedTo(jobs);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <Box w="100%" h="100%">
      {loading ? (
        <Center w="100%" h="100%">
          <Spinner size="xl" color="teal" thickness="2px" />
        </Center>
      ) : (
        <>
          {jobsAppliedTo?.length === 0 && (
            <Center w="100%" h="100%">
              <VStack>
                <img
                  style={{ borderRadius: "25px" }}
                  src={logo}
                  alt="loading..."
                />
                <Text fontWeight="700" pt={4}>
                  No Application Found
                </Text>
              </VStack>
            </Center>
          )}
          {jobsAppliedTo.map(
            ({
              companyName,
              jobDescription,
              jobTitle,
              applicationStatusID,
            }: any) => {
              const stages = [
                { statusID: 0, statusName: "Submitted", isCurrent: false },
                { statusID: 1, statusName: "Interview", isCurrent: false },
                { statusID: 2, statusName: "HR Interview", isCurrent: true },
                { statusID: 3, statusName: "Result", isCurrent: false },
              ].map((a) => ({
                ...a,
                isCurrent: a.statusID === applicationStatusID,
              }));
              return (
                <Box
                  key={companyName}
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
                      Application Status for {companyName}
                    </Text>
                    <ApplicationSteps datas={stages as any} />
                    <Text align="center" py={5}>
                      {jobTitle}
                    </Text>
                    <Text align="center">{jobDescription}</Text>
                    <Text color="teal.500" fontWeight="700" align="center">
                      Proudly powered by J0bz
                    </Text>
                  </VStack>
                </Box>
              );
            }
          )}
        </>
      )}
    </Box>
  );
}
