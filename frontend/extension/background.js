console.log("background.js is runnning finneeee....");


//---------- API ----------//
//----- API REQUEST -----//
const userAction = async () => {
  //Send a Http GET request to our API to retrieve the data
  let request = new XMLHttpRequest();
  request.open("GET", "https://uhakdt.pythonanywhere.com/text/jdiowad");
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status === 200) {
      //----- TO CONTENT.JS -----//
      //Removing uncessary text from request
      var messageString = request.responseText;
      var messageTemp = messageString.match(/^.{12}(.*)/);
      var result = messageTemp[1].slice(0, -2);
      //Sending request to Content.js
      sendMessageToCurrentTab(result);
      console.log("api request sent and received...");
    } else {
      console.log(`error ${request.status} ${request.statusText}`);
    }
  };
};


//---------- CONTENT.JS ----------//
//----- FROM CONTENT -----//
chrome.runtime.onMessage.addListener(function (req, send, sendRes) {
  if (req.msg == "startFunc") userAction();
});

//----- TO CONTENT -----//
function sendMessageToCurrentTab(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log("Sending Message from Background.js to Content.js");
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}