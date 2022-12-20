const workexp_ul = document.querySelector("#workexp");
const portfolio_div = document.querySelector("#portfolio");
const footer = document.querySelector("#footer");
const modeSwitch = document.querySelector("#modeSwitch");

window.onload = () => {
    let dateFullYear = new Date().getFullYear();
    footer.style.textAlign = "center";
    footer.style.marginLeft = 
    footer.innerHTML = `© ${dateFullYear} Made with ♡ by Andy Cheung`;

    if (modeSwitch) {
        document.querySelector("#modeSwitch").classList.add("icon");
    }
}

// MODAL

const modal = document.getElementById("modal"); 
const modalOpenBtn = document.getElementById("modalOpenBtn"); 
const modalCloseBtn = document.getElementById("modalCloseBtn"); 
const contactButtonDiv = document.getElementById("contactButton"); 

if (modal) {

    const openModal = () => {
        modal.style.display = 'block';
        contactButtonDiv.style.display = 'none';
    }
    
    const closeModal = () => {
        modal.style.display = 'none';
        contactButtonDiv.style.display = 'flex';
    }

    const outSideClick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            contactButtonDiv.style.display = 'flex';
        }
    }


    
        modalOpenBtn.addEventListener('click', function () {
            openModal();
        });
    
        modalCloseBtn.addEventListener('click', function () {
            closeModal();
        });

        window.addEventListener('click', function (e) {
            outSideClick(e);
        });
}


// Här fetchar vi data från vår data.json
fetch("data.json")
.then((response) => response.json())
.then((data) => {
    console.log(data);
    workexperience(data);
    portfolio(data);
});

const workexperience = (data) => {
    let work = data.work_experience.map((work) => {
        return `
        <li class="job" id="job">
            <h2>${work.title}</h2>
            ${work.roles.map((role) => `<li class="role" id="role">${role}</li>`).join("")}
        </li>
        `;
    }).join("");

    if (workexp_ul !== null) {
        workexp_ul.innerHTML = work;
    }
}

const portfolio = (data) => {
    let portfolio = data.portfolio.map((portfolio) => {
        return `
        <a href="${portfolio.url}">
            <img src="./assets/img/${portfolio.img}" alt="My first grid layout" />
        </a>
    <p>${portfolio.text}</p>
        `;
    }).join('');
    
    if (portfolio_div !== null) {
        portfolio_div.innerHTML = portfolio;
    }
}

// Darkmode Toggle

if (modeSwitch) {

const getPreferredColorScheme = () => {
    const darkQuery = "(prefers-color-scheme: dark)";
    const darkMQL = window.matchMedia ? window.matchMedia(darkQuery) : {};
    if (darkMQL.media === darkQuery && darkMQL.matches) {
    return "dark";
    }
    return "light";
  };
  
  const colorScheme = 
  localStorage.getItem("color-scheme") || getPreferredColorScheme();
  document.documentElement.setAttribute("data-color-scheme", colorScheme);

  modeSwitch.onclick = () => {
    const colorScheme = document.documentElement.getAttribute(
      "data-color-scheme"
    );
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-color-scheme", newColorScheme);
    localStorage.setItem("color-scheme", newColorScheme);
  };


  if (localStorage.getItem("color-scheme") === "default") {
    modeSwitch.classList.toggle("icon");
  } else if (localStorage.getItem("color-scheme") === "light") {
    modeSwitch.classList.toggle("icon");
}

}