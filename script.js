let square = document.querySelectorAll(".square")
let squareHov = document.querySelectorAll(".squareHov")
let setHardMode = document.querySelectorAll(".setHardMode")

let titulo = document.querySelector(".titulo")
let codigoRGB = document.querySelector("#codigoRGB")
let bodyColor = document.querySelector("body")
let vidas = document.getElementById("vidas")
let resetButton = document.querySelector(".reset")
let difficulty = document.querySelector(".difficulty")


let lives = 3
let colors = []
let squareNumbers = 6

difficulty.addEventListener("click", function(){
    if(difficulty.innerHTML == "Hard"){

        difficulty.innerHTML = "Easy"
        difficulty.classList.remove("btn-outline-danger")
        difficulty.classList.add("btn-outline-success")
        squareNumbers = 6
        reload()
        setHardMode.forEach(e=>{
            e.classList.remove("hardMode")
        })
    }else{
        difficulty.innerHTML = "Hard"
        difficulty.classList.remove("btn-outline-success")
        difficulty.classList.add("btn-outline-danger")
        squareNumbers = 3
        reload()
        setHardMode.forEach(e=>{
            e.classList.add("hardMode")
        })
        
    }
})

let setLives = (par)=>{
    vidas.textContent = `Lives: ${par}`
}

let colorNumber = ()=>{
    return Math.floor(Math.random()*255)
}

let colorsSquads = () => {
    square.forEach((e,i)=>{
        e.style.backgroundColor = colors[i]
        e.style.borderColor = colors[i]
        e.classList.remove("hidden")
        e.classList.add("squareHov")
    })

}

let rgbColors = (fn)=>{ 
    colors = []
    for(i=0; i<squareNumbers; i++){
        colors.push(`rgb(${fn()}, ${fn()}, ${fn()})`)
        colorsSquads()
        codigoRGB.removeAttribute("style")
    }
    colorCorrecto = colors[Math.floor(Math.random()*(squareNumbers - 1))]
    titulo.style.color = "black" 
    codigoRGB.innerHTML = colorCorrecto
    setLives(lives)
}

let gameOver = () => {
    if(lives == 0){
        codigoRGB.innerHTML= "GAME OVER"
        codigoRGB.style.backgroundColor = "red"
        square.forEach((e)=>{
            e.classList.remove("squareHov")
            e.classList.add("hidden")
        })
    }
}

let win = () => {
    square.forEach((e)=>{
        e.style.backgroundColor = colorCorrecto
        codigoRGB.innerHTML= "¡¡CORRECTO!!"
        e.classList.remove("squareHov")
        e.classList.remove("hidden")
        e.style.borderColor = colorCorrecto
        titulo.style.color = colorCorrecto
    })
}
     square.forEach((e,i)=>{
        e.addEventListener("click", function(){
            console.log(e.style.backgroundColor)
            console.log(colorCorrecto)
           if(colorCorrecto == e.style.backgroundColor){
               win()
           }else {
               lives --
               e.style.backgroundColor = "#232323"
               e.classList.remove("squareHov")
               e.classList.add("hidden")
               setLives(lives)
            }
            gameOver()
        })
    }) 
 
let reload = () => {
    rgbColors(colorNumber)
    colorsSquads()
    lives = 3
    setLives(lives)
}

resetButton.addEventListener("click", function(){
    reload()
})

reload()


