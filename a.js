// // Bekleme fonksiyonu
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// let firtsiFrameEl = null;
// let secondiFrameEl = null;
// let otherIframe = null;

// // ASINS dizisi
// // Excel için şablon ="{ text: '"&A2:A158&"', result: '' },"
// const ASINS = [
//   { text: "B07VMTHB9B", result: "" },
//   { text: "B00B6ZF3UK", result: "" },
//   { text: "B091FFMVC6", result: "" },
//   { text: "B083B5PL6H", result: "" },
//   { text: "B082J52RPW", result: "" },
//   { text: "B0BHVJSXZ5", result: "" },
//   { text: "B09694LTKH", result: "" },
//   { text: "B008I6EAFO", result: "" },
//   { text: "B009L5ZQAE", result: "" },
//   { text: "B00PLAJ2TY", result: "" },
//   { text: "B097N9NLBZ", result: "" },
//   { text: "B08Y3VS3VR", result: "" },
//   { text: "B00006IUTG", result: "" },
//   { text: "B0832FK5YJ", result: "" },
//   { text: "B0BQD8KL86", result: "" },
//   { text: "B01J7YAJT6", result: "" },
//   { text: "B0BM3DQB2P", result: "" },
//   { text: "B07TN1G464", result: "" },
//   { text: "B08287T8Q4", result: "" },
//   { text: "B0BCYFZKHP", result: "" },
//   { text: "B07KCM7ZM1", result: "" },
//   { text: "B079SS3594", result: "" },
//   { text: "B07H3S9QFS", result: "" },
//   { text: "B09CXH2DB5", result: "" },
//   { text: "B001PZ7KIY", result: "" },
//   { text: "B0983WNF7Q", result: "" },
//   { text: "B084Y73HXJ", result: "" },
//   { text: "B01LYHV64S", result: "" },
//   { text: "B08GBM3FQ5", result: "" },
//   { text: "B08D27GDN5", result: "" },
//   { text: "B0BMQ6SZXH", result: "" },
//   { text: "B0BVV1PQNN", result: "" },
//   { text: "B07DTW7XMD", result: "" },
//   { text: "B000BPC3XQ", result: "" },
//   { text: "B005DXWPQG", result: "" },
//   { text: "B0B5C267JR", result: "" },
//   { text: "B08SJ67CPQ", result: "" },
//   { text: "B09HXKS34F", result: "" },
//   { text: "B073VY15CK", result: "" },
//   { text: "B010F38JFE", result: "" },
//   { text: "B0BFCWPGFH", result: "" },
//   { text: "B07KX8ZZCQ", result: "" },
//   { text: "B01IWKSSSU", result: "" },
//   { text: "B0BD64CP58", result: "" },
//   { text: "B0BBKNW9BZ", result: "" },
//   { text: "B0BNTK33FL", result: "" },
//   { text: "B09M9XSCYH", result: "" },
//   { text: "B0BVV14F6W", result: "" },
//   { text: "B095369G4G", result: "" },
//   { text: "B01BS61IOQ", result: "" },
//   { text: "B08FC72XF2", result: "" },
//   { text: "B0000DDWOI", result: "" },
//   { text: "B0042IWII8", result: "" },
//   { text: "B0BDDV23YP", result: "" },
//   { text: "B00IHXAEMG", result: "" },
//   { text: "B098LM71Z4", result: "" },
//   { text: "B0BLVJ72LS", result: "" },
//   { text: "B00603K3CG", result: "" },
//   { text: "B00NI96TU0", result: "" },
//   { text: "B077V35BBY", result: "" },
//   { text: "B00091PNTI", result: "" },
//   { text: "B00448OTME", result: "" },
//   { text: "B08N5FLLMF", result: "" },
//   { text: "B08LB74BMR", result: "" },
//   { text: "B08CBH8CPC", result: "" },
//   { text: "B0714LWNQL", result: "" },
//   { text: "B07H3RQ83J", result: "" },
//   { text: "B07BJZX9BQ", result: "" },
//   { text: "B00GURL9L6", result: "" },
//   { text: "B07CPT2PG6", result: "" },
//   { text: "B0BHYYM7T8", result: "" },
//   { text: "B002U0KKLC", result: "" },
//   { text: "B08L87XND2", result: "" },
//   { text: "B00JGBQ2JW", result: "" },
//   { text: "B01B7SYK6I", result: "" },
//   { text: "B0833NH6B2", result: "" },
//   { text: "B001FXU6MS", result: "" },
//   { text: "B002GZXONC", result: "" },
//   { text: "B08GCNJ4NS", result: "" },
// ];

// let asinIndex = 0;

// let btnStart = document.createElement("button");
// btnStart.innerText = "Start";
// btnStart.setAttribute(
//   "style",
//   `
// position: relative;
// top: 5px;
// `
// );
// btnStart.addEventListener("click", function () {
//   state = !state;
//   btnStart.innerText = state ? "Stop" : "Start";
// });

// let state = false;

// function start() {
//   const resultContainer = otherIframe.document.querySelector(
//     "#augur_paramount_fba_dangerous_goods_wf_content_box_id"
//   );

//   if (resultContainer) {
//     const diagState = resultContainer.querySelector(".diag_state");
//     // console.log("diagState", diagState);
//     const instructionsEl = resultContainer.querySelector(".instructions");
//     // console.log("instructionsEl", instructionsEl);

//     const instructionsElLink = instructionsEl.querySelector(".a-declarative");
//     // console.log("instructionsElLink", instructionsElLink);

//     if (diagState && instructionsEl && instructionsElLink) {
//       // problem burada !!!  SOLVED!
//       const resultEl = diagState.querySelector(
//         "span.a-size-base-plus.a-color-base.a-text-bold"
//       );
//       // console.log("resultEl", resultEl);
//       const resultText = resultEl.innerText;
//       // console.log("resultText", resultText);

//       if (resultText) {
//         if (resultText.includes("is not dangerous")) {
//           ASINS[asinIndex].result = "       ";
//         } else if (resultText.includes("is not enrolled")) {
//           ASINS[asinIndex].result = "Not Enrolled";
//         } else if (resultText.includes("is a dangerous good")) {
//           ASINS[asinIndex].result = "Dangerous";
//         } else if (resultText.includes("We need more information")) {
//           ASINS[asinIndex].result = "Need more information";
//         }
//         asinIndex = asinIndex + 1;

//         // console.log(ASINS);

//         if (instructionsEl) {
//           // console.log("instructionsEl", instructionsEl);
//           instructionsElLink.children[0].click();
//           return;
//         }
//       } else {
//         console.log("result Text Not Found");
//       }
//       return;
//     }
//   }

//   const asinsInput = otherIframe.document.querySelector("#item_id");
//   if (asinsInput) {
//     asinsInput.value = ASINS[asinIndex].text;
//     asinsInput.focus();
//     setTimeout(() => {
//       const checkStatusBtn = otherIframe.document.querySelector(
//         "#continue_task_18ie4by-announce"
//       );
//       if (checkStatusBtn) {
//         checkStatusBtn.click();
//       }
//     }, 1672);
//     return;
//   }

//   const lookRadioBox = otherIframe.document.querySelector(
//     "#seller_intent_radio_option_0 > div > label > input[type=radio]"
//   );
//   if (lookRadioBox) {
//     lookRadioBox.click();
//     setTimeout(() => {
//       const nextBtn = otherIframe.document.querySelector("#-announce");
//       if (nextBtn) {
//         nextBtn.click();
//       }
//     }, 1349);
//     return;
//   }

//   // const checkAsinsDangerousLink = document.querySelector(
//   //   "#title-link > div > div:nth-child(1) > a"
//   // );
//   // if (checkAsinsDangerousLink) {
//   //   checkAsinsDangerousLink.click();
//   //   return;
//   // }
// }

// setInterval(() => {
//   if (state) {
//     if (ASINS.length > asinIndex) {
//       firtsiFrameEl = document.getElementById("shp-content-frame");
//       if (firtsiFrameEl) {
//         secondiFrameEl = firtsiFrameEl.contentWindow.document
//           .querySelector(".solution-contents")
//           .shadowRoot.querySelector(".spl-element-frame");

//         otherIframe = secondiFrameEl.contentWindow.document
//           .querySelector(".solution-contents")
//           .shadowRoot.querySelector(".spl-element-frame").contentWindow;
//       }
//       start();
//       console.log("start");
//     } else {
//       console.log("completed");
//       console.log("ASINS:", ASINS);
//       state = false;
//       btnStart.innerText = "Start";
//     }
//   }
// }, 2192);

// (async function waitBStart() {
//   await sleep(2342);
//   const asinCountEl = document.getElementById("asin-count");

//   if (asinCountEl) {
//     asinCountEl.appendChild(btnStart);
//   }
// })();
