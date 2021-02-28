console.log("background.js is runnning finneeee....");


//---------- API ----------//
//----- API REQUEST -----//
const userAction = async (req) => {
  //Send a Http GET request to our API to retrieve the data
  let request = new XMLHttpRequest();
  request.open("GET", "https://uhakdt.pythonanywhere.com/text/jidodwa djoiwpad jdpowa dajwdwpoa");
  console.log(req.review);
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status === 200) {
      //----- TO CONTENT -----//
      sendMessageToCurrentTab(request.response);
      console.log(JSON.parse(request.response));
      console.log("api request sent and received...");
    } else {
      console.log(`error ${request.status} ${request.statusText}`);
    }
  };
};


//---------- CONTENT ----------//
//----- FROM CONTENT -----//
chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
  if (req.msg == "startFunc") userAction(req);
});

//----- TO CONTENT -----//
function sendMessageToCurrentTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Sending Message from Background.js to Content.js");
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}