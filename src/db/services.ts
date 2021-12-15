import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const hash = require("object-hash");

const domainName = "https://j0bz.vercel.app";
const JOBS_RECRUITER = "jobs-recruiter";
const JOBS_APPLICANTS = "job-applicants";

export const generateUniqueLink = async (jobPayload, secret) => {
  const u = uuidv4();
  const hashedSecret = hash(`${Date.now()}${secret}`);
  const databaseID = hash(`${u}${hashedSecret}`);
  const userLink = `${domainName}/user/${u}-${databaseID}`; //this one can be public
  const recruiterLink = `${domainName}/recruiter/${u}-${hashedSecret}`; //this one must be private
  await storeJobDescription(databaseID, {
    userLink,
    ...jobPayload,
    applicationStateID: 0,
  });

  const response = {
    userLink,
    recruiterLink,
  };
  return response;
};

export const checkIfAdmin = (
  u: string,
  hashedSecret: string,
  databaseID: string
) => {
  return hash(`${u}${hashedSecret}`) === databaseID ? true : false;
};

export const addProfileToUniqueLink = async (profile, databaseID) => {
  return await db
    .collection("job-applicants")
    .doc(`${Date.now()}${databaseID}`)
    .set({
      jobsRecruiter: databaseID,
      ...profile,
    });
};

export const storeJobDescription = async (databaseID: string, payload: any) => {
  await db.collection(JOBS_RECRUITER).doc(databaseID).set(payload);
};

export const checkIdExists = async (databaseID: string) => {
  const idExist = (await db.collection(JOBS_RECRUITER).doc(databaseID).get())
    .exists;
  return idExist;
};

export const getJobDescription = async (databaseID: string) => {
  try {
    const response = await db.collection(JOBS_RECRUITER).doc(databaseID).get();
    if (!response.exists) {
      throw new Error("job id does not exist");
    } else return response.data();
  } catch (error) {
    throw error;
  }
};

export const getAllJobApplicants = async (databaseID: string) => {
  let documents = [];
  try {
    const idExist = await checkIdExists(databaseID);

    if (!idExist) {
      throw new Error("recruiter id does not exist");
    } else {
      const response = await db
        .collection(JOBS_APPLICANTS)
        .where("jobsRecruiter", "==", databaseID)
        .get();
      response.forEach((doc) => {
        documents.push(doc.data());
      });
    }
  } catch (error) {
    throw error;
  }
  return documents;
};
