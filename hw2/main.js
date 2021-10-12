
let displayImg = document.getElementById("display"),
    selectedPic = document.getElementsByClassName("bob-4item");

displayImg.src = "pics/study.jpeg";


function selectImg(srcName) {
    displayImg.src = srcName;
    findSelected();
}

function isSelected(srcName) {
    console.log(srcName === displayImg.src)
    return (srcName === displayImg.src);
}

function findSelected() {
    for (let i = 0; i < selectedPic.length; i++) {
        if (isSelected(selectedPic[i].firstElementChild.src)) {
            console.log("here", selectedPic[i].firstElementChild.src);
            selectedPic[i].firstElementChild.style.border = "10px solid orange";
            selectedPic[i].firstElementChild.style.borderRadius = "10px";
        }
    }
}
