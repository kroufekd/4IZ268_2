(()=>{
    let mainImgWrap = document.querySelector(".wallpaper-chooser");
    let mainImg = document.querySelector(".main-img");
    let resolutionInput = document.querySelector(".resolution");

    setNewImgUrl(getResolution());

    resolutionInput.addEventListener("change",()=>{
        setNewImgUrl(getResolution());
    });

    function getResolution(){
        return resolutionInput.value.split("x");
    }

    

    function setNewImgUrl(resolution){
        mainImg.src = `https://picsum.photos/${resolution[0]}/${resolution[1]}`;            
    }
})();