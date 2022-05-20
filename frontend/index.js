let slideIndex = 1;

(async () => {
    const pets = (await fetch('http://127.0.0.1:3000/pets/images/').then((res) => res.json())) || [];
    const container = document.getElementById('containerImg');
    const row = document.getElementById('row');
    for (i = 0; i < pets.length; i++) {
      let pet = pets[i];
      const petDiv = document.createElement('div');
      const petMini = document.createElement('div');
        petDiv.className = "mySlides";
        petMini.className = "column";
        petDiv.innerHTML = `<img src="images/${pet}" style="width:100%"></img>`;
        petMini.innerHTML = `<img class="demo cursor" src="images/${pet}" style="width:85%" onclick="currentSlide(${i+1})">`
        container.append(petDiv);
        row.append(petMini);
    };
    showSlides(slideIndex);
})();

function plusSlides(n) {
  showSlides(slideIndex += n);
}
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

document.getElementById('registration').style.display = 'none';
document.getElementById('authorization').style.display = 'none';
document.getElementById('upload').style.display = 'none';

function registration() {
  document.getElementById('registration').style.display = 'block';
  document.getElementById('authorization').style.display = 'none';
}

function authorization() {
  document.getElementById('authorization').style.display = 'block';
  document.getElementById('registration').style.display = 'none';
}

const getTokenData = async () => {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  const user = {
    login: login,
    password: password
  };
  await fetch('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', JSON.stringify(data));
      document.getElementById('authorization').style.display = 'none';
      document.getElementById('reg').style.display = 'none';
      document.getElementById('auth').style.display = 'none';
      document.getElementById('upload').style.display = 'block';
      const userHello = document.createElement('p');
      userHello.innerHTML = `Привет, ${user.login}!`;
      const header = document.getElementById('header');
      header.prepend(userHello);
    })
    .catch((error) => {
      console.error(error);
    });
}

const addNewUser = async () => {
  const name = document.getElementById('regName').value;
  const login = document.getElementById('regLogin').value;
  const password = document.getElementById('regPassword').value;
  const user = {
    name: name,
    login: login,
    password: password
  };
  await fetch('http://127.0.0.1:3000/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('registration').style.display = 'none';
      alert('Регистрация прошла успешно!')
    })
    .catch((error) => {
      console.error(error);
    });
}

const uploadImage = async () => {
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');
  formData.append('image', fileField.files[0]);
  const token = localStorage.getItem('token');
  const string = token.split(':')[1].split('"')[1];
  try {
    await fetch('http://127.0.0.1:3000/image/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${string}`
      },
      body: formData
    });
  } catch {
    console.error(error);
  }
  location.reload();
}