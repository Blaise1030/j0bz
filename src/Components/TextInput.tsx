import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

// Form UI which includes all text based input components
const TextInput = ({
  title,
  type,
  value,
  onChange,
  disable,
}: {
  onChange: (a: string) => void;
  title: string;
  type: string;
  value: string;
  disable?: boolean;
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
          onChange={(e) => onChange(e.target.value)}
          disabled={disable}
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

export default TextInput;
