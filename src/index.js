import icon from './close.png';
import './style.css';
import './comment.css';
import './reservations.css';

const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appId = 'AZT0GFy9XFpC4qapJXTL';

// Comments popup
const commentCounter = () => {
  const commentsArr = document.querySelectorAll('.comment-item');
  const commentsHeader = document.querySelector('#comments-head');
  if (commentsArr) {
    commentsHeader.textContent = `Comments (${commentsArr.length}) by previous visitors`;
  } else {
    commentsHeader.textContent = 'Comments (0) by previous visitors';
  }
};

const commentsLoad = (itemId) => {
  fetch(`${url}${appId}/comments?item_id=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        const itemArr = json;
        const commentsDiv = document.querySelector('#comments');
        let commentsHtml = '';
        itemArr.forEach((item) => {
          commentsHtml += `<p class="comment-item">${item.creation_date} by ${item.username} : ${item.comment}`;
        });
        commentsDiv.innerHTML = commentsHtml;
        commentCounter();
        return 0;
      }
      return 0;
    });
};

const commentUpload = (obj) => {
  fetch(`${url}${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(() => {

    });
};

const loadPopupCommentPage = (itemId, popupNode) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      const meal = json.meals[0];
      const popupHtml = `
            <div class="con">
            <i class="fas fa-times fa-2x" id="back-menu"></i>
                <div id="img-comment" class="img-comment">
                <img src="${meal.strMealThumb}" alt="meal-img">
                <h5>${meal.strMeal}</h5>
                </div>
                <div id="info-item-comment" class="item-info">
                <div class="ingredient">
                <h5>Ingredients</h5>
                <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                </ul>
                </div>
                <div class="instructions"> 
                <h5>Instruction <i class="fas fa-note"></i></h5>
                    <p> ${meal.strInstructions}</p>
                    </div>
                <div class="source">    
                <a href=${meal.strSource} target="_blank">See more about this meal <i class="fas fa-arrow-right"></i></a>
                </div>
                </div>
                <h4 id="comments-head">Comments By previous Visitors</h4>
                <div id="comments" class="comments"></div>
                <div id="form-comment" class="form-comment">
                <form id="comment-form">
                <div class="form-group">
                <input type="text" class="form-control" id="your-name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                <textarea class="form-control" id="your-comments" name="comment" placeholder="Your comment" required></textarea>
                </div>
                <div class="button">
                <button type="submit" class="btn-submit">Comment</button>
                </div>
                </form>
                </div>
                </div>
                `;
      popupNode.innerHTML = popupHtml;
      commentsLoad(meal.idMeal);

      const commentForm = document.querySelector('#comment-form');
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentObj = {
          item_id: meal.idMeal,
          username: commentForm.name.value,
          comment: commentForm.comment.value,
        };
        commentUpload(commentObj);
        commentForm.name.value = '';
        commentForm.comment.value = '';
        setTimeout(() => { commentsLoad(meal.idMeal); }, 500);
      });

      const header = document.querySelector('header');
      const main = document.querySelector('.row');
      const footer = document.querySelector('footer');
      const popupComment = document.querySelector('#popup-comment');

      const goBack = document.querySelector('#back-menu');
      goBack.addEventListener('click', () => {
        popupNode.innerHTML = '';
        header.style.filter = 'none';
        main.style.filter = 'none';
        footer.style.filter = 'none';
        popupComment.style.display = 'none';
      });
    });
};

// Reservations
const resUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/AZT0GFy9XFpC4qapJXTL/reservations/';

let list;

const getReservations = async (id) => {
  const response = await fetch(`${resUrl}?item_id=${id}`);
  const scores = response.json();
  return scores;
};

// Home Page
const getFood = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese');
  response.json().then((json) => {
    const itemArr = json.meals;
    list = itemArr;
    itemArr.forEach((item) => {
      const container = document.querySelector('#items');
      const card = document.createElement('div');
      card.innerHTML = `<div class="card">
<img src=${item.strMealThumb} class="meal-img" alt="item image" id="${item.idMeal}">
<div class="item-dishes">
<p class="dishes-name">${item.strMeal}</p><div class="item-like">
<a class="heart-btn"><img id="${item.idMeal}" class="heart fa-heart" src="https://www.pngmagic.com/product_images/red-heart-png.png"/></a><div class="likes-span" id="likes-span">likes</div>
</div>
</div>
<button class="btn btn-comment">Comment</button>
<button class="btn btn-reserve" id="${item.idMeal}">Reservations</button>
</div>`;
      container.appendChild(card);
    });

    const itemsCounter = () => {
      const totalItems = document.querySelector('.total-items');
      const totalNum = document.createElement('p');
      totalNum.textContent = `${itemArr.length} dishes`;
      totalItems.appendChild(totalNum);
    };

    itemsCounter();

    const header = document.querySelector('header');
    const main = document.querySelector('.row');
    const footer = document.querySelector('footer');
    const popupComment = document.querySelector('#popup-comment');
    const commentBtn = document.querySelectorAll('.btn-comment');

    commentBtn.forEach((item) => {
      item.addEventListener('click', () => {
        header.style.filter = 'blur(4px)';
        main.style.filter = 'blur(4px)';
        footer.style.filter = 'blur(4px)';
        popupComment.style.display = 'block';

        const itemId = item.parentNode.parentNode.querySelector('img').id;

        loadPopupCommentPage(itemId, popupComment);
      });
    });
    const title = document.querySelector('title');
    const reservationtBtn = document.querySelectorAll('.btn-reserve');
    let counter = 0;
    reservationtBtn.forEach((item) => {
      item.addEventListener('click', () => {
        const resList = getReservations(item.id);
        header.style.filter = 'blur(4px)';
        main.style.filter = 'blur(4px)';
        footer.style.filter = 'blur(4px)';
        title.style.filter = 'blur(4px)';

        const index = list.findIndex((items) => items.idMeal === item.id);
        const modal = document.createElement('div');
        modal.className = 'modal';
        const s = document.createElement('section');
        s.className = 'modal-con';
        const xBtn = document.createElement('button');
        xBtn.className = 'x-con';
        xBtn.addEventListener('click', () => {
          xBtn.parentElement.parentElement.remove();
          header.style.filter = 'blur(0px)';
          main.style.filter = 'blur(0px)';
          footer.style.filter = 'blur(0px)';
          popupComment.style.display = 'none';
        });
        const xImg = document.createElement('img');
        xImg.src = `${icon}`;
        xImg.className = 'exit-icon';
        const foodImg = document.createElement('img');
        foodImg.src = `${list[index].strMealThumb}`;
        foodImg.className = 'meal-img';
        foodImg.id = `${list[index].idMeal}img`;
        const h2 = document.createElement('h2');
        h2.className = 'dishes-name';
        h2.innerText = `${list[index].strMeal}`;
        const h3 = document.createElement('h3');
        h3.innerText = 'Reservations(0)';
        const ul = document.createElement('ul');
        let resCounter = 0;
        resList.then((data) => {
          data.forEach((item) => {
            const li = document.createElement('li');
            li.innerText = `${item.date_start} - ${item.date_end} by ${item.username}`;
            ul.appendChild(li);
            resCounter += 1;
          });
          h3.innerText = `Reservations(${resCounter})`;
        });
        const h32 = document.createElement('h3');
        h32.innerText = 'Add a reservation';
        const form = document.createElement('form');
        form.id = 'form';
        const name = document.createElement('input');
        name.placeholder = 'Your name';
        const Sdate = document.createElement('input');
        Sdate.placeholder = 'Start date';
        const Edate = document.createElement('input');
        Edate.placeholder = 'End date';
        const Rbtn = document.createElement('button');
        Rbtn.innerText = 'Reserve';
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const updateRes = async () => {
            await fetch(`${resUrl}?item_id=${item.id}`, {
              method: 'POST',
              body: JSON.stringify({
                item_id: item.id,
                username: name.value,
                date_start: Sdate.value,
                date_end: Edate.value,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((response) => response.json());
          };
          updateRes();

          const li = document.createElement('li');
          li.innerText = `${Sdate.value} - ${Edate.value} by ${name.value}`;
          ul.appendChild(li);
          counter += 1;
          h3.innerText = `Reservations(${counter})`;
          form.reset();
        });

        xBtn.appendChild(xImg);
        form.appendChild(name);
        form.appendChild(Sdate);
        form.appendChild(Edate);
        form.appendChild(Rbtn);

        s.appendChild(xBtn);
        s.appendChild(foodImg);
        s.appendChild(h2);
        s.appendChild(h3);
        s.appendChild(ul);
        s.appendChild(h32);
        s.appendChild(form);
        modal.appendChild(s);

        document.body.appendChild(modal);
      });
    });
  });

  const likeapi = async (itemid) => {
    await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u5hTYi8ovx2g46awgwdi/likes/', {
      method: 'POST',
      body: JSON.stringify({
        item_id: itemid,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response);
    window.location.reload();
  };

  const Displaylikes = async () => {
    const liked = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/u5hTYi8ovx2g46awgwdi/likes')
      .then((response) => response.json())
      .then((data) => data);
    const totalLikes = document.querySelectorAll('.likes-span');
    liked.forEach((e, i) => {
      if (liked !== 0) {
        totalLikes[i].textContent = `${e.likes} likes`;
      } else {
        totalLikes[i].textContent = '0 likes';
      }
    });
  };

  Displaylikes();

  const like = () => {
    const likeBtn = document.querySelectorAll('.heart');
    const arrlikeBtn = Array.from(likeBtn);
    arrlikeBtn.forEach((element) => {
      element.addEventListener('click', () => {
        likeapi(element.id);
      });
    });
  };

  setTimeout(() => like(), 500);
};

getFood();
