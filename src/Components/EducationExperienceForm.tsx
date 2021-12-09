import { useColorModeValue } from "@chakra-ui/color-mode";
import { SimpleGrid, GridItem, Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  HStack,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SmallAddIcon, ChevronDownIcon } from "@chakra-ui/icons";

// ----------------------------------------------------------------------------------------------------------------------

// Declare Work Experience type
export type EducationExperience = {
  id: number;
  placeholder: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  course: string;
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
      bg="white"
      shadow={"sm"}
      rounded={5}
      columns={6}
      spacing={6}
      p={3}
    >
      <TextInput
        onChange={(change) => updateField("placeholder", change)}
        value={value.placeholder}
        title={"Placeholder"}
        type={"text"}
      />
      <TextInput
        onChange={(change) => updateField("university", change)}
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
        placeholder: "",
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
    // Returns a list of education
    // <Select
    //   name="education"
    //   id="education"
    //   placeholder="Select education"
    //   onChange={(event) => onSelect(event.target.value)}
    //   value={value.length === 0 ? education[0] : value}
    // >
    //   {education.map((education: string) => (
    //     <option key={education}>{education}</option>
    //   ))}
    // </Select>
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
        placeholder="Select Education Level"
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
