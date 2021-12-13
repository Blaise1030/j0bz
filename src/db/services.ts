import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const hash = require("object-hash");

const domainName = "https://j0bz.vercel.app";

export const generateUniqueLink = async (jobPayload, secret) => {
  const u = uuidv4();
  const hashedSecret = hash(`${Date.now()}${secret}`);
  const databaseID = hash(`${u}${hashedSecret}`);
  const userLink = `${domainName}/user/${u}-${databaseID}`; //this one can be public
  const recruiterLink = `${domainName}/recruiter/${u}-${hashedSecret}`; //this one must be private
  await storeJobDescription(databaseID, jobPayload);

  const response = {
    userLink,
    recruiterLink,
  };
  return response;
};

export const checkIfAdmin = (u, hashedSecret, databaseID) => {
  console.log(hashedSecret, u);
  console.log(hash(`${u}${hashedSecret}`));
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
  await db.collection("jobs-recruiter").doc(databaseID).set(payload);
};

// recrutier -> generate 1 link with UUID (both use same link to read and store) -for future (we will add authorization for recuriter to see evrerything)

// recruiter -> generate 2 links with both keyA and keyB - give recruiter 1 link with key
// give recuritee 1 link with both key B and keyA
// when he submit - we sha256 keyA with our own secret then store

// link/<key>(<access><databasekey>)
// jobseeker = link/<dbKey> - can store
// recruiter = link/key=<dbKey>isAdmin=<readAllToken>

// // {
// //   unique: {
// //     'u1': {
// //       'sadsadsadsa': 'profile1',
// //       'dsadsad': 'profile1',
// //       'sadsadsa': 'profile1',
// //     },
// //     'u2': {
// //       'sadsadsadsa': 'profile1',
// //       'dsadsad': 'profile1',
// //       'sadsadsa': 'profile1',
// //     }
// //   }
// // }
