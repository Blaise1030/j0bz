chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension successfully installed!");
  return;
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("Chrome extension successfully installed!2222");
  return;
});

// chrome.runtime.onInstalled.addListener(function (details) {
//   // This gets once the extension is installed on browser
// });
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   // Get called when page URL is updated or refreshed
//   console.log("hallo--------------------------");
//   localStorage.setItem("onUpdated", "YAy I am loaded");
//   document.addEventListener("DOMContentLoaded", function () {
//     Array.from(document.getElementsByTagName("a")).map((a) => {
//       console.log("BNABABBABABAB");
//       const string = a.href.toString();
//       if (
//         string.includes("https://myjobstreet.jobstreet.com.my") ||
//         string.includes("http://myjobstreet.jobstreet.com.my")
//       ) {
//         a.addEventListener("click", function () {
//           console.log("HELLLEO FROM CHROME");
//           alert("button clicked");
//         });
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   localStorage.setItem("DOMContentLoaded", "YAy I am loaded");
//   const blah = Array.from(document.getElementsByTagName("a")).map((a) => {
//     console.log("asdasdas");
//     const string = a.href.toString();
//     if (
//       string.includes("https://myjobstreet.jobstreet.com.my") ||
//       string.includes("http://myjobstreet.jobstreet.com.my")
//     ) {
//       a.click(function () {
//         return false;
//       });
//       a.addEventListener("click", function () {
//         console.log("HELLLEO FROM sadasdsadsa");
//         alert("button clicked");
//       });
//     }
//   });
//   localStorage.setItem("all tags", JSON.stringify(blah));
// });

// localStorage.setItem("blaise is here", "I am stored in the local storage");
