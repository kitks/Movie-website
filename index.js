let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]

let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

let upcoming = document.getElementsByClassName("row upcoming")[0]
let upcomingList = upcoming.getElementsByTagName("li")

let actionGenres = document.getElementsByClassName("dropdown-item action")[0]

let dropdownMenu = document.getElementsByClassName("dropdown-menu")[0]
let dropdownItem = document.getElementsByClassName("dropdown-item")

let api = {
    url: "https://api.themoviedb.org/3/movie/",
    key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

}

let apiImg = {
    url: "https://image.tmdb.org/t/p/w200"
}


// fetch(`${api.url}now_playing?${api.key}&language=en-US&page=1`)
//     .then(response => {
//         if (response.status !== 200) {
//             return console.log(`Look like there was a problem, status code ${response.status}`)
//         }
//         return response.json()
//     })
//     .then(data => {
//         return nowPlayingDisplay(data)
//     })
//     .catch(err => {
//         console.log(`Fetch error: ${err}`)
//     })

// fetch(`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`)
//     .then(response => {
//         if (response.status !== 200) {
//             return console.log(`Look like there was a problem, status code ${response.status}`)
//         }
//         return response.json()
//     })
//     .then(data => {
//         return upcomingDisplay(data)
//         // console.log(`up coming`)
//         // console.log(data)
//     })
//     .catch(err => {
//         console.log(`Fetch error: ${err}`)
//     })



let urls = [
    (`${api.url}now_playing?${api.key}&language=en-US&page=1`),
    (`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`),
    (`https://api.themoviedb.org/3/genre/movie/list?${api.key}&language=en-US`)
]

let initDisplay = () => {
    Promise.all(urls.map(url =>
        fetch(url).then(resp => resp.json())
    ))
        .then(data => {
            nowPlayingDisplay(data[0])
            upcomingDisplay(data[1])
            genreListDisplay(data[2])
        })

}

let genreListDisplay = (genre) => {

    for (let i = 0; i < genre.genres.length; i++) {

        console.log(genre.genres[i])

        let ul = dropdownMenu
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.className = (`dropdown-item ${genre.genres[i].id} ${genre.genres[i].name}`)
        ul.appendChild(li)
        li.appendChild(a)
        a.innerText = (`${genre.genres[i].name}`)
        let id = document.createAttribute("id")
        id.value = (`${genre.genres[i].id}`)
        a.setAttributeNode(id)
        dropdownItem[i].addEventListener("click", clickGenre)
    }
}

clickGenre = (e) => {
    //    if(nowPlayingList[0].className == "nowPlayingMovie noResult"){
    //     nowPlayingList[0].remove()
    //    }
    initDisplay()
    console.log(e.target.id)

    let targetId = e.target.id
    let title = nowPlaying.getElementsByTagName("h4")[0]
    // console.log(title.textContent)
    // console.log(title.innerText)
    title.innerText = (e.target.innerText)
    // let selectGenre = e.target.id
    console.log(nowPlayingList[0].id)
    console.log(upcomingList[0].id)

    for (i = 0; i < nowPlayingList.length; i++) {

        if (nowPlayingList[i].id.includes(targetId)) {
            nowPlayingList[i].style.display = ""

        } else if (!nowPlayingList[i].id.includes(targetId)) {
            nowPlayingList[i].style.display = "none"
        }
    }

    for (i = 0; i < upcomingList.length; i++) {

        if (upcomingList[i].id.includes(targetId)) {
            upcomingList[i].style.display = ""

        } else if (!upcomingList[i].id.includes(targetId)) {
            upcomingList[i].style.display = "none"
        }
    }

    // if (nowPlayingList[0].style.display == "none") {
    //     let li = document.createElement("li")
    //     let ul = nowPlaying.getElementsByTagName("ul")[0]
    //     li.className = "nowPlayingMovie noResult"
    //     li.innerText = ("No result")
    //     ul.prepend(li)
    // }


}



let nowPlayingDisplay = (movie) => {
    console.log(movie)
    // console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = nowPlaying.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "nowPlayingMovie"
        ul.appendChild(li)
        let id = document.createAttribute("id")
        id.value = (`${movie.results[i].genre_ids}`)
        li.setAttributeNode(id)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        li.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}${movie.results[i].genre_ids}`)
        li.appendChild(p)
    }
}

let upcomingDisplay = (movie) => {
    console.log(movie)
    // console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = upcoming.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "upcomingMovie"
        ul.appendChild(li)
        let id = document.createAttribute("id")
        id.value = (`${movie.results[i].genre_ids}`)
        li.setAttributeNode(id)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        li.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        li.appendChild(p)
    }
}




initDisplay()






 // title: movie.results[0].poster_path
    // title: movie.results[0].title
    // title: movie.results[0].original_language
    // title: movie.results[0].overview
    // title: movie.results[0].release_date
    // title: movie.results[0].vote_average
    // title: movie.results[0].backdrop_path