let infoWrap = document.getElementById("infoWrap")
let posterWrap = document.getElementById("posterWrap")
let poster = document.getElementById("poster")
let contentWrap = document.getElementById("contentWrap")
let titleWrap = document.getElementById("titleWrap")
let meta = document.getElementById("meta")
let lang = document.getElementById("lang")
let playTime = document.getElementById("playTime")
let releaseDate = document.getElementById("releaseDate")
let genreWrap = document.getElementById("genreWrap")
let genreInfo = document.getElementById("genre")
let story = document.getElementById("story")
let castWrap = document.getElementById("castWrap")
let movieId = window.location.href

let id = movieId.split("id=")[1]
console.log(id)

let api = {
    url: "https://api.themoviedb.org/3/movie/",
    key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

}


let apiImg = {
    url: "https://image.tmdb.org/t/p/w300"
}


let urls = [
    (`${api.url}${id}?${api.key}&language=en-US`),
    (`${api.url}${id}/credits?${api.key}&language=en-US`),
    (`${api.url}${id}/videos?${api.key}&language=en-US`)
]

Promise.all(urls.map(url =>
    fetch(url)
        .then(resp => resp.json())
))

    .then(data => {
        console.log(data)
        // console.log(data[2])
        initInfoUl(data)
        test(data)
    })



let initInfoUl = (data) => {

    poster.setAttribute("src", `${apiImg.url}${data[0].poster_path}`)
    let title = titleWrap.getElementsByTagName("h2")[0]
    title.innerText = (`${data[0].title}`)
    // lang.innerText += (`Language`)
    for (lg in data[0].spoken_languages) {

        lang.innerText += (`${data[0].spoken_languages[lg].english_name}\xa0\xa0`)
    }

    playTime.innerText = (`${data[0].runtime} minutes`)
    releaseDate.innerText = (`${data[0].release_date}`)

    for (genres in data[0].genres) {
        
// ${data[0].genres[genres].name}
        genreWrap.innerHTML += (`
        
        <span id="${data[0].genres[genres].name}">${data[0].genres[genres].name}</span>
        `)
    }



    let iframe = contentWrap.getElementsByTagName("iframe")[0]
    iframe.setAttribute("src", `https://www.youtube.com/embed/${data[2].results[0].key}`)
    story.getElementsByTagName("p")[0].innerText = (`${data[0].overview}`)

    console.log(data[1].cast[0])
    console.log(data[1].cast[0].name)
    console.log(data[1].cast[0].character)
    console.log(data[1].cast[0].profile_path)

    for (let i = 0; i < 8; i++) {
        let div = document.createElement("div")
        div.setAttribute("class", "cast")
        castWrap.appendChild(div)
        console.log(data[1].cast[i].name)

        div.innerHTML = (`
        <a href="#">
        <img src="${apiImg.url}${data[1].cast[i].profile_path}">
        </a>
        <p>${data[1].cast[i].name}</p>
        <p>As ${data[1].cast[i].character}</p>
        `)

    }


}


let test = (data) => {

    console.log(`${apiImg.url}${data[1].cast[0].profile_path}`)

}



// window.addEventListener("load", initInfoUl)