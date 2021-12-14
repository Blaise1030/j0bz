import "./App.css";
import UserInfo from "./Views/UserInfo.views";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobGeneration from "./Views/JobGeneration.views";
import JobRecruiterPanel from "./Views/JobRecruiterPanel";
import JobApplicationConfirm from "./Views/JobApplicationConfirm";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JobGeneration />} />
            <Route path="/user/:id" element={<JobApplicationConfirm />} />
            <Route path="/recruiter/:id" element={<JobRecruiterPanel />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
