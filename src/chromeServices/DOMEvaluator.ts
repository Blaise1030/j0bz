import { DOMMessage, DOMMessageResponse } from "../types";

const messagesFromReactAppListener = (
  _: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  const response = {
    headlines: Array.from(document.getElementsByTagName<"a">("a")).map((a) => {
      const string = a.href.toString();
      if (
        string.includes("https://myjobstreet.jobstreet.com.my") ||
        string.includes("http://myjobstreet.jobstreet.com.my")
      ) {
        a.addEventListener("click", function () {
          console.log("HELLLEO FROM CHROME");
          alert("button clicked");
        });
        return a.href;
      }
    }),
  };
  sendResponse(response as any);
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

export const listener = () =>
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.message == "buttonClicked") {
      console.log("I am summoned");
      chrome.tabs.create({
        active: true,
        url: "index.html",
      });
    }
  });
