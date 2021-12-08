import { DOMMessage, DOMMessageResponse } from "../types";

const messagesFromReactAppListener = (
  _: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  //   const response: DOMMessageResponse = {
  //     headlines: Array.from(document.getElementsByTagName<"a">("a")).map((a) => {
  //       const string = a.href.toString();
  //       if (
  //         string.includes("https://myjobstreet.jobstreet.com.my") ||
  //         string.includes("http://myjobstreet.jobstreet.com.my")
  //       ) {
  //         return a.href;
  //       }
  //     }),
  //   };
  //   sendResponse(response);
  // };
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
