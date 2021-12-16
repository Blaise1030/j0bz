import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ApplicationStatus from "../Components/ApplicationStatus";
import EducationExperienceForm from "../Components/EducationExperienceForm";
import PersonalInformation from "../Components/PersonalInformation";
import WorkExperienceForm from "../Components/WorkExperienceForm";
import { useLocation, useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [section, setSection] = useState(1);
  const [basicInformation, setBasicInformation] = useState({});
  const [workExperience, setWorkExperience] = useState<any>([]);
  const [educationExperience, setEducationExperience] = useState<any>([]);
  const [applicationPath, setApplicationPath] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isDev = true;

  useEffect(() => {
    setApplicationPath(location?.state?.applicationPath);
  }, [location?.state?.applicationPath]);

  const navigateToApplicationConfirm = () => navigate(applicationPath);

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
    <Box w="100%" h="100%" rounded={10} paddingTop={4} overflowY={"auto"}>
      {applicationPath && (
        <Button
          onClick={navigateToApplicationConfirm}
          colorScheme="teal"
          outline={"none"}
          variant="link"
          size="lg"
          pl={5}
          my={5}
        >
          ← Go Back to Application Page
        </Button>
      )}
      <Tabs
        onChange={(e) => {
          saveCurrent();
          setSection(e + 1);
        }}
        variant="soft-rounded"
        colorScheme="blue"
        w="100%"
        h="100%"
      >
        <TabList pl={5}>
          <Tab>Personal</Tab>
          <Tab>Work</Tab>
          <Tab>Education</Tab>
          <Tab>Application</Tab>
        </TabList>
        <TabPanels w="100%" h="100%">
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
          <TabPanel w="100%" h="100%">
            <ApplicationStatus companyName={query} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default UserInfo;
