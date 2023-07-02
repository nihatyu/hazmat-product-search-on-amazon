// Bekleme fonksiyonu
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ASINS dizisi
const ASINS = [
  { text: "B07VMTHB9B", resultUs: "", resultCa: "" },
  { text: "B08GCNJ4NS", resultUs: "", resultCa: "" },
];

// İşlemi kontrol etmek için değişkenler
let isRunning = false;
let currentASINIndex = 0;

// Ana fonksiyon
async function processASINS() {
  isRunning = true;

  while (isRunning && currentASINIndex < ASINS.length) {
    const ASIN = ASINS[currentASINIndex];
    await applyActions(ASIN);
    currentASINIndex++;
  }

  if (!isRunning) {
    console.log("Extension stopped.");
  } else {
    console.log("Extension finished.");
  }
}

// İşlemleri uygulama fonksiyonu
async function applyActions(asin) {
  await sleep(1000);
  const iframe = document.querySelector("#shp-content-frame");
  const iframeDocument = iframe.contentWindow.document;

  const LookUpAnASIN = iframeDocument.querySelector(
    "#meld-sidebar-body > div.meld-transcript > div > div > div > div:nth-child(2) > div > div.button-options.button-options-sidebar > kat-button:nth-child(1)"
  );
  await clickButton(LookUpAnASIN);
  await sleep(4000);

  const ASINInput = iframeDocument.querySelector(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(2) > div > div:nth-child(1) > div > kat-input"
  );
  await enterText(ASINInput, asin.text);
  await sleep(1000);

  const checkStatus = iframeDocument.querySelector(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(2) > div > div:nth-child(2) > div > div.button-options.button-options-sidebar > kat-button"
  );

  await clickButton(checkStatus);
  await sleep(3000);

  let resultsUs = iframeDocument.querySelector(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > div.meld-label-description-container > div > span.meld-status"
  );
  asin.resultUs = await getResult(resultsUs);
  await sleep(3000);

  await clickDropdown(
    "#meld-sidebar-body > div.meld-sidebar-header > div > div > div.switcher-section > kat-dropdown"
  );
  await sleep(2000);

  await clickDropdownOption(
    "#meld-sidebar-body > div.meld-sidebar-header > div > div > div.switcher-section > kat-dropdown > kat-option:nth-child(5)"
  );
  await sleep(3000);

  await clickButton(checkStatusAfterShadow);
  await sleep(3000);

  await enterText(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(2) > div > div:nth-child(1) > div > kat-input",
    "#katal-id-1",
    asin.text
  );
  await sleep(1000);

  await clickButton(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(2) > div > div:nth-child(2) > div > div.button-options.button-options-sidebar > kat-button"
  );
  await sleep(3000);

  let resultsCa = iframeDocument.querySelector(
    "#meld-sidebar-body > div.meld-transcript > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > div.meld-label-description-container > div > span.meld-status"
  );
  asin.resultCa = await getResult(resultsCa);
  await sleep(2000);

  await clickDropdown(
    "#meld-sidebar-body > div.meld-sidebar-header > div > div > div.switcher-section > kat-dropdown"
  );
  await sleep(2000);

  await clickDropdownOption(
    "#meld-sidebar-body > div.meld-sidebar-header > div > div > div.switcher-section > kat-dropdown > kat-option:nth-child(5)"
  );
  await sleep(3000);

  // Durdurma kontrolü
  if (!isRunning) {
    return;
  }
}

// Selector üzerinde tıklama fonksiyonu
async function clickButton(selector) {
  if (selector) {
    selector.click();
  } else {
    console.log("Öğe bulunamadı.");
  }
}

// Text girme fonksiyonu
async function enterText(selector, text) {
  console.log("ASINInput :>> ", selector);
  for (let i = 0; i < text.length; i++) {
    const event = new Event("input", { bubbles: true });
    const char = text.charAt(i);
    const keyCode = char.charCodeAt(0);

    const keydownEvent = new KeyboardEvent("keydown", { keyCode });
    const keyupEvent = new KeyboardEvent("keyup", { keyCode });

    selector.dispatchEvent(keydownEvent);
    selector.value += char;
    selector.dispatchEvent(event);
    selector.dispatchEvent(keyupEvent);
  }
}

// Dropdown üzerinde tıklama fonksiyonu
async function clickDropdown(selector) {
  selector.click();
}

// Dropdown seçenek üzerinde tıklama fonksiyonu
async function clickDropdownOption(selector) {
  selector.click();
}

// Sonuçları alma fonksiyonu
async function getResult(selector) {
  const text = selector.textContent;

  if (text.includes("is not dangerous")) {
    return "Not";
  } else if (text.includes("is a dangerous good")) {
    return "YES";
  } else if (text.includes("is not enrolled")) {
    return "Not Enrolled";
  } else if (text.includes("We need more information")) {
    return "Need more information";
  } else {
    return "      ";
  }
}

// Extension başlatma ve durdurma butonu
const toggleButton = document.createElement("button");
toggleButton.textContent = "Start";

toggleButton.addEventListener("click", () => {
  if (isRunning) {
    isRunning = false;
    toggleButton.textContent = "Start";
    console.log("Extension stopping...");
  } else {
    console.log("Extension started.");
    toggleButton.textContent = "Stop";
    currentASINIndex = 0;
    processASINS();
  }
});

// Sayfaya buton ekleme
const controlButton = document.querySelector("#asin-count");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
buttonContainer.appendChild(toggleButton);
controlButton.insertBefore(buttonContainer, controlButton.firstChild);
