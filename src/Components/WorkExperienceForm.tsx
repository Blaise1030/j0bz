import { useColorModeValue } from "@chakra-ui/color-mode";
import { SimpleGrid, GridItem, Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SmallAddIcon, ChevronDownIcon } from "@chakra-ui/icons";

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

// Form UI which includes all text based input components
const TextInput = ({
  title,
  type,
  value,
  onChange,
}: {
  onChange: (a: string) => void;
  title: string;
  type: string;
  value: string;
}) => {
  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        {/* First Name Input */}
        <FormLabel
          htmlFor="first_name"
          fontSize="sm"
          fontWeight="md"
          color={useColorModeValue("gray.700", "gray.50")}
        >
          {title}
        </FormLabel>

        {/* Given name Input */}
        <Input
          onChange={(e) => {
            console.log(e);
            onChange(e.target.value);
          }}
          value={value}
          type={type}
          autoComplete="given-name"
          mt={1}
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
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
    <SimpleGrid columns={6} spacing={6} p={3}>
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
        onChange={(change) => updateField("location", change)}
        value={value.location}
        title={"Location"}
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
  console.log("now", experience);
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
      <Button onClick={onAddExperienceClick}>
        <SmallAddIcon w={30} h={30} /> <span>Add New Experience</span>
      </Button>
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
    // Returns a list of industries
    <Select
      as={GridItem}
      colSpan={[6, 3]}
      name="industry"
      id="industry"
      placeholder="Select industry"
      onChange={(event) => {
        console.log(event.target.value);
        onSelect(event.target.value);
      }}
      value={value?.length === 0 ? industries[0] : value}
    >
      {industries.map((industry: string) => (
        <option key={industry}>{industry}</option>
      ))}
    </Select>
  );
};

// Education Dropdown Function
const EducationDropDown = ({
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
    // Returns a list of education
    <Select
      name="education"
      id="education"
      placeholder="Select education"
      onChange={(event) => onSelect(event.target.value)}
      value={value.length === 0 ? education[0] : value}
    >
      {education.map((education: string) => (
        <option key={education}>{education}</option>
      ))}
    </Select>
  );
};

export default WorkExperienceView;
