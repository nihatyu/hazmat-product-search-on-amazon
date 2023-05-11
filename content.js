// Bekleme fonksiyonu
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let firtsiFrameEl = null;
let secondiFrameEl = null;
let otherIframe = null;

// ASINS dizisi
const ASINS = [
  { text: "B07Q3XL4MR", result: "" },
  { text: "B0BTM2J5L7", result: "" },
  { text: "B07BZP1L7F", result: "" },
  //above variables are for testing purposes
  { text: "B07WXJ728R", result: "" },
  { text: "B07JZGVN41", result: "" },
  { text: "B0BKMX4G5G", result: "" },
  { text: "B077YNVXK8", result: "" },
  { text: "B091YPX1V2", result: "" },
  { text: "B077YL95M3", result: "" },
  { text: "B01N28NU34", result: "" },
  { text: "B0BG4TZR6Z", result: "" },
  { text: "B01IN59GDU", result: "" },
  { text: "B08R38FJ68", result: "" },
  { text: "B09FFJ8CNG", result: "" },
  { text: "B07W86Y57J", result: "" },
  { text: "B07WK86D8N", result: "" },
  { text: "B083QDDRPK", result: "" },
  { text: "B07MZG3TXC", result: "" },
  { text: "B0957DQQNN", result: "" },
  { text: "B09K7FGWVN", result: "" },
  { text: "B08ZXL1B3Z", result: "" },
  { text: "B089R5CBC3", result: "" },
  { text: "B09QC5RDKN", result: "" },
  { text: "B093SSQJ9N", result: "" },
];
let asinIndex = 0;

let btnStart = document.createElement("button");
btnStart.innerText = "Start";
btnStart.setAttribute(
  "style",
  `
position: relative; 
top: 5px;
`
);
btnStart.addEventListener("click", function () {
  state = !state;
  btnStart.innerText = state ? "Stop" : "Start";
});

let state = false;

function start() {
  const resultContainer = otherIframe.document.querySelector(
    "#augur_paramount_fba_dangerous_goods_wf_content_box_id"
  );

  if (resultContainer) {
    const diagState = resultContainer.querySelector(".diag_state");
    const instructionsEl = resultContainer.querySelector(".instructions");

    const instructionsElLink = instructionsEl.querySelector(".a-declarative");

    if (diagState && instructionsEl && instructionsElLink) {
      const resultEl = diagState.children[0];
      const resultText = resultEl.innerText;

      if (resultText) {
        if (resultText.includes("is not dangerous")) {
          ASINS[asinIndex].result = "This product is not dangerous goods";
        } else if (resultText.includes("is not enrolled")) {
          ASINS[asinIndex].result = "is not enrolled";
        } else if (resultText.includes("is a dangerous good")) {
          ASINS[asinIndex].result = " is a dangerous good";
        }
        asinIndex = asinIndex + 1;

        console.log(ASINS);

        if (instructionsEl) {
          instructionsElLink.children[0].click();
          return;
        }
      } else {
        console.log("result Text Not Found");
      }
      return;
    }
  }

  const asinsInput = otherIframe.document.querySelector("#item_id");
  if (asinsInput) {
    asinsInput.value = ASINS[asinIndex].text;
    asinsInput.focus();
    setTimeout(() => {
      const checkStatusBtn = otherIframe.document.querySelector(
        "#continue_task_18ie4by-announce"
      );
      if (checkStatusBtn) {
        checkStatusBtn.click();
      }
    }, 500);
    return;
  }

  const lookRadioBox = otherIframe.document.querySelector(
    "#seller_intent_radio_option_0 > div > label > input[type=radio]"
  );
  if (lookRadioBox) {
    lookRadioBox.click();
    setTimeout(() => {
      const nextBtn = otherIframe.document.querySelector("#-announce");
      if (nextBtn) {
        nextBtn.click();
      }
    }, 500);
    return;
  }

  // const checkAsinsDangerousLink = document.querySelector(
  //   "#title-link > div > div:nth-child(1) > a"
  // );
  // if (checkAsinsDangerousLink) {
  //   checkAsinsDangerousLink.click();
  //   return;
  // }
}

setInterval(() => {
  if (state) {
    if (ASINS.length > asinIndex) {
      firtsiFrameEl = document.getElementById("shp-content-frame");
      if (firtsiFrameEl) {
        secondiFrameEl = firtsiFrameEl.contentWindow.document
          .querySelector(".solution-contents")
          .shadowRoot.querySelector(".spl-element-frame");

        otherIframe = secondiFrameEl.contentWindow.document
          .querySelector(".solution-contents")
          .shadowRoot.querySelector(".spl-element-frame").contentWindow;
      }
      start();
      console.log("start");
    } else {
      console.log("completed");
      console.log("ASINS:", ASINS);
      state = false;
      btnStart.innerText = "Start";
    }
  }
}, 1500);

(async function waitBStart() {
  await sleep(3000);
  const asinCountEl = document.getElementById("asin-count");

  if (asinCountEl) {
    asinCountEl.appendChild(btnStart);
  }
})();
