// DOM et variables
const dices = document.querySelectorAll('input')
const faces = document.querySelectorAll('span')
const language = document.querySelector('select')

const rollBtn = document.querySelector('#roll')
const rollReset = document.querySelector('#reset')
const checkDice = document.querySelector('.get-dice')
const checkDiceDone = document.querySelector('.ok')

const showResult = document.querySelector('.show-result')

const showDiceSingleValues = document.querySelector('.dice-single-values')
const diceList = document.querySelector('.dice-val')

const title = document.querySelector('.title')

let randParameter = []
let randResults = []
let result = 0


// récupération des paramètres de lancer de dé
function getParam(){
    
    for (let i = 0; i < dices.length; i++){
        const dice = {}
        dice.face = faces[i].innerText 
        dice.nbr = dices[i].value
        randParameter.push(dice)
    }
    
    console.log(randParameter)
}


// lancer des dés
function rollDices(){

    randParameter.forEach( (item) => {
        const temp = []
        for(let i = 0; i < item.nbr; i++){
            const rand = Math.floor(Math.random() * (parseInt(item.face))) + 1
            temp.push(rand)
            result += rand
        }
        randResults.push(temp)
    })

    console.log(randResults)
    console.log(result)
}


// gestions des events boutons

// le reset se fait avec le refresh de la page par comportement auto du submit de la form quand on clique sur le bouton reset

// roll des dés
rollBtn.addEventListener('click', (e) => {

    randParameter = []
    randResults = []
    result = 0  
    e.preventDefault()
    getParam()
    rollDices()  
    showResult.innerText = result
})

// affichage des jets individuels
checkDice.addEventListener('click',  () => {
    showDiceSingleValues.style.display = 'block'    
    randResults.forEach( (item, index) => {
        const diceListItem = document.createElement('li')
        let diceListItemText = randParameter[index].face + ' face : '
        if(item.length){
            diceListItem.innerText =  diceListItemText.concat(item.join(' '))
            diceList.appendChild(diceListItem)
        }
    })
})

// masque des jets individuels
checkDiceDone.addEventListener('click', () => {
    showDiceSingleValues.style.display = 'none'
    diceList.innerHTML = ''
})



