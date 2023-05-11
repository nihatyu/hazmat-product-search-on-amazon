// Bekleme fonksiyonu
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitBeforeStart() {
  await sleep(10000);
  //   const radioSelector =
  //     "#seller_intent_radio_option_0 > div > label > input[type=radio]";
  //   const radioInput = document.querySelector(radioSelector);
  //   console.log("radioSelector", radioInput);
  await performAutomation();
}

// ASINS dizisi
const ASINS = ["B07Q3XL4MR", "B0BTM2J5L7", "B07BZP1L7F"];

// Ana fonksiyon
async function performAutomation() {
  for (const asin of ASINS) {
    // Birinci adım

    const checkAsinWindow = "#title-link > div > div:nth-child(1) > a";
    const checkAsinEnter = document.querySelector(checkAsinWindow);
    checkAsinEnter.click();
    console.log("check asin tamam!");
    await sleep(10000);

    const radioSelector =
      "#seller_intent_radio_option_0 > div > label > input[type=radio]";
    const radioInput = document.querySelector(radioSelector);
    radioInput.click();
    console.log("radio tamam!");
    await sleep(2000);

    // İkinci adım
    const announceSelector = "#-announce";
    const announceInput = document.querySelector(announceSelector);
    announceInput.click();
    console.log("next button tamam!");
    await sleep(5000);

    // Üçüncü adım
    const itemSelector = "#item_id";

    const itemInput = document.querySelector(itemSelector);
    itemInput.value = asin;
    console.log("inputa asin girişi tamam!");
    await sleep(3000);

    // Dördüncü adım
    const continueSelector = "#continue_task_18ie4by-announce";
    const continueButton = document.querySelector(continueSelector);
    continueButton.click();
    console.log("search button tamam!");
    await sleep(5000);
  }
}

// Ana fonksiyonu çağırma
waitBeforeStart();
