import { useColorModeValue } from "@chakra-ui/color-mode";
import { SimpleGrid, GridItem } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Button,
  VStack,
  Select,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import TextInput from "./TextInput";

// Declare Work Experience type
export type EducationExperience = {
  id: number;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  course: string;
};

const EducationExperienceForm = ({
  updateStore,
  value,
}: {
  updateStore: (a: EducationExperience) => void;
  value: EducationExperience;
}) => {
  const updateField = (key: string, newValue: string) => {
    updateStore({ ...value, [key]: newValue });
  };

  return (
    <SimpleGrid
      borderWidth={0.5}
      borderColor={"#d0d0d0"}
      bg="white"
      shadow={"sm"}
      rounded={7}
      columns={6}
      spacing={6}
      p={3}
    >
      <TextInput
        onChange={(change) => updateField("field", change)}
        value={value.field}
        title={"Field of Study"}
        type={"text"}
      />
      <TextInput
        onChange={(change) => updateField("institution", change)}
        value={value.institution}
        title={"Institution"}
        type={"text"}
      />

      <TextInput
        onChange={(change) => updateField("startDate", change)}
        value={value.startDate}
        title={"Start date"}
        type={"date"}
      />
      <TextInput
        onChange={(change) => updateField("endDate", change)}
        value={value.endDate}
        title={"End date"}
        type={"date"}
      />
      <TextInput
        onChange={(change) => updateField("location", change)}
        value={value.location}
        title={"Location"}
        type={"text"}
      />
      <EducationDropdown
        onSelect={(newCourse: string) => updateField("course", newCourse)}
        value={value.course}
      />
    </SimpleGrid>
  );
};

// Work Experience View Handler for its UI dat
const EducationExperienceView = ({
  experience,
  setExperience,
}: {
  experience: EducationExperience[];
  setExperience: (n: EducationExperience[]) => void;
}) => {
  // Event Handler that handles event when user adds an experience
  const onAddExperienceClick = () =>
    setExperience([
      {
        id: Date.now(),
        field: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        course: "",
      },
      ...experience,
    ]);

  // Event Handler that handles event to set the experience
  const onSetExperience = (newObject: EducationExperience) =>
    setExperience(
      experience?.map((e) => (e.id === newObject.id ? newObject : e))
    );

  return (
    <VStack alignItems={"start"} justifyContent={"start"}>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingLeft={4}
        w="100%"
      >
        <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
          Education Experiences
        </Heading>
        <Button
          onClick={onAddExperienceClick}
          marginLeft={"auto"}
          padding={0}
          bg={"transparent"}
          rounded={"full"}
        >
          <SmallAddIcon w={8} h={8} />
        </Button>
      </HStack>

      {experience?.map((value, index) => (
        <EducationExperienceForm
          updateStore={onSetExperience}
          key={index}
          value={value}
        />
      ))}
    </VStack>
  );
};

// Education Dropdown Function
const EducationDropdown = ({
  onSelect,
  value,
}: {
  onSelect: (e: any) => void;
  value: string;
}) => {
  // List of Education levels (Hard Coded)
  const education = [
    "No formal education",
    "Primary education",
    "Secondary education",
    "GED",
    "Vocational qualification",
    "Bachelor's degree",
    "Master's degree",
    "Doctorate or higher",
  ];
  return (
    <FormControl as={GridItem} colSpan={[6, 3]}>
      {/* First Name Input */}
      <FormLabel
        htmlFor="first_name"
        fontSize="sm"
        fontWeight="md"
        color={useColorModeValue("gray.700", "gray.50")}
      >
        {"Education Level"}
      </FormLabel>

      {/* Given name Input */}
      <Select
        value={value?.length === 0 ? education[0] : value}
        onChange={(event) => onSelect(event.target.value)}
        field="Select Education Level"
        name="education"
        id="education"
      >
        {education.map((education: string) => (
          <option key={education}>{education}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default EducationExperienceView;
