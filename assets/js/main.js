(() => {
   if(!localStorage.getItem("saved_pictures")){
     localStorage.setItem("saved_pictures", "[]");
   }
  
  let mainImgWrap = document.querySelector(".wallpaper-chooser");
  let mainImg = document.querySelector(".main-img");
  let todayDate = new Date();
  let imgDate = document.querySelector(".img-date");
  generateNewImage(formatDate(todayDate));

  //tlacitka a jejich eventy
  let reloadBtn = document.querySelector(".reload");
  let saveBtn = document.querySelector(".save");
  let downloadBtn = document.querySelector(".download");

  reloadBtn.addEventListener("click", () => {
    generateNewImage(formatDate(getRandomDate()));    
    document.querySelector(".save svg").setAttribute("fill", "#b0bdd3");
  });
  saveBtn.addEventListener("click", () => {
    addToFavorite({
      url: mainImg.src,
      hdurl: mainImg.getAttribute("hdurl")
    })
    document.querySelector(".save svg").setAttribute("fill", "#ff0066");
  });
  
  downloadBtn.addEventListener("click", () => {});

  mainImg.addEventListener("click", ()=>{
    window.open(mainImg.getAttribute("hdurl"), "_blank")
  })

  function generateNewImage(date) {
    console.log(date);
    $.get(
      `https://api.nasa.gov/planetary/apod?api_key=RMbU4tIN4YVYB20HWpNew7yMJsI1A6fKf3c4566t&date=${date}`,
      (result) => {
        if (result.url.includes("youtube") == false) {
          mainImg.src = result.url;
          mainImg.setAttribute("hdurl", result.hdurl);
          let apodDate = new Date(result.date);
          if (formatDate(apodDate) != formatDate(todayDate)) {
            imgDate.innerHTML =
              apodDate.getDate() +
              "." +
              (apodDate.getMonth() + 1) +
              "." +
              apodDate.getFullYear();
          }
        } else {
          console.log("got yt video, trying again");
          generateNewImage(formatDate(getRandomDate()));
        }
        
      }
    );
  }

  function getRandomDate() {
    let start = new Date(2012, 0, 1);
    let end = new Date();
    let randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate;
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function addToFavorite(img){
    let favorite = JSON.parse(localStorage.getItem("saved_pictures"));
    favorite.push(img);
    localStorage.setItem("saved_pictures", JSON.stringify(favorite))
  }
})();
