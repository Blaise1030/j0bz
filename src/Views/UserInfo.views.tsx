import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ApplicationStatus from "../Components/ApplicationStatus";
import EducationExperienceForm from "../Components/EducationExperienceForm";
import PersonalInformation from "../Components/PersonalInformation";
import WorkExperienceForm from "../Components/WorkExperienceForm";

const UserInfo = () => {
  const [section, setSection] = useState(1);
  const [basicInformation, setBasicInformation] = useState({});
  const [workExperience, setWorkExperience] = useState<any>([]);
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
  );
};

export default UserInfo;
