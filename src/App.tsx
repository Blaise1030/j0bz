import React from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import {
  Box,
  ChakraProvider,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Text,
  chakra,
  Flex,
  Icon,
  VisuallyHidden,
  IconButton,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import WorkExperienceForm from "./Components/WorkExperienceForm";

function App() {
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    // run on every 1 s
    setInterval(() => {
      chrome.tabs &&
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type: "GET_DOM" } as DOMMessage,
              (response: DOMMessageResponse) => {
                setHeadlines(response.headlines);
              }
            );
          }
        );
    }, 1000);
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <Box px={4} rounded={10}>
          <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
            Personal Information
          </Heading>
          <Text
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Use a permanent address where you can receive mail.
          </Text>
        </Box>

        <Stack
          px={4}
          py={5}
          p={[null, 6]}
          bg={useColorModeValue("white", "gray.700")}
          spacing={6}
        >
          <SimpleGrid columns={6} spacing={6}>
            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="first_name"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                First name
              </FormLabel>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                autoComplete="given-name"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="last_name"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Last name
              </FormLabel>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="email_address"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Email address
              </FormLabel>
              <Input
                type="text"
                name="email_address"
                id="email_address"
                autoComplete="email"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="phone_number"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Phone Number
              </FormLabel>
              <Input
                type="text"
                name="phone_number"
                id="phone_number"
                autoComplete="phone no."
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={6}>
              <FormLabel
                htmlFor="street_address"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                Street address
              </FormLabel>
              <Input
                type="text"
                name="street_address"
                id="street_address"
                autoComplete="street-address"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
              <FormLabel
                htmlFor="city"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                City
              </FormLabel>
              <Input
                type="text"
                name="city"
                id="city"
                autoComplete="city"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
              <FormLabel
                htmlFor="state"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                State / Province
              </FormLabel>
              <Input
                type="text"
                name="state"
                id="state"
                autoComplete="state"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
              <FormLabel
                htmlFor="postal_code"
                fontSize="sm"
                fontWeight="md"
                color={useColorModeValue("gray.700", "gray.50")}
              >
                ZIP / Postal
              </FormLabel>
              <Input
                type="text"
                name="postal_code"
                id="postal_code"
                autoComplete="postal-code"
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
              />
            </FormControl>
          </SimpleGrid>
        </Stack>
        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg={useColorModeValue("gray.50", "gray.900")}
          textAlign="right"
        >
          <Button
            type="submit"
            colorScheme="brand"
            _focus={{ shadow: "" }}
            fontWeight="md"
          >
            Save
          </Button>
        </Box>
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={useColorModeValue("gray.700", "gray.50")}
          >
            Your CV
          </FormLabel>
          <Flex
            mt={1}
            justify="center"
            px={6}
            pt={5}
            pb={6}
            borderWidth={2}
            borderColor={useColorModeValue("gray.300", "gray.500")}
            borderStyle="dashed"
            rounded="md"
          >
            <Stack spacing={1} textAlign="center">
              <Icon
                mx="auto"
                boxSize={12}
                color={useColorModeValue("gray.400", "gray.500")}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color={useColorModeValue("brand.600", "brand.200")}
                  pos="relative"
                  _hover={{
                    color: useColorModeValue("brand.400", "brand.300"),
                  }}
                >
                  <span>Upload a file</span>
                  <VisuallyHidden>
                    <input id="file-upload" name="file-upload" type="file" />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text
                fontSize="xs"
                color={useColorModeValue("gray.500", "gray.50")}
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </Stack>
          </Flex>
        </FormControl>

        <WorkExperienceForm />
      </div>
    </ChakraProvider>
  );
}

export default App;
