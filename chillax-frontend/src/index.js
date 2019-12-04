// URLs
const API_ENDPOINT = "http://localhost:3000"
const URL_COMPOSITIONS = `${API_ENDPOINT}/compositions`
const URL_SOUNDS = `${API_ENDPOINT}/sounds`

// API
const apiHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

const get = (url) => {
    return fetch(url)
        .then(response => response.json())
        //.then(json => console.log(json))
}

const post = (url, data) => {
    //debugger
    const configObject =  {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(data)
    }
    return fetch(url, configObject)
        //.then(response => response.json())
}

const patch = (instance_url, data) => {
    const confiObject = {
        method: "PATCH",
        headers: apiHeaders,
        body: JSON.stringify(data)
        }
    return fetch(instance_url,confiObject)
        .then(response => response.json())
}

const destroy = (instance_url) => {
    const configObject = {
        method: "DELETE"
      }
    return fetch(instance_url, configObject)
        //.then(response => response.json()) ehy does this need to be commented out?
}

// DOM ELEMENTS
const compSoundContainer = document.querySelector("#composition-sound-container")
const soundContainer = document.querySelector("#sound-container")
const compositionList = document.querySelector("#composition-list")
const soundList = document.querySelector("#sound-list")
const compForm = document.querySelector(".form")


// EVENT LISTENERS
compForm.addEventListener("submit", (event) => {
    submitHandler(event)
})

// EVENT HANDLER
const addHandler = (event, sound, volume) => {
    renderSoundCard(sound, volume)
}

const delCompHandler = (event, composition) => {
    deleteComposition(event, composition.id)
}

const submitHandler = (event) => {
    event.preventDefault()
    const name = compForm.querySelector("input[name=name]").value
    const soundCardNodes = compSoundContainer.childNodes
    let soundCards = []
    const data = {}

    for(let i = 1; i < soundCardNodes.length; i++) {
        soundCards[i] = soundCardNodes[i]
    }
    soundCards.forEach((soundCard, index) => {
        data[index] = extractData(soundCard)
   
    })
    data[Object.keys(data).length+1] = name     //composition name
    data[Object.keys(data).length+1] = 1        //user_id
    console.log(data)
    createComposition(data).then(response => response.json()).then(json => renderCompositionListElement(json))
}

const loadSoundCompositionHandler = (event, composition) =>{
    console.log("load sounds for composition")
    console.log(composition)
    //debugger
    //const sound_data = prepDataForRending(composition)
    renderCompositionSounds(composition)
}

//DATA HANDLING

const getSounds = () => {
    let url = URL_SOUNDS
    return get(url)
}

const getCompositions = () => {
    let url = URL_COMPOSITIONS
    return get(url)
}

const deleteComposition = (event, composition_id) => {
    let instance_url = URL_COMPOSITIONS + `/${composition_id}`
    return destroy(instance_url).then(event.target.parentElement.remove())
}

const extractData = (soundCard) => {
    const volume = soundCard.querySelector("audio").volume
    const id = parseInt(soundCard.id)
    return {id: id, volume: volume}
}

const prepDataForRending = (composition) => {
    // console.log("load function")
    // composition.composition_sounds.map(cs=>{
    //     cs.

    // })
}

const createComposition = (data) => {
    let url = URL_COMPOSITIONS
    return post(url, data)//.then(composition => renderCompositionElement(composition))
}

// SITE INITIALIZATION
getSounds().then(data => renderSoundList(data))
getCompositions().then(data => renderCompositionList(data))


// RENDER SOUNDS
const renderCompositionSounds = (composition, volume) => {
    //refresh
    while (compSoundContainer.firstChild) compSoundContainer.removeChild(compSoundContainer.firstChild);
    //debugger
    // needs to change here....

    //
    return composition.sounds.forEach((sound) => {
        renderSoundCard(sound, volume)
    })
}

const renderSoundList = (soundArray) => {
    //debugger
    return soundArray.forEach((sound) => {
        renderSoundListElement(sound)
    })
}

const renderSoundListElement = (sound) => {
    const li = document.createElement("li")
    li.innerText = sound.name

    const addBtn = document.createElement("button")
    addBtn.innerText = "+"
    addBtn.addEventListener("click", () => addHandler(event, sound))
    
    li.append(addBtn)
    soundList.append(li)
}

const renderSoundCard = (sound, volume) => {
    console.log("render Sound")
    const soundName = document.createElement("h2");
    soundName.innerText = sound.name;
    
    const soundDesc = document.createElement("p")
    soundDesc.innerText = sound.description

    const soundImg = document.createElement("img");
    soundImg.setAttribute("class", "sound-img");
    soundImg.src = sound.image_url;  

    const soundDiv = document.createElement("div");
    soundDiv.setAttribute("class", "sound-card");
    soundDiv.setAttribute("id", `${sound.id}`);
    soundDiv.append(soundName, soundDesc, soundImg, renderAudioPlayer(sound, volume))
    compSoundContainer.append(soundDiv);
}


const renderCompositionList = (compositions) =>{
        compositions.forEach(composition =>{
            renderCompositionListElement(composition)
        })
}

const renderCompositionListElement = (composition) => {
    // console.log(composition)
    const li = document.createElement("li")
    li.innerText = composition.name
    li.setAttribute("is",`comp-${composition.id}`)


    const loadBtn = document.createElement("button")
    loadBtn.innerText = "Load"
    loadBtn.addEventListener("click", () => loadSoundCompositionHandler(event, composition))
    
    const delBtn = document.createElement("button")
    delBtn.innerText = "Delete"
    delBtn.addEventListener("click", () => delCompHandler(event, composition))


    li.append(loadBtn,delBtn)
    compositionList.append(li)
}

// RENDER AUDIO PLAYER

const renderAudioPlayer = (sound, volume) => {

    const soundPlayer = document.createElement("audio")
    soundPlayer.src = sound.sound_url
    //soundPlayer.volume = volume
    soundPlayer.className = "player"
    soundPlayer.setAttribute("controls", "")
    soundPlayer.setAttribute("controlsList", "nodownload")
    soundPlayer.setAttribute("loop", "")
    soundPlayer.setAttribute("volume", `${volume}`)

    return soundPlayer
}

