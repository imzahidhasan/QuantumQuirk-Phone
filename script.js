function getById(id) {
  const element = document.getElementById(id);
  return element;
}

async function getDate(searchText) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  const phones = data.data;
  displayPhone(phones);
}

const displayPhone = (phones) => {
  getById("phone-container").innerText = "";
  if (phones.length > 12) {
    getById("showAllBtn").classList.remove("hidden");
  } else {
    getById("showAllBtn").classList.add("hidden");
  }
  phones = phones.slice(0, 12);
  phones.forEach((element) => {
    let phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-base-100 shadow-xl mx-auto ";
    phoneCard.innerHTML = ` <figure><img class='p-5' src="${element?.image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 id="phone-name" class="card-title justify-center">${element?.phone_name}</h2>
                    <p class='text-center'>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                        <button  onclick="detailsBtn('${element?.slug}');details_modal.showModal() "  id="details-btn" class="btn btn-primary">Details</button>
                    </div>
                </div>`;
    getById("phone-container").appendChild(phoneCard);
  });
  loadingSpinner(false);
};

const getInputValue = () => {
  const inputValue = getById("input-field").value;
  return inputValue;
};

getById("search-btn").addEventListener("click", () => {
  loadingSpinner(true);
  getDate(getInputValue());
});

const loadingSpinner = (isDataLoaded) => {
  if (isDataLoaded) {
    getById("loading-spinner").classList.remove("hidden");
  } else {
    getById("loading-spinner").classList.add("hidden");
  }
};

async function detailsBtn(id) {
  const getData = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const phoneData = await getData.json();
  const phoneInfo = phoneData.data;
  console.log(phoneInfo);
  getById("phoneImage").src=phoneInfo.image;
  getById("phoneName").innerText = phoneInfo?.name;
  getById("Display-Size").innerText = `Display Size:  ${
    phoneInfo?.mainFeatures?.displaySize || "Not Available"
  }`;
  getById(
    "Chipset"
  ).innerText = `Chipset:  ${phoneInfo?.mainFeatures?.chipSet}`;
  getById("Memory").innerText = `Memory:  ${
    phoneInfo?.mainFeatures?.memory || "Not Available"
  }`;
  getById("Slug").innerText = `Slug:  ${phoneInfo?.slug}`;
  getById("storage").innerText = `Storage:  ${
    phoneInfo?.storage || "Not Available"
  }`;
  getById("storage").innerText = `Chip set:  ${
    phoneInfo?.mainFeatures?.chipSet || "Not Available"
  }`;
  getById(
    "Release-data"
  ).innerText = `Release Date:  ${phoneInfo?.mainFeatures?.releaseDate || "Not Available"}`;
}
