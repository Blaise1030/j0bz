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

// ----------------------------------------------------------------------------------------------------------------------

// Declare Work Experience type
export type WorkExperience = {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  industry: string;
};

const WorkExperienceForm = ({
  updateStore,
  value,
}: {
  updateStore: (a: WorkExperience) => void;
  value: WorkExperience;
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
      rounded={5}
      columns={6}
      spacing={6}
      p={3}
    >
      <TextInput
        onChange={(change) => updateField("jobTitle", change)}
        value={value.jobTitle}
        title={"Job Title"}
        type={"text"}
      />
      <TextInput
        onChange={(change) => updateField("companyName", change)}
        value={value.companyName}
        title={"Company Name"}
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
      <IndustryDropdown
        onSelect={(newIndustry: string) => updateField("industry", newIndustry)}
        value={value.industry}
      />
    </SimpleGrid>
  );
};

// Work Experience View Handler for its UI dat
const WorkExperienceView = ({
  experience,
  setExperience,
}: {
  experience: WorkExperience[];
  setExperience: (n: WorkExperience[]) => void;
}) => {
  // Event Handler that handles event when user adds an experience
  const onAddExperienceClick = () =>
    setExperience([
      {
        id: Date.now(),
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        industry: "",
      },
      ...experience,
    ]);

  // Event Handler that handles event to set the experience
  const onSetExperience = (newObject: WorkExperience) =>
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
          Work Experiences
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
        <WorkExperienceForm
          updateStore={onSetExperience}
          key={index}
          value={value}
        />
      ))}
    </VStack>
  );
};

// Industry Dropdown Function
const IndustryDropdown = ({
  onSelect,
  value,
}: {
  onSelect: (e: any) => void;
  value?: string;
}) => {
  // List of Industries (Hard Coded)
  const industries = [
    "Advertising & Marketing",
    "Aerospace",
    "Agriculture",
    "Computer & technology",
    "Construction",
    "Education",
    "Energy",
    "Entertainment",
    "Fashion",
    "Finance & economic",
    "Food & beverage",
    "Health",
    "Hospitality",
    "Manufacturing",
    "Media & News",
    "Mining",
    "Pharmaceutical",
    "Telecommunication",
    "Transportation",
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
        {"Industry"}
      </FormLabel>

      {/* Given name Input */}
      <Select
        value={value?.length === 0 ? industries[0] : value}
        onChange={(event) => onSelect(event.target.value)}
        placeholder="Select industry"
        name="industry"
        id="industry"
      >
        {industries.map((industry: string) => (
          <option key={industry}>{industry}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default WorkExperienceView;
