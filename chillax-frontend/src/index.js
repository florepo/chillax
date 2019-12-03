// URLs
const API_ENDPOINT = "http://localhost:3000/"
const URL_COMPOSITIONS = `${API_ENDPOINT}/compositions`
const URL_SOUNDS = `${API_ENDPOINT}/sounds`

// DOM elements
const soundContainer = document.querySelector("#sound-container")
const soundList = document.querySelector("#sound-list")

// EVENT HANDLER

const addHandler = (event, sound) => {
    console.log(event,sound)
}

// API
const apiHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

const get = (url) => {
    return fetch(url)
        .then(response => response.json())
        // .then(json => console.log(json))
}

const getSounds = () => {
    let url = URL_SOUNDS
    return get(url)
}

const getCompositions = () => {
    let url = URL_COMPOSITIONS
    return get(url)
}

getSounds().then(data => renderSoundList(data))

// render sound
const renderSoundList = (soundArray) => {
    console.log(soundArray)
    return soundArray.forEach((sound) => {
        renderSoundElement(sound)
    })
}

//render sound element
const renderSoundElement = (sound) => {
    console.log(sound)
    const li = document.createElement("li")
    li.innerText = sound.name

    const addBtn = document.createElement("button")
    addBtn.innerText = "+"

    addBtn.addEventListener("click", () => addHandler(event, sound))
    
    li.append(addBtn)
    soundList.append(li)
}