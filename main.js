var config = {
  apiKey: "AIzaSyB-s8RsyYdBjHF8SJ04JNRXI8OVfQto_PA",
  authDomain: "newzayavka-83646.firebaseapp.com",
  databaseURL:
    "https://newzayavka-83646-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "newzayavka-83646",
  storageBucket: "newzayavka-83646.appspot.com",
  messagingSenderId: "679522747496",
  appId: "1:679522747496:web:1e2aad09bf8ee3c95c67dd"
};
firebase.initializeApp(config);
const db = firebase.database();
const dataList = [];

db.ref().once("value", function (snapshot) {
  snapshot.forEach((data) => {
    dataList.push({
      name: data.val().name,
      variation: data.val().variation,
      action: data.val().action,
      code: data.val().code || ""
    });
  });
});

const nameInput = document.getElementById("name");
const autocompleteList = document.getElementById("name-list");
const variationInput = document.getElementById("variation");
const codeInput = document.getElementById("input-code");

nameInput.addEventListener("input", function () {
  autocompleteList.innerHTML = "";
  if (!this.value) return;
  const filteredData = dataList
    .filter((data) =>
      data.name.toLowerCase().includes(this.value.toLowerCase())
    )
    .sort(
      (a, b) =>
        a.name.toLowerCase().indexOf(this.value.toLowerCase()) -
        b.name.toLowerCase().indexOf(this.value.toLowerCase())
    );
  filteredData.forEach((data) =>
    autocompleteList.appendChild(
      new Option(
        `ВИ: ${data.variation} (Код: ${data.code}) (${data.action})`,
        data.name
      )
    )
  );
});

nameInput.addEventListener("change", function () {
  const selectedOption = dataList.find((data) => data.name === this.value);
  if (selectedOption) {
    variationInput.value = selectedOption.variation;
    codeInput.value = selectedOption.code;
  } else {
    variationInput.value = "";
    codeInput.value = "";
  }
});

variationInput.addEventListener("input", () => (codeInput.value = ""));

// Блокировка категории запасных частей
function handleCategoryChange() {
  var category = document.getElementById("category-3");
  var equipment = document.getElementById("equipment");

  if (category.checked) {
    equipment.disabled = false;
  } else {
    equipment.disabled = true;
    equipment.value = "";
  }
}

var categories = document.getElementsByName("category");
for (var i = 0; i < categories.length; i++) {
  categories[i].addEventListener("change", handleCategoryChange);
}



// Форма отправки
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var date = new Date().toLocaleDateString();
  const data = {
    date: date,
    category: form.elements.category.value,
    name: form.elements.name.value,
    variation: form.elements.variation.value,
    equipment: form.elements.equipment.value,
    article: form.elements.article.value,
    type: form.elements.type.value,
    userId: document.getElementById("user-id").value,
    code: document.getElementById("input-code").value
  };
  db.ref()
    .push(data)
    .then((docRef) => {
      console.log(`New ID: ${docRef.key}`);
      addItemToList(data, docRef.key);
    });
  form.reset();
});

let isDataLoaded = false;

db.ref().on("value", (snapshot) => {
  if (!isDataLoaded) {
    snapshot.forEach((itemData) => {
      if (itemData.key && itemData.key[0] === "-") {
        const data = itemData.val();
        console.log(data);
        addItemToList(data, itemData.key);
      }
    });
    isDataLoaded = true;
  }
});

function addItemToList(data, key) {
  const list = document.getElementById("list");
  const item = document.createElement("li");
  item.classList.add('list-item');


  item.innerHTML = `
    <span id="dateItem">${data.date}</span> 
    <span id="categoryItem">${data.category}</span> 
    <span id="nameyItem">${data.name}</span> 
    <span id="variationItem">${data.variation}</span> 
    <span id="typeItem">${data.type}</span> 
    <span id="equipmentItem">${data.equipment}</span>
    <span id="articleItem">${data.article}</span> 
    <span class="user-id-option">${data.userId}</span> 
    <span id="codeItem">${data.code}</span>
    ${data.code ? `<span id="status">Занесен</span>` : `<span id="status">Обработка</span>`}
    <svg class="disableButtons" id="readct" width="800px" height="800px" viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM10.95 17.51C10.66 17.8 10.11 18.08 9.71 18.14L7.25 18.49C7.16 18.5 7.07 18.51 6.98 18.51C6.57 18.51 6.19 18.37 5.92 18.1C5.59 17.77 5.45 17.29 5.53 16.76L5.88 14.3C5.94 13.89 6.21 13.35 6.51 13.06L10.97 8.6C11.05 8.81 11.13 9.02 11.24 9.26C11.34 9.47 11.45 9.69 11.57 9.89C11.67 10.06 11.78 10.22 11.87 10.34C11.98 10.51 12.11 10.67 12.19 10.76C12.24 10.83 12.28 10.88 12.3 10.9C12.55 11.2 12.84 11.48 13.09 11.69C13.16 11.76 13.2 11.8 13.22 11.81C13.37 11.93 13.52 12.05 13.65 12.14C13.81 12.26 13.97 12.37 14.14 12.46C14.34 12.58 14.56 12.69 14.78 12.8C15.01 12.9 15.22 12.99 15.43 13.06L10.95 17.51ZM17.37 11.09L16.45 12.02C16.39 12.08 16.31 12.11 16.23 12.11C16.2 12.11 16.16 12.11 16.14 12.1C14.11 11.52 12.49 9.9 11.91 7.87C11.88 7.76 11.91 7.64 11.99 7.57L12.92 6.64C14.44 5.12 15.89 5.15 17.38 6.64C18.14 7.4 18.51 8.13 18.51 8.89C18.5 9.61 18.13 10.33 17.37 11.09Z"/>
    </svg>
  <svg class="disableButtons" id="btnRemove" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17,4V5H15V4H9V5H7V4A2,2,0,0,1,9,2h6A2,2,0,0,1,17,4Z"></path><path d="M20,6H4A1,1,0,0,0,4,8H5V20a2,2,0,0,0,2,2H17a2,2,0,0,0,2-2V8h1a1,1,0,0,0,0-2ZM11,17a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm4,0a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Z"></path></svg>`;
    // Блокировка кнопок btnRemove и readct, если checkbox = on и code = ""
    if (data.status == "Оприходован") {
      item.querySelectorAll(".disableButtons").forEach(element => {
        element.classList.add('blocked');
      });
    }
  // Remove item from Firebase when remove button is clicked
  item.querySelector("#btnRemove").addEventListener("click", () => {
    db.ref(key).remove();
    item.remove();
  });

  // Show modal when read ct button is clicked
  item.querySelector("#readct").addEventListener("click", () => {
    const modal = document.createElement("div");
    const overlay = document.createElement('div');

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    modal.className = "modal";
    modal.classList.add('modalWindow');
    modal.innerHTML = 

    `   <div class="modal-body">
          <label for="dateModal">Дата</label><span id="dateModal">${data.date}</span>
          <label for="categoryModal">Категория</label><input id="categoryModal" value="${item.querySelector("#categoryItem").innerHTML}">
          <label for="nameModal">Наименование</label><input id="nameModal" value="${item.querySelector("#nameyItem").innerHTML}">
          <label for="variationModal">Вариант исполнения</label><input id="variationModal" value="${item.querySelector("#variationItem").innerHTML}">
          <label for="typeModal">Баз.ед.</label><input id="typeModal" value="${item.querySelector("#typeItem").innerHTML}">
          <label for="dequipmentModal">Оборудование</label><input id="equipmentModal" value="${item.querySelector("#equipmentItem").innerHTML}">
          <label for="articleModal">Статья</label><input id="articleModal" value="${item.querySelector("#articleItem").innerHTML}">
          <label for="userIdModal">ФИО</label><input id="userIdModal" value="${data.userId}">
          <label for="codeModal">Код</label><input id="codeModal" type="number" value="${item.querySelector("#codeItem").innerHTML}">
          <select id="status">
          <option value="${item.querySelector("#status").innerHTML}" selected>${item.querySelector("#status").innerHTML}</option>
          <option value="Занесен">Занесен</option>
          <option value="Оприходован">Оприходован</option>
          </select>
          <div>
          <button id="btnSave">Сохранить</button>
          <button id="cancel">Выйти</button>
          </div>
        </div>`;

    // Сохраняет в базу Firebase по кнопке btnSave
modal.querySelector("#btnSave").addEventListener("click", () => {
      const updatedData = {
      date: modal.querySelector("#dateModal").innerHTML,
      category: modal.querySelector("#categoryModal").value,
      name: modal.querySelector("#nameModal").value,
      variation: modal.querySelector("#variationModal").value,
      type: modal.querySelector("#typeModal").value,
      equipment: modal.querySelector("#equipmentModal").value,
      article: modal.querySelector("#articleModal").value,
      userId: modal.querySelector("#userIdModal").value,
      code: modal.querySelector("#codeModal").value,
      status: modal.querySelector("#status").value
      };
      db.ref(key).set(updatedData);
      
      // Update values in the list item
      item.querySelector("#dateItem").innerHTML = updatedData.date;
      item.querySelector("#categoryItem").innerHTML = updatedData.category;
      item.querySelector("#nameyItem").innerHTML = updatedData.name;
      item.querySelector("#variationItem").innerHTML = updatedData.variation;
      item.querySelector("#typeItem").innerHTML = updatedData.type;
      item.querySelector("#equipmentItem").innerHTML = updatedData.equipment;
      item.querySelector("#articleItem").innerHTML = updatedData.article;
      item.querySelector(".user-id-option").innerHTML = updatedData.userId;
      item.querySelector("#codeItem").innerHTML = updatedData.code;
      item.querySelector("#status").innerHTML = updatedData.status;
      document.body.classList.remove('overlay');
      document.body.removeChild(overlay);
    modal.remove();
    });
    
    
    // Remove modal when cancel button is clicked
    modal.querySelector("#cancel").addEventListener("click", () => {
      document.body.classList.remove('overlay');
    document.body.removeChild(overlay);
      modal.remove();
    });

    document.body.appendChild(modal);
  });

  list.appendChild(item);
}

//фильтр по списку
function filterList(searchValue) {
  const list = document.getElementById("list");
  const items = list.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    if (
      !searchValue ||
      items[i].textContent.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      items[i].style.display = "grid";
      items[i].classList.add("list-item");
    } else {
      items[i].style.display = "none";
    }
  }
}

const userSearch = document.getElementById("user-search");
userSearch.addEventListener("input", function () {
  filterList(userSearch.value);
});

//Запрашивает фамилию и записывает в user-id
var usernameModal = document.createElement('div');

usernameModal.classList.add('usernameModal');
usernameModal.innerHTML = '<input type="text" placeholder="Введите фамилию" autocomplete="on" id="surname"><button id="enter">Войти</button>';
document.body.appendChild(usernameModal);

var surname = document.getElementById('surname');
var enter = document.getElementById('enter');
var overlay = document.createElement('div');

overlay.classList.add('overlay');
document.body.appendChild(overlay);


enter.addEventListener('click', function() {

  if (surname.value === '' || surname.value === ' ') {
    alert('Введите фамилию');
    
  } else {
    document.getElementById("user-id").value = surname.value;
    document.body.removeChild(usernameModal);
    document.body.classList.remove('overlay');
    document.body.removeChild(overlay);
    
  };
});

