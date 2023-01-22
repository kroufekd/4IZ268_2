if (!localStorage.getItem("saved_pictures")) {
  localStorage.setItem("saved_pictures", "[]");
}

function addToFavorite(img) {
  let favorite = JSON.parse(localStorage.getItem("saved_pictures"));
  favorite.push(img);
  localStorage.setItem("saved_pictures", JSON.stringify(favorite));
}
function deleteFromFavorie(url) {
  let favorite = JSON.parse(localStorage.getItem("saved_pictures"));
  var index = favorite.findIndex(function (item) {
    return item.url === url;
  });
  favorite.splice(index, 1);
  localStorage.setItem("saved_pictures", JSON.stringify(favorite));
}
function isInFavorites(url) {
  let favorite = JSON.parse(localStorage.getItem("saved_pictures"));
  var index = favorite.findIndex(function (item) {
    return item.url === url;
  });
  if (index > -1) {
    return true;
  } else {
    return false;
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("saved_pictures"));
}
function getRandomDate() {
  let start = new Date(1995, 5, 16);
  console.log(start);
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
