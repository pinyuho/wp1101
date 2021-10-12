
const albums = [
    [
        "https://ec.europa.eu/newsroom/repository/picture/2016-18/travel_16-17_photo_c_13224.jpg",
        "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F920377840%2F0x0.jpg",
        "https://img.technews.tw/wp-content/uploads/2020/12/08132944/female-tourists-travel-map.jpg",
        "https://sethbutera.com/wp-content/uploads/2021/08/s960_960-airport-departures.jpg"
    ],
    [
        "https://beta.ctvnews.ca/content/dam/ctvnews/images/2019/11/18/1_4691731.png?cache_timestamp=1574134871525",
        "https://data.whicdn.com/images/355994044/original.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLUcvxljFvZU41WvKlM4sK_DqbTaA70rsuMA&usqp=CAU",
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/164719801/original/419251e95b26ea2594bcee9b61aa215bad7e8c8f/paint-your-pet-as-the-cryig-cat-meme.jpg",
        "https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg",
        "https://www.cnet.com/a/img/S8WsucQh6wWeUG1yrQi66jKNtto=/940x0/2020/09/22/ad4bd31b-cf8c-46f5-aa70-231df9acc041/longcat.jpg",
        "https://image.shutterstock.com/image-photo/beautiful-cat-fashionable-breed-scottish-260nw-1706009209.jpg"
    ],
    [
        
    ]
]

let currentAlbumInd = 0;
let displayImg = document.getElementById("display"),
    selectedPic = document.getElementsByClassName("bob-4item");


// default value
displayImg.src = albums[0][0];
for (let i = 0; i < selectedPic.length; i++) {
    selectedPic[i].firstElementChild.src = albums[0][i];
}

selectedPic[0].firstElementChild.style.border = "10px solid orange";
selectedPic[0].firstElementChild.style.borderRadius = "10px";


function selectAlbum(albumInd) {
    if (albums[albumInd].length === 0) {
        alert("This album is empty !!!");
        return ;
    }
    for (let i = 0; i < selectedPic.length; i++) {
        selectedPic[i].firstElementChild.src = albums[albumInd][i];
    }
    displayImg.src = albums[albumInd][0];
    findSelected();
}







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
        selectedPic[i].firstElementChild.style.border = "0px";
    }
    for (let i = 0; i < selectedPic.length; i++) {
        if (isSelected(selectedPic[i].firstElementChild.src)) {
            // console.log("here", selectedPic[i].firstElementChild.src);
            selectedPic[i].firstElementChild.style.border = "10px solid orange";
            selectedPic[i].firstElementChild.style.borderRadius = "10px";
        }
    }
}
