let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]

let nowPlaying = document.getElementsByClassName("row nowPlaying")[0]
let nowPlayingUl = nowPlaying.getElementsByTagName("ul")[0]
let nowPlayingList = nowPlaying.getElementsByTagName("li")

let upcoming = document.getElementsByClassName("row upcoming")[0]
let upcomingH4 = upcoming.getElementsByTagName("h4")[0]
let upcomingList = upcoming.getElementsByTagName("li")


// let genresResult = document.getElementsByClassName("row genresResult")[0]

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

    clickGenre = (e) => {
        Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        ))
            .then(data => {
                console.log(data[0])
                console.log(data[1])

                console.log(data[1].results[0].genre_ids)


                // nowPlayingUl.remove()
                // upcoming.remove()


                let title = document.getElementsByClassName("catagoryBanner")[0]
                let h4 = title.getElementsByTagName("h4")[0]

                let targetId = e.target.id
                h4.innerText = (e.target.innerText)
                nowPlaying.className = (`row genresResult`)

                for (i = 0; i < upcomingList.length; i++) {
                    nowPlayingUl.appendChild(upcomingList[0])

                }

                for (i = 0; i < nowPlayingList.length; i++) {

                    if (nowPlayingList[i].id.includes(targetId)) {
                        nowPlayingList[i].style.display = ""

                    } else if (!nowPlayingList[i].id.includes(targetId)) {
                        nowPlayingList[i].style.display = "none"
                    }
                }

                // for (i = 0; i < upcomingList.length; i++) {

                //     if (upcomingList[i].id.includes(targetId)) {
                //         upcomingList[i].style.display = ""

                //     } else if (!upcomingList[i].id.includes(targetId)) {
                //         upcomingList[i].style.display = "none"
                //     }
                // }


            })

        upcoming.remove()
    }
    for (let i = 0; i < genre.genres.length; i++) {

        console.log(genre.genres[i])

        let ul = dropdownMenu
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.className = (`dropdown-item ${genre.genres[i].id} ${genre.genres[i].name}`)
        ul.appendChild(li)
        li.appendChild(a)
        a.innerText = (`${genre.genres[i].name}`)

        a.setAttribute("id", `${genre.genres[i].id}`)

        dropdownItem[i].addEventListener("click", clickGenre)
    }


}













let nowPlayingDisplay = (movie) => {
    console.log(movie)
    // console.log(`${apiImg.url}${movie.results[0].poster_path}`)

    for (let i = 0; i < movie.results.length; i++) {

        let ul = nowPlaying.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "nowPlayingMovie"
        ul.appendChild(li)
        let a = document.createElement("a")
        a.setAttribute("href", `./info.html?id=${movie.results[i].id}`)
        li.appendChild(a)

        li.setAttribute("id", `${movie.results[i].genre_ids}`)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        a.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        a.appendChild(p)
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
        let a = document.createElement("a")
        a.setAttribute("href", `./info.html?id=${movie.results[i].id}`)
        li.appendChild(a)

        li.setAttribute("id", `${movie.results[i].genre_ids}`)
        let img = document.createElement("img")
        img.setAttribute("src", (`${apiImg.url}${movie.results[i].poster_path}`))
        a.appendChild(img)
        let p = document.createElement("p")
        p.innerHTML = (`${movie.results[i].title}`)
        a.appendChild(p)
    }
    initPage()
}




let initPage = () => window.scrollTo(0,0)
window.addEventListener("onload",initPage)
initDisplay()






 // title: movie.results[0].poster_path
    // title: movie.results[0].title
    // title: movie.results[0].original_language
    // title: movie.results[0].overview
    // title: movie.results[0].release_date
    // title: movie.results[0].vote_average
    // title: movie.results[0].backdrop_path