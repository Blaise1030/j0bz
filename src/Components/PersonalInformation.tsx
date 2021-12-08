import {
  Box,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";

export default function ({ setState, currentState }: any) {
  return (
    <>
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
      <Stack px={4} pt={5} spacing={6}>
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
              value={currentState?.firstName ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  firstName: event.target.value,
                })
              }
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
              value={currentState?.lastName ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  lastName: event.target.value,
                })
              }
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
              value={currentState?.email ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  email: event.target.value,
                })
              }
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
              value={currentState?.phoneNumber ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  phoneNumber: event.target.value,
                })
              }
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
              value={currentState?.address ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  address: event.target.value,
                })
              }
            />
          </FormControl>
          <FormControl as={GridItem} colSpan={[6, 3]}>
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
              autoComplete="email"
              mt={1}
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md"
              value={currentState?.city ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  city: event.target.value,
                })
              }
            />
          </FormControl>
          <FormControl as={GridItem} colSpan={[6, 3]}>
            <FormLabel
              htmlFor="postal_code"
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue("gray.700", "gray.50")}
            >
              Postal Code
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
              value={currentState?.postalCode ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  postalCode: event.target.value,
                })
              }
            />
          </FormControl>
          <FormControl as={GridItem} colSpan={6}>
            <FormLabel
              htmlFor="country"
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue("gray.700", "gray.50")}
            >
              Country
            </FormLabel>
            <Select
              name="country"
              id="country"
              placeholder="Select country"
              value={currentState?.country ?? ""}
              onChange={(event) =>
                setState({
                  ...currentState,
                  country: event.target.value,
                })
              }
            >
              <option>Kuala Lumpur</option>
              <option>Singapore</option>
              <option>Indonesia</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </Stack>
      <Box
        px={{ base: 4, sm: 6 }}
        bg={useColorModeValue("gray.50", "gray.900")}
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
      {/* <FormControl>
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
      </FormControl> */}
    </>
  );
}
