
  if (
    !localStorage.getItem("saved_pictures") ||
    localStorage.getItem("saved_pictures") == []
  ) {
    document.querySelector("#favorite-header").innerHTML =
      "You have 0 favorite pictures. Pick some!";
  }

  showFavorites();

  function showFavorites() {
    let favorite = getFavorites();
    let s = "";
    favorite.forEach((img) => {
      s += `
            <div class="col-md-4">
                <div class="col mb-4">
                    <div><a href="${
                      img.hdurl
                    }"><img class="rounded img-fluid black-shadow w-100 fit-cover" src="${
        img.url
      }" style="height: 250px;"></a>
                        <div class="py-4">
                        
                        <div style="display:flex;justify-content:space-between">
                        <span class="badge bg-primary mb-2">${img.date}</span>
                        <span class="remove-from-favorite" onclick="remove('${img.url}')">
                    
                    <svg clip-rule="evenodd" url="${img.url}" class="remove-btn" fill="#ff0066"  fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
                    
                    </span>
                        </div>  

                            <h4 class="fw-bold">${img.title}</h4>
                            <p class="text-muted">${
                              img.desc.slice(0, 80) + "..."
                            }</p>
                        </div>  
                    </div>
                </div>
            </div>
            `;
    });
    document.querySelector("#favorite-content").innerHTML = s;
  }

  function remove(url){
    deleteFromFavorie(url);
    showFavorites()
  }

