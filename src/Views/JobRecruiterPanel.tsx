import { Box, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllJobApplicants, hash } from "../db/services";

const JobRecruiterPanel = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [applicant, setApplicants] = useState([]);

  useEffect(() => {
    const arrVars = id.split("-");
    const sct = arrVars.pop();
    const u = arrVars.join("-");
    const psd = hash(`${u}${sct}`);

    const getAllAppliantsData = async () => {
      try {
        const response = await getAllJobApplicants(psd);
        setApplicants(response);
      } catch (e) {
        console.log(e);
        navigate("/", { replace: true });
      }
    };
    getAllAppliantsData();
  }, []);

  https: return (
    <Box>
      <VStack></VStack>
      This is the recuriter page
    </Box>
  );
};

export default JobRecruiterPanel;
