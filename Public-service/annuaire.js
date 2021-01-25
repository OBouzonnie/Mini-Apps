'use strict'
// DOM

const dep = document.getElementById('departement')
const etab = document.getElementById('etablissement')
const affiche = document.getElementById('affichage')
const btn = document.getElementById('btn-recherche')
const info = document.getElementById('info')
const filterResult = document.querySelector('.filter-results')
let itemList

// création de la liste des département

let depNbr

for(let i = 0; i < 95; i++){
    depNbr = i+1
    if(depNbr<10){
        depNbr = '0' + depNbr
    }
    let departement = document.createElement('option')
    departement.value = depNbr
    departement.innerText = depNbr 
    dep.appendChild(departement)    
}

for(let i = 971; i <= 976; i++){
    if(i !== 975){
        depNbr = i
        let departement = document.createElement('option')
        departement.value = depNbr
        departement.innerText = depNbr 
        dep.appendChild(departement)
    }
}

// filtre masqué avant requête 

filterResult.style.display = 'none'

// Requete

btn.parentNode.addEventListener('submit',e => {

    e.preventDefault()

    filterResult.style.display = 'block'


    affiche.innerHTML = ""
    info.innerText = ""

    const fetchUrl = `http://etablissements-publics.api.gouv.fr/v3/departements/${dep.value}/${etab.value}`

    fetch(fetchUrl)
    .then(rep => {
        if(!rep.ok){
            throw Error(rep.statusText)
        }
        return rep.json()
    })
    .then(data => {

        // console.log(data)

        if(data.features.length !== 0){
            for(let i = 0; i < data.features.length; i++){
                let item = document.createElement('li')
                let itemNom = document.createElement('p')
                let itemTel = document.createElement('p')
                itemNom.textContent = data.features[i].properties.nom
                itemTel.textContent = 'Tél : ' + data.features[i].properties.telephone
                // console.log(itemNom, itemTel)
                item.appendChild(itemNom)
                item.appendChild(itemTel)
                item.classList.add('list-group-item')
                affiche.appendChild(item)
            }
            itemList = document.querySelectorAll('#affichage li')
            filterResult.value = ''
        }
        else{
            info.innerText = "Pas de données"
        }
    })
    .catch(e => {
        alert(e)
    })
})

// filtre

filterResult.parentNode.addEventListener('submit', e => e.preventDefault())

filterResult.addEventListener('input', (e) => {
    e.preventDefault()
    console.log(itemList)
    for(let i = 0; i < itemList.length; i++){
        console.log(itemList[i].children[0].innerText.indexOf(e.target.value))
        if(itemList[i].children[0].innerText.indexOf(e.target.value) === -1)
        itemList[i].style.display = 'none'
        else itemList[i].style.display = 'block'
    }
})