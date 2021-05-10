

let seat = document.querySelectorAll(".seatRow .seat:not(.booked)")

let seatWrap = document.querySelector(".seatWrap")
let displayInfo = document.querySelector(".displayInfo")
let movieMenu = document.getElementById("movieMenu")
let movieOption = document.getElementsByClassName("movieOption")
let displayPrice = document.querySelector(".displayPrice")

let confirmBtn = document.getElementById("confirmBtn")

let poster = document.getElementById("poster")

let movieIndex

let api = {
    url: "https://api.themoviedb.org/3/movie/",
    key: "api_key=8ff5e2fbb1b643a55f0256bb89a8a192",

}

let apiImg = {
    url: "https://image.tmdb.org/t/p/w300"
}

let initMovieInfo = (movieIndex) => {

    fetch(`${api.url}now_playing?${api.key}&language=en-US&page=1`)
        .then(resp => resp.json())

        .then(data => {
            movieInfo(data)
            console.log(data)
        })

    let movieInfo = (movie) => {



        // console.log(movie.results[i].title)
        // movie.results[i].title
        // movie.results[i].poster_path
        poster.setAttribute("src", `${apiImg.url}${movie.results[0].poster_path}`)
        displayInfo.innerHTML = (`<input id="confirmBtn" type="button" value="confirm"></input>`)

        for (let i = 0; i < movie.results.length; i++)
            movieMenu.innerHTML += (`
        <option class="movieOption" id="${movie.results[i].id}">${movie.results[i].title}</option>
        `)
        movieMenu.addEventListener("change", (e) => {
            console.log(e.target.id)
            console.log(movieMenu[e.target.selectedIndex].index)
            poster.setAttribute("src", `${apiImg.url}${movie.results[movieMenu[e.target.selectedIndex].index].poster_path}`)
        })

        movieMenu.selectedIndex = movieIndex
    }

}

// let saveSeatData = (movieIndex, moviePrice) => {
//     localStorage.setItem("selectedMovieIndex", (movieIndex));
//     localStorage.setItem("selectedMoviePrice", (moviePrice));
// }




let calTotal = () => {

    let selectedSeat = document.querySelectorAll(".seatRow .seat.selected")

    let seatCount = selectedSeat.length
    totalPrice = + seatCount * 10
    console.log(totalPrice)
    // console.log(ticketPrice)
    return displayPrice.innerHTML = (`<p>Total Price: $<p><span>${totalPrice}<span>`)
}

function displayUI() {

    // ============= get selected seats convert as number in array
    let bookedSeat = JSON.parse(localStorage.getItem("bookedSeat"))
    console.log(bookedSeat)

    // ============= if select seat array not 0 or less than 0
    if (bookedSeat !== null && bookedSeat.length > 0) {
        // ============= run all seat and 
        seat.forEach((seat, index) => {
            if (bookedSeat.indexOf(index) > -1) {
                seat.classList.add('booked');
            }
        });
    }

    // const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    // if (selectedMovieIndex !== null) {
    //     movieMenu.selectedIndex = selectedMovieIndex;
    // }



}

let saveSeatData = (seatsIndex) => {

    // let booked = []
    // booked = JSON.parse(localStorage.getItem("bookedSeat"))
    // booked.push(seatsIndex)

    localStorage.setItem("bookedSeat", JSON.stringify(seatsIndex));
    // console.log(booked)


}

// ============= Listen the change of movie list
movieMenu.addEventListener("change", (evt) => {
    // console.log(`${evt.target.selectedIndex}`)
    // console.log(movieMenu[evt.target.selectedIndex].innerText)
    // displayInfo.innerHTML = (`${movieMenu[evt.target.selectedIndex].innerText}`)
    // saveSeatData(evt.target.selectedIndex, evt.target.value)
    calTotal()
})

// ============= Listen the button click of seats
seatWrap.addEventListener("click", (evt) => {
    // console.log(evt.target.classList)

    // ============= If not choose any movie return alert

    // ============= If the target is seat class but without book class
    if (evt.target.classList.contains("seat") && !evt.target.classList.contains("booked")) {

        // ============= toggle the  change to selected class
        evt.target.classList.toggle("selected")
        calTotal()

    }


    let selectedSeat = document.querySelectorAll(".seatRow .seat.selected")


    let seatsIndex = [...selectedSeat].map((seats) => {
        console.log([...seat].indexOf(seats))
        return ([...seat].indexOf(seats))
    })
    saveSeatData(seatsIndex)
    // confirmBtn.addEventListener("click", saveSeatData(seatsIndex))



})



window.addEventListener("load", () => {

    let ticket = localStorage.getItem("ticket")
    movieIndex = parseInt(ticket)
    initMovieInfo(movieIndex)
    displayUI()

})