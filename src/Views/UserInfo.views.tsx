import { CheckIcon, WarningIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  VStack,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApplicationStatus from "../Components/ApplicationStatus";
import EducationExperienceForm from "../Components/EducationExperienceForm";
import PersonalInformation from "../Components/PersonalInformation";
import WorkExperienceForm from "../Components/WorkExperienceForm";
import {
  generateUniqueLink,
  checkIfAdmin,
  addProfileToUniqueLink,
} from "../db/services";

const UserInfo = () => {
  const [section, setSection] = useState(1);
  const [basicInformation, setBasicInformation] = useState({});
  const [workExperience, setWorkExperience] = useState<any>([]);
  const [confirm, setConfirm] = useState<number>(0);
  const [educationExperience, setEducationExperience] = useState<any>([]);
  const isDev = true;

  const saveCurrent = () => {
    const saveIntoLocalStorage = (category: string, toStore: object) => {
      localStorage.setItem(category, JSON.stringify(toStore));
    };
    const saveIntoChromeStorage = (category: string, toStore: object) => {
      chrome.storage.sync.set({ [category]: toStore });
    };
    switch (section) {
      case 1:
        isDev
          ? saveIntoLocalStorage("personalInformation", basicInformation)
          : saveIntoChromeStorage("personalInformation", basicInformation);
        break;
      case 2:
        isDev
          ? saveIntoLocalStorage("workExperience", workExperience)
          : saveIntoChromeStorage("workExperience", workExperience);
        break;
      case 3:
        isDev
          ? saveIntoLocalStorage("educationExperience", educationExperience)
          : saveIntoChromeStorage("educationExperience", educationExperience);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const getFromLocalStorage = async (category: string) => {
      const localStored = localStorage.getItem(category);
      const storedState = isDev
        ? localStored != null
          ? JSON.parse(localStored)
          : {}
        : await chrome.storage.sync.get([category]);
      if (category === "personalInformation")
        setBasicInformation(
          isDev ? storedState : storedState.personalInformation
        );
      else if (category === "workExperience") {
        const isEmpty =
          Object.keys(storedState).length === 0 &&
          storedState.constructor === Object;
        setWorkExperience(
          isDev
            ? isEmpty
              ? []
              : storedState
            : storedState.workExperience ?? []
        );
      } else {
        const isEmpty =
          Object.keys(storedState).length === 0 &&
          storedState.constructor === Object;
        setEducationExperience(
          isDev
            ? isEmpty
              ? []
              : storedState
            : storedState.educationExperience ?? []
        );
      }
    };

    switch (section) {
      case 1:
        getFromLocalStorage("personalInformation");
        break;
      case 2:
        getFromLocalStorage("workExperience");
        break;
      case 3:
        getFromLocalStorage("educationExperience");
        break;
      default:
        break;
    }
  }, [section, isDev]);

  const [query, setQuery] = useState("");
  useEffect(() => {
    setQuery(window.location.search.substring(1).split("=")[1]);
  }, []);

  return (
    <div>
      <div className="App">
        <Button
          onClick={async () => {
            const haha = await generateUniqueLink(
              { some: "this is new" },
              "secret2"
            );
            console.log(haha);
          }}
        >
          Click me to the moon
        </Button>

        <Button
          onClick={async () => {
            const haha = await checkIfAdmin(
              "bf54cb6a-fddf-4865-a7e6-a6a1725bdcaa",
              "8834bf7254d132c944a26feb2e8e82129f6a3275",
              "ee03115968d48346e2b364c5302629886c1e6c8b"
            );
            console.log("Im admin", haha);
          }}
        >
          Click me to the check admin
        </Button>
        <Button
          onClick={async () => {
            const haha = await addProfileToUniqueLink(
              { name: "ali", age: 10 },
              "ee03115968d48346e2b364c5302629886c1e6c8b"
            );
            console.log("profile created", haha);
          }}
        >
          Click me to the check profile
        </Button>
        {query && (
          <Box
            pos={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            bg={"white"}
            zIndex={2}
          >
            <VStack justifyContent={"center"} alignItems={"center"} h={"100%"}>
              {confirm === 2 && <CheckIcon w={32} h={32} color="green.500" />}
              {confirm === 1 && <WarningIcon w={32} h={32} color="red.500" />}
              {confirm === 0 && (
                <InfoOutlineIcon w={32} h={32} color="blue.500" />
              )}
              <Text fontSize="xl" color="gray.500" align="center" p="5">
                {confirm === 0 &&
                  `Are you sure you want to send your appliction data to ${query} ?`}
                {confirm === 1 && `Application canceled`}
                {confirm === 2 && `Application successfully sent to ${query}`}
              </Text>
              <HStack spacing={4} w="100%" justifyContent="center" height={10}>
                {confirm === 0 && (
                  <>
                    <Button
                      onClick={() => {
                        setConfirm(2);
                        setTimeout(() => setConfirm(3), 1500);
                      }}
                      colorScheme="teal"
                      variant="outline"
                      size="lg"
                      w={"40%"}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() => setConfirm(1)}
                      colorScheme="red"
                      size="lg"
                      w={"40%"}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </HStack>
            </VStack>
          </Box>
        )}
        {confirm === 3 && (
          <Box
            pos={"absolute"}
            top={0}
            left={0}
            width={"100%"}
            height={"100%"}
            bg={"white"}
            zIndex={2}
          >
            <VStack
              justifyContent={"start"}
              alignItems={"center"}
              h={"100%"}
              overflowY={"auto"}
              paddingTop={2}
            >
              <ApplicationStatus companyName={query} />
            </VStack>
          </Box>
        )}
        <Box w="100%" h="100%" rounded={10} paddingTop={4} overflowY={"auto"}>
          <Tabs
            onChange={(e) => {
              saveCurrent();
              setSection(e + 1);
            }}
            variant="soft-rounded"
            colorScheme="blue"
          >
            <TabList paddingLeft={5}>
              <Tab>Personal</Tab>
              <Tab>Work</Tab>
              <Tab>Education</Tab>
              <Tab>Application</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PersonalInformation
                  currentState={basicInformation}
                  setState={setBasicInformation}
                />
              </TabPanel>
              <TabPanel>
                <WorkExperienceForm
                  experience={workExperience}
                  setExperience={setWorkExperience}
                />
              </TabPanel>
              <TabPanel>
                <EducationExperienceForm
                  experience={educationExperience}
                  setExperience={setEducationExperience}
                />
              </TabPanel>
              <TabPanel>
                <ApplicationStatus companyName={query} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </div>
  );
};

export default UserInfo;
