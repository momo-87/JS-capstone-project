// Getting data from the theMealDB API function
export const getMealData = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/filter.php?a=Canadian');
  const response = await fetch(request);
  const data = await response.json();
  return data.meals;
};

// Populating items in the DOM function
export const populatedishes = async (mealData) => {
  const foodListSection = document.querySelector('.food-list');
  mealData.forEach((element) => {
    const foodCard = document.createElement('div');
    foodCard.classList.add('food-card', 'flex-column');
    foodCard.innerHTML = `<div class = 'image-box'><img src = '${element.strMealThumb}' alt = 'meal'></div>
                          <div class = 'flex-row meal-title-and-interactions-box'>
                            <h2 class = 'meal-name'>${element.strMeal}</h2>
                            <i id ="M${element.idMeal}" class="fa-sharp fa-solid fa-heart heart" style="color: #8b4513;"></i><span id ="L${element.idMeal}" class = "likes">0 likes</span>
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

// Create new app function
export const newApp = async () => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/');
  await fetch(request, {
    method: 'POST',
  });
};

// Add likes to API function
export const addLike = async (targetId) => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/R20mJzx45L3RyqatiuEZ/likes/');
  await fetch(request, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      item_id: targetId,
    }),
  });
};

// Getting data from the Involvement API function
export const getLikesData = async () => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/R20mJzx45L3RyqatiuEZ/likes/');
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

// Diplaying likes data in the home page function
export const diplayLikes = async (likesData, itemId) => {
  likesData.forEach((element) => {
    if (element.item_id === itemId) {
      // Replace M from the i tag id by L for obtaining the span id
      const likeId = itemId.replace('M', 'L');
      const span = document.querySelector(`#${likeId}`);
      span.textContent = `${element.likes} likes`;
    }
  });
};
