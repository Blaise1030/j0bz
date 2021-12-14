import "./App.css";
import UserInfo from "./Views/UserInfo.views";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Switcher from "./Views/Switcher";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/user/:id" element={<div>user</div>} />
          <Route path="/recruiter/:id" element={<div>recruiter</div>} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
