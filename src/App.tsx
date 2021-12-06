import React from "react";
import "./App.css";
// import { DOMMessage, DOMMessageResponse } from "./types";

function App() {
  // const [headlines, setHeadlines] = React.useState<string[]>([]);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     console.log("Im runn");
  //     chrome.tabs &&
  //       chrome.tabs.query(
  //         {
  //           active: true,
  //           currentWindow: true,
  //         },
  //         (tabs) => {
  //           console.log("Im runn Blaise");
  //           chrome.tabs.sendMessage(
  //             tabs[0].id || 0,
  //             { type: "GET_DOM" } as DOMMessage,
  //             (response: DOMMessageResponse) => {
  //               setTitle(response.title);
  //               setHeadlines(response.headlines);
  //             }
  //           );
  //         }
  //       );
  //   }, 1000);
  // }, []);

  return <div className="App"></div>;
}

export default App;
