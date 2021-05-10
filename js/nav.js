let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]

// let actionGenres = document.getElementsByClassName("dropdown-item action")[0]
let dropdownMenu = document.getElementsByClassName("dropdown-menu")[0]
let dropdownItem = document.getElementsByClassName("dropdown-item")

let ticket = document.getElementsByClassName("nav-item")[1]
let buyTicket = ticket.getElementsByTagName("a")[0]

let initListDisplay = () => {

    let api = {
        url: "https://api.themoviedb.org/3/movie/",
        key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

    }

    let apiImg = {
        url: "https://image.tmdb.org/t/p/w200"
    }


    // let urls = [
    //     (`${api.url}now_playing?${api.key}&language=en-US&page=1`),
    //     (`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`),
    //     (`https://api.themoviedb.org/3/genre/movie/list?${api.key}&language=en-US`)
    // ]

    let url = (`https://api.themoviedb.org/3/genre/movie/list?${api.key}&language=en-US`)


    fetch(url)
        .then(resp => resp.json())

        .then(data => {
            // nowPlayingDisplay(data[0])
            // upcomingDisplay(data[1])
            genreListDisplay(data)
            // console.log(data.genres)
        })

}

let genreListDisplay = (data) => {

    for (let i = 0; i < data.genres.length; i++) {

        // console.log(data.genres[i])

        let ul = dropdownMenu
        let li = document.createElement("li")
        let a = document.createElement("a")
        a.className = (`dropdown-item ${data.genres[i].id} ${data.genres[i].name}`)
        ul.appendChild(li)
        li.appendChild(a)
        a.innerText = (`${data.genres[i].name}`)
        a.setAttribute("href", `./genre.html?id=${data.genres[i].id}=${data.genres[i].name}`)
        a.setAttribute("id", `${data.genres[i].id}`)

        // dropdownItem[i].addEventListener("click", clickGenre(data.genres[i].id))
    }
}

let clickGenre = (id) => {


    const clickGenreData = id
    console.log(clickGenreData)
    localStorage.setItem("GENRE", clickGenreData)
    window.open("./genre.html", "_self");

}

let saveData = () => {


    const searchQueryData = searchInput.value

    if (!searchQueryData == "") {
        localStorage.setItem("SEARCH", searchQueryData)
        window.open("./search.html", "_self");
    } else {
        return alert("Please enter keywords")
    }
}
initListDisplay()

searchBtn.addEventListener("click", saveData)

window.addEventListener("keypress", (e) => {

    if (e.keyCode == 13) {
        // console.log('test')
        saveData()
    }
})


// buyTicket.addEventListener("click",()=>
// localStorage.setItem("ticket", "clicked Ticket")
// )





