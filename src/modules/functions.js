// Get data from API and render the DOM
const populatedishes = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/filter.php?a=Canadian');
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.meals);
  const foodListSection = document.querySelector('.food-list');
  // Create foodCard and append it to foodListSection
  data.meals.forEach((element) => {
    const foodCard = document.createElement('div');
    foodCard.classList.add('food-card', 'flex-column');
    foodCard.innerHTML = `<div class = 'image-box'><img src = '${element.strMealThumb}' alt = 'meal'></div>
                          <div class = 'flex-row meal-title-and-interactions-box'>
                            <h2 class = 'meal-name'>${element.strMeal}</h2>
                            <span><i class="fa-sharp fa-solid fa-heart" style="color: #8b4513;"></i></span><span class = 'likes'>1000 likes</span>
                          </div>
                          <div class = "buttons-box flex-row">
                            <button class = 'comment'>Comments</button>
                            <button class = 'Reservation'>Reservation</button>
                          </div>
                          <hr>
                          `;
    foodListSection.appendChild(foodCard);
  });
};
export default populatedishes;
