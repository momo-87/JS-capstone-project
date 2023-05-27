// import style from style.css file (required)
import './style.css';

// import the required functions from module
import {
  getMealData, populatedishes, addLike, getLikesData, diplayLikes, counter, diplayNumberOfItems,
  PopupContent, errorMsg, addComment, getCommentData, populateComments, commentcounter,
  diplayNumberOfComments,
} from './modules/functions.js';

// Getting data from the theMealDB API
const mealData = await getMealData();

// Getting data from the Involvement API function
const likesData = await getLikesData();

// Populating items in the home page
populatedishes(mealData);

// Getting and diplaying the number of items
const nbOfItems = await counter();
diplayNumberOfItems(nbOfItems);

// Diplaying likes data in the home page
mealData.forEach((element) => {
  diplayLikes(likesData, `M${element.idMeal}`);
});

const foodListSection = document.querySelector('.food-list');
// Add event listener to the like icon and open comment button
foodListSection.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target && e.target.matches('i.heart')) {
    const targetId = e.target.id;
    await addLike(targetId);
    const likesData = await getLikesData();
    diplayLikes(likesData, targetId);
  } else if (e.target && e.target.matches('button.comment')) {
    const targetId = e.target.id;
    const idMeal = targetId.replace('CBtn', '');
    PopupContent(mealData, idMeal);

    // We need to use the prefix M because we initially used it to post likes in the API
    const itemId = targetId.replace('CBtn', 'M');

    // Getting and displaying the number of comments
    const nbComments = await commentcounter(itemId);
    diplayNumberOfComments(nbComments);

    // Get comment the corresponding comment data from the API
    const commentData = await getCommentData(itemId);

    // Populate comment data in the popup window after checking that data is not empty
    if (commentData.length) {
      populateComments(commentData);
    }

    // Add event listener to the submit comment button
    const submitCommentBtn = document.querySelector('button.submit-comment');
    submitCommentBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userName = document.querySelector('input.user-name').value;
      const insights = document.querySelector('textarea.insights').value;
      if (!userName || !insights) {
        errorMsg(userName, insights);
      }
      await addComment(itemId, userName, insights);
      document.querySelector('input.user-name').value = '';
      document.querySelector('textarea.insights').value = '';

      // Clean the board
      document.querySelector('div.comments-box').innerHTML = '';
      // Gettint the updated comment data from the API and populate
      const commentData = await getCommentData(itemId);
      // Repopulate using the updated comment data
      populateComments(commentData);

      // Getting and displaying the number of comments
      const nbComments = await commentcounter(itemId);
      diplayNumberOfComments(nbComments);
    });
  }
});

// Add event listener to close popup icon
const popupWindow = document.querySelector('.popup-window');
popupWindow.addEventListener('click', (e) => {
  if (e.target && e.target.matches('i.close-popup')) {
    popupWindow.innerHTML = '';
  }
});
