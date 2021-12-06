import React from "react";
import "./App.css";
import { DOMMessage, DOMMessageResponse } from "./types";
import { ChakraProvider } from "@chakra-ui/react";

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
      <div className="App" />
    </ChakraProvider>
  );
}

export default App;
