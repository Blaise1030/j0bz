import { Text, Box, HStack, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const JobApplicantsDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicantData = location?.state?.applicantData;

  useEffect(() => {
    if (!applicantData) navigate("/");
  }, [location, applicantData, navigate]);
  return (
    <Box
      borderColor={"gray.200"}
      overflowY={"auto"}
      borderRadius={5}
      borderWidth={"1px"}
      height={"100%"}
      width={"100%"}
      padding={8}
    >
      <UserInformationSection
        personalInformation={applicantData.personalInformation}
      />
      <br />
      <Text fontSize={20} fontWeight={"500"} textColor={"teal"} pt={2}>
        Work Experience
      </Text>
      {applicantData?.workExperience.map((work: any) => (
        <WorkExperienceCard key={work.id} work={work} />
      ))}

      <br />

      <Text fontSize={20} fontWeight={"500"} textColor={"teal"}>
        Education Experience
      </Text>

      {applicantData.educationExperience.map((education: any) => (
        <EducationCard key={education.id} education={education} />
      ))}
    </Box>
  );
};

const WorkExperienceCard = ({
  work: { companyName, jobTitle, industry, startDate, endDate, location },
}) => {
  return (
    <Grid
      shadow={"sm"}
      padding={"18px"}
      rounded={"5px"}
      display={"grid"}
      marginY={"10px"}
      borderWidth={"1px"}
      borderColor={"gray.300"}
      templateColumns="repeat(4, 1fr)"
    >
      {[
        { label: "Company Name", value: companyName },
        { label: "Job Title", value: jobTitle },
        { label: "Start Date", value: startDate },
        { label: "End Date", value: endDate },
        { label: "Industry", value: industry },
        { label: "Location", value: location },
      ].map(({ label, value }) => {
        return (
          <GridItem colSpan={2} paddingBottom={2}>
            <Text fontSize={"xs"} textColor={"gray.500"} paddingBottom={0}>
              {label}
            </Text>
            <Text fontSize={"md"} ml={0.5}>
              {value || "-"}
            </Text>
          </GridItem>
        );
      })}
    </Grid>
  );
};

const EducationCard = ({
  education: { location, university, startDate, course, endDate },
}: {
  education: any;
}) => {
  return (
    <Grid
      shadow={"sm"}
      padding={"18px"}
      rounded={"5px"}
      display={"grid"}
      marginY={"10px"}
      borderWidth={"1px"}
      borderColor={"gray.300"}
      templateColumns="repeat(4, 1fr)"
    >
      {[
        { label: "University", value: university },
        { label: "Location", value: location },
        { label: "Start Date", value: startDate },
        { label: "End Date", value: endDate },
        { label: "Course", value: course },
      ].map(({ label, value }) => {
        return (
          <GridItem colSpan={2} paddingBottom={2}>
            <Text fontSize={"xs"} textColor={"gray.500"} paddingBottom={0}>
              {label}
            </Text>
            <Text fontSize={"md"} ml={0.5}>
              {value || "-"}
            </Text>
          </GridItem>
        );
      })}
    </Grid>
  );
};

const UserInformationSection = ({ personalInformation }) => {
  const { email, phoneNumber, city, firstName, lastName } = personalInformation;
  let navigate = useNavigate();

  return (
    <Box>
      <HStack alignItems={"center"}>
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          cursor={"pointer"}
          marginTop={1}
          height={6}
          width={6}
        />
        <Text
          fontWeight={"bold"}
          textColor={"teal"}
          fontSize="30px"
          align={"start"}
          height={10}
          pb={3}
        >
          {firstName} {lastName}
        </Text>
      </HStack>

      <Grid templateColumns="repeat(4, 1fr)" marginTop={"10px"}>
        {[
          { label: "City", value: city },
          { label: "Email", value: email },
          { label: "Phone No", value: phoneNumber },
        ].map(({ label, value }) => {
          return (
            <GridItem key={label} colSpan={2}>
              <Text fontSize={"xs"} textColor={"gray.500"} paddingBottom={0}>
                {label}
              </Text>
              <Text fontSize={"md"} ml={0.5}>
                {value || "-"}
              </Text>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default JobApplicantsDetails;
