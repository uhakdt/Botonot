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
  var urls = document.getElementsByTagName("h3");

  for (var i = 0; i < urls.length; i++) {
    $(urls[i]).mouseenter((urls) => {
      showTooltip();
    });
    $(urls[i]).mouseleave(() => {
      hideTooltip();
    });
  }
}

//----- SHOW TOOLTIP -----//
function showTooltip(urls) {
  // ----- GET TEXT -----//, review: $(e.target).clone().children().remove().end().text().toString()
  if (urls) {
    
  }
  //----- RUN API -----//
  chrome.runtime.sendMessage({ msg: "startFunc", review: "$(e.target).clone().children().remove().end().text().toString()" });

  //----- API RESPONSE -----//
  chrome.runtime.onMessage.addListener((message) => {

    //----- NUM ONLY -----//
    var numberPattern = /\d+/g;
    var apiResult = message.match(numberPattern).join("");

    //----- ADD TO TOOLTIP -----//
    botTip.innerHTML = `<div>${apiResult}</div>`;
    botTip.style.left = window.left;
    botTip.style.top = window.top;
    botTip.style.display = "block";

    return true;
  });
};

//----- HIDE TOOLTIP -----//
var hideTooltip = function (e) {
  botTip.style.display = "none";
};

main();
