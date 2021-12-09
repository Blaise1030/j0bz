import React, { useState, useEffect } from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import {
  Box,
  ChakraProvider,
  HStack,
  Progress,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import WorkExperienceForm from "./Components/WorkExperienceForm";
import PersonalInformation from "./Components/PersonalInformation";

function App() {
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [section, setSection] = useState(1);
  const [basicInformation, setBasicInformation] = useState({});
  const [workExperience, setWorkExperience] = useState<any>([]);
  const isDev = true;
  useEffect(() => {
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
      console.log(storedState, "Retreive");
      if (category === "personalInformation")
        setBasicInformation(
          isDev ? storedState : storedState.personalInformation
        );
      else {
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
      }
    };

    switch (section) {
      case 1:
        getFromLocalStorage("personalInformation");
        break;
      case 2:
        getFromLocalStorage("workExperience");
        break;
      default:
        break;
    }
  }, [section]);

  return (
    <ChakraProvider>
      <div className="App">
        <Box w="100%" rounded={10}>
          <HStack spacing="10px" width="100%">
            <Progress
              width="75%"
              size="sm"
              borderRadius="4"
              value={parseInt(((section / 2) * 100).toString())}
              my={4}
            />
            <Button colorScheme="red" onClick={saveCurrent} width="25%">
              Save this thing
            </Button>
          </HStack>

          <Tabs
            onChange={(e) => setSection(e + 1)}
            variant="soft-rounded"
            colorScheme="teal"
          >
            <TabList paddingLeft={5}>
              <Tab>Tab 1</Tab>
              <Tab>Tab 2</Tab>
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
            </TabPanels>
          </Tabs>
        </Box>
      </div>
    </ChakraProvider>
  );
}

export default App;
