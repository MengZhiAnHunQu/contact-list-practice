//1 get apiUrl
const apiUrl = "https://randomuser.me/api/?";

// create an array for storing api data
let usrArgs = [];
let phoneNum = [];

//4
const listElm = document.querySelector("#user-list");
//8
const userFound = document.querySelector("#user-found");

//3 display 50 users function
const displayUsers = (users) => {
  let str = "";
  console.log(users);
  users.map((user) => {
    // console.log(user);
    str += ` 
    <div class="col-md-6 col-lg-4 py-2">
      <div class="card fs-5">    

        <img src="${user.picture.large}" class="card-img-top" alt="..." />

        <h4 class="text-center mt-5">${user.name.title} ${user.name.first} ${user.name.last}</h4>

        <div class="card-body">


          <div><span><i class="fa-solid fa-mobile-screen-button"></i></span> ${user.phone}</div>

          <div><span><i class="fa-solid fa-location-dot"></i></span> ${user.location.city}, ${user.location.country}</div>
          <div><span><i class="fa-solid fa-envelope"></i> ${user.email}</div>
        </div>

      </div>
    </div>
    `;
  });
  listElm.innerHTML = str;
  userFound.innerHTML = users.length;
};

//2 fetch 50 users
const fetchUser = (params = "results=50") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      usrArgs = data.results;
      console.log(usrArgs);

      displayUsers(usrArgs);
    })
    .catch((error) => console.log(error));
};
//7
fetchUser();

//6 select Gender
const handleOnChange = (e) => {
  //console.log(e.value);
  const params = `results=50&gender=${e.value}`;
  fetchUser(params);
};

//5 search for a contact
const handleOnSearch = (e) => {
  const str = e.value.toLowerCase();
  //console.log(str);
  const filteredArgs = usrArgs.filter((item) => {
    const userFullName = (
      item.name.first +
      "" +
      item.name.last
    ).toLocaleLowerCase();
    if (userFullName.includes(str)) {
      return item;
    }
  });
  displayUsers(filteredArgs);
  console.log(filteredArgs);
};

//9 search for a phone number
const handleOnSearchPhone = (e) => {
  const str = e.value;
  const filteredNum = usrArgs.filter((item) => {
    const phone = item.phone.replace(/[^0-9]/g, "");
    console.log(phone);
    if (phone.includes(str)) {
      return item;
    }
  });
  displayUsers(filteredNum);
};
//10 search for address
const handleOnSearchAddress = (e) => {
  str = e.value.toLocaleLowerCase();
  const filterAddress = usrArgs.filter((item) => {
    const address = (
      item.location.city +
      "" +
      item.location.country
    ).toLocaleLowerCase();
    if (address.includes(str)) {
      return item;
    }
  });
  displayUsers(filterAddress);
};
