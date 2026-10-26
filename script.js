document.addEventListener("DOMContentLoaded", () => {

  initProfileMenu();
  initReservationForm();
  loadMenuFromAdmin();
  renderCart();

});



function toggleGCash(){



  const payment =

  document.getElementById("cPayment").value;



  const gcashField =

  document.getElementById("gcashField");



  if(

    payment === "GCash" ||

    payment === "Maya"

  ){

    gcashField.style.display = "block";

  }

  else{

    gcashField.style.display = "none";

  }



}



const profileBtn = document.getElementById("profileBtn");

const profileMenu = document.getElementById("profileMenu");



profileBtn.addEventListener("click", () => {

  profileMenu.classList.toggle("show");

});



window.addEventListener("click", (e) => {

  if (!document.getElementById("profileWrapper").contains(e.target)) {

    profileMenu.classList.remove("show");

  }

});





/* ================================

PROFILE

================================ */

function initProfileMenu() {

  const wrapper = document.getElementById("profileWrapper");

  const btn = document.getElementById("profileBtn");



  if (!wrapper || !btn) return;



  btn.onclick = (e) => {

    e.stopPropagation();

    wrapper.classList.toggle("open");

  };



  document.onclick = (e) => {

    if (!wrapper.contains(e.target)) {

      wrapper.classList.remove("open");

    }

  };

}

/* ================================

   MENU TAB

================================ */

function openMenu(menuId, el) {

  document.querySelectorAll(".menu").forEach(m => m.style.display = "none");

  document.getElementById(menuId).style.display = "block";



  document.querySelectorAll(".tablink").forEach(t => t.classList.remove("active"));

  el.classList.add("active");

}



/* ================================

   MENU FROM ADMIN

================================ */

function loadMenuFromAdmin() {

  let menu = JSON.parse(localStorage.getItem("menu")) || [];



  // default items (first load only)

  if (menu.length === 0) {

    menu = [
      {
        name:"Brown Sugar Milk Tea",
        description:"Creamy milk tea blended with brown sugar and chewy tapioca pearls.",
        price:129,
        img:"images/b.1.jpg",
        category:"Milk Tea"
      },
    
      {
        name:"Classic Pearl Milk Tea",
        description:"Smooth and refreshing milk tea served with chewy tapioca pearls.",
        price:119,
        img:"images/b.2.jpg",
        category:"Milk Tea"
      },
    
      {
        name:"Wintermelon Milk Tea",
        description:"Sweet and creamy wintermelon milk tea with a refreshing flavor.",
        price:125,
        img:"images/b.3.jpg",
        category:"Milk Tea"
      },
    
      {
        name:"Matcha Milk Tea",
        description:"Rich and creamy matcha combined with smooth milk tea.",
        price:139,
        img:"images/b.4.jpg",
        category:"Milk Tea"
      },
    
      {
        name:"Strawberry Refresher",
        description:"A fruity and refreshing strawberry drink perfect for a cool afternoon.",
        price:129,
        img:"img/k1.jpg",
        category:"Refreshers"
      },
    
      {
        name:"Mango Refresher",
        description:"Sweet tropical mango flavor mixed into a refreshing chilled drink.",
        price:129,
        img:"images/i.2.jpg",
        category:"Refreshers"
      },
    
      {
        name:"Blueberry Refresher",
        description:"A cool and fruity blueberry drink with a sweet and refreshing taste.",
        price:129,
        img:"images/i.5.jpg",
        category:"Refreshers"
      }
    ];

    localStorage.setItem("menu", JSON.stringify(menu));

  }



  const hot = document.getElementById("hotList");

  const iced = document.getElementById("icedList");



  hot.innerHTML = "";

  iced.innerHTML = "";



  menu.forEach(item => {

    const card = `

  <div class="menu-item">

    <img
      src="${item.img}"
      alt="${item.name}"
    >

    <h5>${item.name}</h5>

    <p class="menu-description">
      ${item.description || "A delicious choice from Aria's Cafe."}
    </p>

    <p class="menu-price">
      ₱${item.price}
    </p>

    <button
      class="order-btn"
      onclick="addToCart(
        '${item.name.replace(/'/g, "\\'")}',
        ${item.price},
        '${item.img}'
      )"
    >
      Order
    </button>

  </div>

`;



    if (item.category === "Milk Tea") hot.innerHTML += card;

    else iced.innerHTML += card;

  });

}



/* ================================

   CART

================================ */

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getUserKey(prefix) {
  const user = getCurrentUser();

  if (!user || !user.email) {
    return null;
  }

  return prefix + "_" + user.email;
}

function getUserCart() {
  const key = getUserKey("cartItems");

  if (!key) {
    return {};
  }

  return JSON.parse(localStorage.getItem(key)) || {};
}

let cartItems = getUserCart();

function saveCart() {
  const key = ge
