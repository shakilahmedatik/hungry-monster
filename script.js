const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let mealContainer = document.querySelector(".meal-container");
let mainTitle = document.querySelector(".main-title");

//Handle Search Button Event
searchBtn.addEventListener("click", () => {
  mainTitle.innerText = `Search Results for ${searchBar.value}`;
  updateUi();
  searchBar.value = "";
});

//Update Meal Items in the UI
function updateUi() {
  mealContainer.innerHTML = "";
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBar.value}`
  )
    .then((response) => response.json())
    .then((data) =>
      data.meals.forEach((meal) => {
        const mealItem = `
                        <div class="col">
                            <div class="border rounded bg-light">
                                <div class="card" ">
                                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <p class="card-text text-center fw-bold">${meal.strMeal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
`;
        mealContainer.innerHTML += mealItem;
      })
    )
    .catch((err) => console.log(err));
}

//Stopping form to submit
function mySubmitFunction(e) {
  e.preventDefault();
  someBug();
  return false;
}

//Load recommended meals
updateUi();
