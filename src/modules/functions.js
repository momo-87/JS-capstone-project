// Getting data from the theMealDB API function
export const getMealData = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/search.php?f=c');
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
                            <button id = "CBtn${element.idMeal}" class = 'comment'>Comments</button>
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

// Getting likes data from the Involvement API function
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

// counter meals items function
export const counter = async () => {
  const request = new Request('https://themealdb.com/api/json/v1/1/search.php?f=c');
  const response = await fetch(request);
  const data = await response.json();
  return data.meals.length;
};

// Display the number of meal on the home page function
export const diplayNumberOfItems = (nbOfItems) => {
  const li = document.querySelector('li.number-of-items');
  li.textContent = `Meals(${nbOfItems})`;
};

// Populating popup window content function
export const PopupContent = (data, id) => {
  const popupBox = document.querySelector('.popup-window');
  data.forEach((element) => {
    if (element.idMeal === id) {
      popupBox.innerHTML = `<div class = "popup-wrapper flex-column">
                              <i class="fa-solid fa-xmark close-popup"></i>
                              <div class = 'popup-image-box'><img class = "popup-img" src = '${element.strMealThumb}' alt = 'meal'></div>
                              <h2>${element.strMeal}</h2>
                              <div class = "meal-infos">
                                <div><span>Area:</span> ${element.strArea}</div>
                                <div><span>Category:</span> ${element.strCategory}</div>
                                <div class = "instruction-box"><span>Instructions:</span> ${element.strInstructions}</div>
                              </div>
                              <hr>
                              <div class = "comments-section flex-column">
                                <h2 class = "comment-title">Comments (0)</h2>
                                <div class = "comments-box flex-column"></div>
                              </div>
                              <hr>
                              <h2 class = "add-comment">Add a comment</h2>
                              <form class = "add-comment flex-column">
                                <label for = "userName"></label>
                                <input id = "userName" class = "user-name" type = "text", required, placeholder = "Your name">
                                <p class = "user-name-error"></p>
                                <label for = "textArea"></label>
                                <textarea id = "textarea" class = "insights" required, placeholder = "Your insights"></textarea>
                                <p class = "insights-error"></p>
                                <button class = "submit-comment">Comment</button>
                              </form>
                            </div>
                            `;
    }
  });
};

// Throw error message function
export const errorMsg = (userName, insights) => {
  const p1 = document.querySelector('p.user-name-error');
  const p2 = document.querySelector('p.insights-error');
  if (!userName) {
    p1.innerHTML = 'required field';
    p1.style.color = 'red';
    p1.style.fontSize = '0.9rem';
  } else {
    p1.innerHTML = '';
  }
  if (!insights) {
    p2.innerHTML = 'required field';
    p2.style.color = 'red';
    p2.style.fontSize = '0.9rem';
  } else {
    p2.innerHTML = '';
  }
};

// Add comment to API function
export const addComment = async (id, userName, insights) => {
  const request = new Request('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/R20mJzx45L3RyqatiuEZ/comments');
  await fetch(request, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      item_id: id,
      username: userName,
      comment: insights,
    }),
  });
};

// Getting comment data from the Involvement API function
export const getCommentData = async (id) => {
  const request = new Request(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/R20mJzx45L3RyqatiuEZ/comments?item_id=${id}`);
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

// populating comment data function
export const populateComments = (data) => {
  const commentsBox = document.querySelector('div.comments-box');
  data.forEach((element) => {
    if (element.creation_date && element.username && element.comment) {
      const p = document.createElement('p');
      p.textContent = `${element.creation_date} ${element.username}: ${element.comment}`;
      commentsBox.appendChild(p);
    }
  });
};

// counter comment function
export const commentcounter = async (id) => {
  const request = new Request(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/R20mJzx45L3RyqatiuEZ/comments?item_id=${id}`);
  const response = await fetch(request);
  const data = await response.json();
  // Since some data objects are empty:
  let n = 0;
  if (data.length) {
    data.forEach((element) => {
      if (element.creation_date && element.username && element.comment) {
        n += 1;
      }
    });
  }
  return n;
};

// Display the number of comment on the popup window function
export const diplayNumberOfComments = (nbOfItems) => {
  const h2 = document.querySelector('h2.comment-title');
  h2.textContent = `comments (${nbOfItems})`;
};