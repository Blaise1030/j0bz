import "./App.css";
import UserInfo from "./Views/UserInfo.views";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobGeneration from "./Views/JobGeneration.views";
import JobRecruiterPanel from "./Views/JobRecruiterPanel";
import JobApplicationConfirm from "./Views/JobApplicationConfirm";
import JobApplicantsDetails from "./Views/JobApplicantsDetails";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Box
          width={["100%", "500px"]}
          height={["100%", "700px"]}
          overflowY={"auto"}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<JobGeneration />} />
              <Route path="/user/:id" element={<JobApplicationConfirm />} />
              <Route path="/recruiter/:id" element={<JobRecruiterPanel />} />
              <Route
                element={<JobApplicantsDetails />}
                path="/applicant-info"
              />
              <Route path="/user-info" element={<UserInfo />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
