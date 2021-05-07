let searchInput = document.getElementsByClassName("form-control me-2")[0]
let searchBtn = document.getElementsByClassName("btn btn-outline-success my-2 my-sm-0")[0]
let searchResult = document.getElementsByClassName("row searchResult")[0]
// let searchBtn = document.getElementById("searchBtn")
let searchUrl = window.location.href
let searchQuery = searchUrl

// a.setAttribute("href", `./info.html?id=${movie.results[i].id}`)





// let urls = [
//     (`${api.url}search/movie?${api.key}&language=en-US&query=${searchInput.value}&page=1&include_adult=false`)
//     (`${api.url}upcoming?${api.key}&language=en-US&page=1&region=CA`),
//     (`https://api.themoviedb.org/3/genre/movie/list?${api.key}&language=en-US`)
// ]

let searchMoive = () => {
    // location.assign(`search.html?query=${searchInput.value}`)
    let api = {
        url: "https://api.themoviedb.org/3/",
        key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

    }


    // searchUrl = (`${searchUrl}query=${searchInput.value}`)
    // console.log(location.search)
    fetch(`${api.url}search/movie?${api.key}&language=en-US&query=${searchInput.value}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(data =>
            displaySearch(data))


}

let displaySearch = (movie) => {
    console.log(movie)
    console.log(window.history)
    let apiImg = {
        url: "https://image.tmdb.org/t/p/w200"
    }

    
    for (let i = 0; i < movie.results.length; i++) {

        let ul = searchResult.getElementsByTagName("ul")[0]
        let li = document.createElement("li")
        li.className = "searchResult"
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




let saveQuery = () => {
    // window.location.href = window.location.href + (`?query=${searchInput.value}`);
    window.history.replaceState(null, null, `?query=${searchInput.value}`);

    // window.history.pushState(`?query=${searchInput.value}`);
    searchMoive();
}
// searchMoive();
// window.addEventListener("DOMContentLoaded", searchMoive)
searchBtn.addEventListener("click", saveQuery)

window.onhashchange = function () {
    window.history.back()
}