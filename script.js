const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let mealContainer = document.querySelector(".meal-container");
let mainTitle = document.querySelector(".main-title");
const mealItems = document.querySelector(".meal-items");
const detailsBtn = document.querySelector(".details-btn");

mealItems.hidden = false;
document.querySelector(".search-box").hidden = false;
document.querySelector(".meal-item-details").hidden = true;

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
                        <div class="col details-btn" data-id = "${meal.idMeal}">
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
    );
}

//Show Details of Meal
detailsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let mealItem = e.target.parentElement.parentElement.parentElement;
  console.log(mealItem.dataset.id);

  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  )
    .then((response) => response.json())
    .then((data) => {
      let detailsCard = document.querySelector(".list-card");
      data.meals.forEach((meal) => {
        const html = `
                    <div class="card-img">
                      <img src="${meal.strMealThumb}"
                        class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                       <h3 class="mt-3 card-title meal-name">${meal.strMeal}</h3>
                       <h5 class="mt-3 card-title">Ingredients</h5>
                    </div>
                      <ul class="list-group list-group-flush ">
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient1}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient2}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient3}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient4}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient5}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient6}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient7}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient8}</li>
                    </ul>
      `;
        detailsCard.innerHTML = html;
      });
    });

  mealItems.hidden = true;
  document.querySelector(".search-box").hidden = true;
  document.querySelector(".meal-item-details").hidden = false;
});

//Stopping form to submit
function mySubmitFunction(e) {
  e.preventDefault();
  someBug();
  return false;
}

//Load recommended meals
updateUi();
