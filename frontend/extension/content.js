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
function main() {
  var urls = document.getElementsByTagName("div");

  for (var i = 0; i < urls.length; i++) {
    console.log(urls[i])
    $(urls[i]).mouseenter(function () {
      showTooltip();
    });
    $(urls[i]).mouseleave(function () {
      hideTooltip();
    });
  }
}

//----- SHOW TOOLTIP -----//
var showTooltip = function (e) {
  // ----- GET TEXT -----//
  window.onmouseover = function (e) {
    var test = e.target.innerHTML;
  };

  //----- RUN API -----//
  var tweetContent = document.getElementsByTagName('article')[2].getElementsByTagName('span')[5].innerText;
  chrome.runtime.sendMessage({ msg: "startFunc", content : tweetContent});

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

main();
