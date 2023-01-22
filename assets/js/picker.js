(() => {
  let mainImgWrap = document.querySelector(".wallpaper-chooser");
  let mainImg = document.querySelector(".main-img");
  let todayDate = new Date();
  let imgDate = document.querySelector(".img-date");
  let currDate = document.querySelector(".curr-date");
  generateNewImage(formatDate(todayDate));

  //tlacitka a jejich eventy
  let reloadBtn = document.querySelector(".reload");
  let saveBtn = document.querySelector(".save");
  let nextDayBtn = document.querySelector(".next-day");

  reloadBtn.addEventListener("click", () => {
    generateNewImage(formatDate(getRandomDate()));
    //document.querySelector(".save svg").setAttribute("fill", "#b0bdd3");
  });
  saveBtn.addEventListener("click", () => {
    if (isInFavorites(mainImg.src)) {
      deleteFromFavorie(mainImg.src);

      document.querySelector(".save svg").setAttribute("fill", "#B0BDD3");
    } else {
      addToFavorite({
        url: mainImg.src,
        hdurl: mainImg.getAttribute("hdurl"),
        date: mainImg.getAttribute("date"),
        title: mainImg.getAttribute("title"),
        desc: mainImg.getAttribute("desc"),
      });
      document.querySelector(".save svg").setAttribute("fill", "#ff0066");
    }
  });
  nextDayBtn.addEventListener("click", () => {
    let day = new Date(currDate.value);
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate()+1);
    generateNewImage(formatDate(nextDay));
  });

  mainImg.addEventListener("click", () => {
    window.open(mainImg.getAttribute("hdurl"), "_blank");
  });

  function generateNewImage(date) {
    console.log(date);
    currDate.value = date
    document.querySelector("#custom-date").value = date
    $.get(
      `https://api.nasa.gov/planetary/apod?api_key=RMbU4tIN4YVYB20HWpNew7yMJsI1A6fKf3c4566t&date=${date}`,
      (result) => {
        console.log(result);
        if (result.url.includes("youtube") == false) {
          //nastaveni atributu img, pro popripadne ulozeni
          mainImg.src = result.url;
          mainImg.setAttribute("hdurl", result.hdurl);
          mainImg.setAttribute("title", result.title);
          mainImg.setAttribute("desc", result.explanation);

          //formatovani a zobrazeni datumu fotky
          let apodDate = new Date(result.date);
          let formated_date =
            apodDate.getDate() +
            "." +
            (apodDate.getMonth() + 1) +
            "." +
            apodDate.getFullYear();
          if (formatDate(apodDate) != formatDate(todayDate)) {
            imgDate.innerHTML = formated_date;
          }
          mainImg.setAttribute("date", formated_date);

          if (isInFavorites(result.url)) {
            document.querySelector(".save svg").setAttribute("fill", "#ff0066");
          } else {
            document.querySelector(".save svg").setAttribute("fill", "#B0BDD3");
          }
        } else {
          //generateNewImage(formatDate(getRandomDate()));
          mainImgWrap.innerHTML = "API vrátilo YouTube video. To zobrazovat neumím :( zkus znova jiný datum."
        }
      }
    );
  }

  function newOnCustomDate(){
    var custom_date = document.querySelector("#custom-date").value;
    generateNewImage(formatDate(custom_date));
  }

  document.querySelector("#custom-date").setAttribute("max", formatDate(todayDate));
  document.querySelector("#custom-date").addEventListener("change", newOnCustomDate);
})();
