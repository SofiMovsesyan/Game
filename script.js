let rows = 2
let cols = 2

let container = document.getElementById("container")
let btn = document.getElementById("btn")
let pTimer = document.getElementById("timer")
let pBest = document.getElementById("best")
let table, tr, td, win
let min = 0
let s = 0
let ms = 0

let time

let bestScore = 0
let curScore;

btn.addEventListener("click", () => {
    btn.innerHTML = "REFRESH"
    win = false
    min = 0
    s = 0
    ms = 0
    timer()

    createTable(rows, cols)
    numberClick(rows, cols)
})

function timeToMs(timeStr) {
    let [min, time] = timeStr.split(":")

    let [sec, ms] = time.split(".")
    console.log(min, sec);
    let toMs = parseInt(min) * 60000 + parseInt(sec) * 1000 + parseInt(ms)
    return toMs
}

function timer() {

    time = setInterval(() => {
        if (win == true) {
            clearInterval(time)
            curScore = timeToMs(pTimer.innerHTML.replace("Time:", " "))

            if (bestScore == 0 || bestScore > curScore) {
                bestScore = curScore
                pBest.innerHTML = `Best: ${min}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`
            }

        }

        if (ms >= 100) {
            ms = 0
            s++
        }

        if (s >= 60) {
            s = 0
            min++
        }
        pTimer.innerHTML = `Time: ${min}:${s.toString().padStart(2, "0")}.${ms.toString().padStart(3, "0")}`

        ms++
        // timer()
    }, 10);
}


function createTable(r, c) {
    let arr = randomNumbers(r, c)
    let index = 0
    table = container.getElementsByTagName("table")
    if (table.length > 0) {
        table[0].remove()
    }
    table = document.createElement("table")
    container.appendChild(table)
    for (let i = 0; i < r; i++) {
        tr = document.createElement("tr")
        for (let j = 0; j < c; j++) {
            td = document.createElement("td")
            td.style.border = "1px solid black"
            td.style.width = "50px"
            td.style.height = "50px"
            td.innerHTML = arr[index]
            index++
            td.style.textAlign = "center"
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function randomNumbers(r, c) {
    let arr = []
    for (let i = 1; i <= r * c; i++) {
        arr.push(i)
    }
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr

}

function numberClick(r, c) {
    let tds = document.querySelectorAll("td")
    let count = 1
    tds.forEach(td => {
        td.addEventListener("click", () => {
            if (td.className != "clicked") {
                if (td.innerHTML == count) {
                    td.style.backgroundColor = "green"
                    td.classList.add("clicked")
                    count++
                    if (count > r * c) {
                        win = true
                    }
                }
                else {
                    td.style.backgroundColor = "red"
                    setTimeout(() => {
                        td.style.backgroundColor = "white"

                    }, 1000);
                }
            }
        })
    });

}
