// api to fetch: https://pokeapi.co/api/v2/pokemon?limit=100&offset=0
// api to fetch particula: https://pokeapi.co/api/v2/pokemon/ditto
let BASE_API = "https://pokeapi.co/api/v2/pokemon";

// Fetch Data on page load
const FetchDataOnLoad = async () => {
  const result = await fetch(`${BASE_API}?limit=20&offset=0`)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => console.log("Error :", err));

  // Call to populate data in select dropdown
  PopulateData(result);
};

// Function to populate data in select dropdown
const PopulateData = (result) => {
  let cached = {};

  const selectDrop = document.getElementById("selectDrop");
  result.forEach((res) => {
    let option = document.createElement("option");
    option.value = res.name;
    option.innerText = res.name;
    selectDrop.appendChild(option);
  });

  FetchOnChange(cached);
};

// Function to populate Details on on-change
const FetchOnChange = (cached) => {
  const selectDrop = document.getElementById("selectDrop");

  selectDrop.addEventListener("change", async (e) => {
    let pokName = e.target.value;
    let detailArea = document.querySelector(".selectDetails");
    detailArea.innerHTML = "";

    if (cached[pokName]) {
      detailArea.appendChild(cached[pokName]);
    } else {
      let result = await fetch(`${BASE_API}/${pokName}`)
        .then((res) => res.json())
        .then((data) => data.abilities)
        .catch((err) => console.log("Error :", err));

      let ulList = document.createElement("ul");
      result.map((res) => {
        let listItems = document.createElement("li");
        listItems.innerText = res.ability.name;
        ulList.appendChild(listItems);
      });

      detailArea.appendChild(ulList);
      cached[pokName] = ulList;
    }
  });
};

FetchDataOnLoad();
