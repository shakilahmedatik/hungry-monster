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
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          const mealItem = `
                        <div class="col">
                            <div class="border rounded shadow">
                                <div class="card details-btn" data-id="${meal.idMeal}">
                                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                                    <div class="card-body" data-id="${meal.idMeal}">
                                        <p class="card-text mini-title text-center fw-bold">${meal.strMeal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
`;
          mealContainer.innerHTML += mealItem;
        });
      } else {
        alert("Sorry, we couldn't find any meal!");
      }
    });
}

//Show Details of Meal
detailsBtn.addEventListener("click", function (e) {
  if (
    e.target.parentElement.classList.contains("details-btn") ||
    e.target.tagName == "P"
  ) {
    let mealItem = e.target.parentElement;
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
                       <h3 class="mt-3 card-title main-title meal-name">${meal.strMeal}</h3>
                       <h5 class="mt-3 mini-title card-title">Ingredients</h5>
                    </div>
                      <u10 class="list-group list-group-flush ">
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient1}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient2}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient3}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient4}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient5}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient6}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient7}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient8}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient9}</li>
                      <li class="list-group-item"><i class="fas fa-check-square"></i>  ${meal.strIngredient10}</li>
                    </u10>
      `;
          detailsCard.innerHTML = html;
        });

        mealItems.hidden = true;
        document.querySelector(".search-box").hidden = true;
        document.querySelector(".meal-item-details").hidden = false;
      })
      .catch((err) => console.log(""));
  }
});

//Stopping form to submit
function mySubmitFunction(e) {
  e.preventDefault();
  someBug();
  return false;
}

//Load recommended meals
updateUi();
