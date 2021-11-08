export class IFAWts {
  constructor() {
    console.log("IFAWts: constructor");
    this.recipientsContainer = document.querySelector(".en__contacts");
    this.init();
  }
  init() {
    console.log("IFAWts: init");
    this.uncheckRecipients();
    this.writeEcardList();
    this.checkRandomCardItem();
    this.updateSelectedRecipients();
  }
  uncheckRecipients() {
    console.log("IFAWts: unCheckRecipients");
    this.recipientsContainer.querySelectorAll("input").forEach((e) => {
      e.checked = false;
    });
  }
  writeEcardList() {
    console.log("IFAWts: writeEcardList");
    let ecardList = document.querySelector("#ecard-list");
    let ecardListHtml = "";
    this.recipientsContainer
      .querySelectorAll(".en__contactDetails__custom p")
      .forEach((e) => {
        let recipientName = e.innerText.split("@")[0].trim();
        let recipientClass = recipientName.replace(" ", "-").toLowerCase();
        ecardListHtml += `<li class="card ${recipientClass}">
        <img src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/1720/ts-${recipientClass}.jpg" alt="${recipientName}">
        <span class="recipient-name">${recipientName
          .split(" ")
          .slice(-1)}</span>
          <span class="checked-mark">
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.736 0 2.948 3.6 1.264 2 0 3.2l2.526 2.4.422.4L8 1.2 6.736 0z" fill="#fff"/>
            </svg>
          </span>
        </li>`;
      });
    ecardList.innerHTML = "<ul>" + ecardListHtml + "</ul>";
    ecardList.querySelectorAll("li").forEach((e) => {
      e.addEventListener(
        "click",
        (event) => {
          this.clickEcardItem(event);
        },
        false
      );
    });
  }
  clickEcardItem(event) {
    console.log("IFAWts: clickEcardItem");
    const clickedElement = event.target.closest(".card");
    const index = [...clickedElement.parentElement.children].indexOf(
      clickedElement
    );
    const checkBox = document
      .querySelector(".en__contacts")
      .children[index].querySelector("input");
    checkBox.checked = !checkBox.checked;
    if (checkBox.checked) {
      clickedElement.classList.add("active");
      const eCardBackgroundDiv = document.querySelector(
        ".page-backgroundImage"
      );
      const img = clickedElement.querySelector("img").src;
      eCardBackgroundDiv.style.setProperty(
        "--engrid__page-backgroundImage_url",
        "url('" + img + "')"
      );
    } else {
      clickedElement.classList.remove("active");
    }
    this.updateSelectedRecipients();
  }
  checkRandomCardItem() {
    console.log("IFAWts: randomCardItem");
    const randomIndex = Math.floor(
      Math.random() * this.recipientsContainer.children.length
    );
    const checkBox =
      this.recipientsContainer.children[randomIndex].querySelector("input");
    checkBox.checked = !checkBox.checked;
    const clickedElement =
      document.querySelector("#ecard-list ul").children[randomIndex];
    clickedElement.classList.add("active");
    const eCardBackgroundDiv = document.querySelector(".page-backgroundImage");
    const img = clickedElement.querySelector("img").src;
    eCardBackgroundDiv.style.setProperty(
      "--engrid__page-backgroundImage_url",
      "url('" + img + "')"
    );
  }
  updateSelectedRecipients() {
    const selectedRecipients = document.querySelectorAll(
      ".en__contacts input:checked"
    );
    let selectedRecipientsHtml = [];
    selectedRecipients.forEach((element) => {
      const recipientIntex = [...this.recipientsContainer.children].indexOf(
        element.closest(".en__contact")
      );
      const recipientName = document
        .querySelector("#ecard-list ul")
        .children[recipientIntex].querySelector(".recipient-name").innerText;
      selectedRecipientsHtml.push(recipientName);
    });
    let selectedRecipientsText = selectedRecipientsHtml.join(", ");
    document.querySelector(".selected-recipients").innerText =
      selectedRecipientsText;
  }
}