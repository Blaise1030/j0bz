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
    </>
  );
}
