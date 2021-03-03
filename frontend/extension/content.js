// idElements[i].getBoundingClientRect().top, idElements[i].getBoundingClientRect().right

"use strict";
console.log("content.js is running finnneee.....");

//----- CREATE TOOLTIP -----//
var botTip = document.createElement("div");
botTip.style.width = "8%";
botTip.className = "botTip";
botTip.style.position = "fixed";
botTip.style["z-index"] = 500;
botTip.style.background = "white";
botTip.style.border = "1px solid #9E9E9E";
botTip.style.padding = "6px";
botTip.style["text-align"] = "left";
//hide it initially
botTip.style.display = "none";
document.body.appendChild(botTip);

//----- MAIN FUNCTION -----//
async function main() {
  // var urls = document.getElementsByTagName("a");

  jQuery(document).ready(checkContainer);

  async function checkContainer() {
    await new Promise(r => setTimeout(r, 2000));
    if($('#layers').is(':visible')){ 
      checkToRemoveTweet();
    } else {
      setTimeout(checkContainer, 2000); //wait 50 ms, then try again
    }
  }

  jQuery(document).scroll(checkContainer);
}

//----- SHOW TOOLTIP -----//
var showTooltip = function (e) {

  //----- API RESPONSE -----//
  chrome.runtime.onMessage.addListener((message) => {
    //----- MOUSE POSITION -----//
    $(document).mousemove(function (e) {
      window.x = e.pageX;
      window.y = e.pageY;
    });
    // var messageString = JSON.stringify(message);
    // var messageTemp = messageString.match(/^.{14}(.*)/);
    // var result = messageTemp.slice(0, -1);

    //----- ADD TO TOOLTIP -----//
    botTip.innerHTML = `<div>${message}</div>`;
    botTip.style.left = '50px';
    botTip.style.top = '50px';
    botTip.style.display = "block";

    return true;
  });
};

//----- HIDE TOOLTIP -----//
var hideTooltip = function (e) {
  botTip.style.display = "none";
};

//----- REMOVE TWEET -----//
var checkToRemoveTweet = function (e) {
  //----- TO API-----//
  var tweets = document.getElementsByTagName('article');

  for (let i = 0; i < tweets.length; i++) {
    const $tweet = tweets[i];
    if ($('span', $tweet).length) {
      const tweetContent = $tweet.getElementsByTagName('span')[5].innerText;
      if (tweetContent.includes("I don't know but I was wondering if there is going to be an equivalent of a WWII Jeep")) {
        chrome.runtime.sendMessage({ msg: "startFunc", content : tweetContent});
      }
    }
  }

  //----- FROM API -----//
  chrome.runtime.onMessage.addListener((message) => {
    $('span:contains(' + message + ')').closest('article').remove();
    return true;
  });
};


main();
