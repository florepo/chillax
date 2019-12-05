// URLs
const API_ENDPOINT = "http://localhost:3000"
const URL_COMPOSITIONS = `${API_ENDPOINT}/compositions`
const URL_SOUNDS = `${API_ENDPOINT}/sounds`

// DOM ELEMENTS
const soundContainer = document.querySelector("#sound-container")
const soundList = document.querySelector("#sound-list")
const compositionList = document.querySelector("#composition-list")
const compSoundContainer = document.querySelector("#composition-sound-container")
const compForm = document.querySelector(".form")
const playCompBtn = document.querySelector("#playCompBtn")
const pauseCompBtn = document.querySelector("#pauseCompBtn")
const stopCompBtn = document.querySelector("#stopCompBtn")
const clearAllBtn = document.querySelector("#clearAllBtn")
const currentCompName = document.querySelector("#current-comp-name")

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

// EVENT LISTENERS
compForm.addEventListener("submit", (event) => {
    submitHandler(event)
})

playCompBtn.addEventListener("click", () => {
    playComposition()
})

pauseCompBtn.addEventListener("click", () => {
    pauseComposition()
})

stopCompBtn.addEventListener("click", () => {
    stopComposition()
})

clearAllBtn.addEventListener("click", () => {
    clearComposition()
})

// EVENT HANDLER
const addHandler = (event, sound, volume) => {
    renderSoundCard(sound, volume)
}

const delCompHandler = (event, composition) => {
    deleteComposition(event, composition.id)
}
const removeHandler = (event, composition) => {
    event.target.parentNode.remove()
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

    createComposition(data).then(response => response.json()).then(json => renderCompositionListElement(json))
        .then(currentCompName.innerText = name)
}

const playComposition = () => {
    const compSoundList = compSoundContainer.querySelectorAll("audio")
    
    return compSoundList.forEach((compSound) => {
        compSound.play()
    })
}

const pauseComposition = () => {
    const compSoundList = compSoundContainer.querySelectorAll("audio")
    
    return compSoundList.forEach((compSound) => {
        compSound.pause()
    })
}

const stopComposition = () => {
    const compSoundList = compSoundContainer.querySelectorAll("audio")
    
    return compSoundList.forEach((compSound) => {
        compSound.pause()
        compSound.currentTime = 0
    })
}

const clearComposition = () => {
    console.log("clicked")
    while (compSoundContainer.firstChild) compSoundContainer.removeChild(compSoundContainer.firstChild);
}

const loadSoundCompositionHandler = (event, composition) =>{
    let soundsArray = []
    composition.composition_sounds.forEach(cs =>{
        let id = cs["sound_id"]
        let result  = null
        let sounds = composition.sounds.filter(obj => {return obj.id === id})
        sounds = Array.from(sounds)
        console.log(sounds)
        result = sounds[0]
        result["volume"]=cs.volume
        soundsArray.push(result)
    }) 
    renderCompositionSounds(soundsArray)
    currentCompName.innerText = composition.name
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


const createComposition = (data) => {
    let url = URL_COMPOSITIONS
    return post(url, data)//.then(composition => renderCompositionElement(composition))
}

// SITE INITIALIZATION
getSounds().then(data => renderSoundList(data))
getCompositions().then(data => renderCompositionList(data))


// RENDER SOUNDS
const renderCompositionSounds = (sounds) => {
    while (compSoundContainer.firstChild) compSoundContainer.removeChild(compSoundContainer.firstChild);
    return sounds.forEach((sound) => {
        renderSoundCard(sound)
    })
}

const renderSoundCard = (sound) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", `${sound.id}`);

    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "img-container");

    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top");
    image.setAttribute("alt", "Sound Image");
    image.src = sound.image_url;  

    const button = document.createElement("button");
    button.setAttribute("class", "remove");
    button.addEventListener("click", () => removeHandler(event, sound))
    button.innerText = "x"
   

    const body = document.createElement("div");
    body.setAttribute("class", "card-body");
    body.setAttribute("id", `${sound.id}`);

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = sound.name;

    const p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerText = sound.description

    const player = renderAudioPlayer(sound)
    
    card.append(button)
    card.append(image)
    body.append(title, player);
    card.append(imageContainer, body);
    compSoundContainer.append(card);

}

const renderSoundList = (soundArray) => {
    //debugger
    return soundArray.forEach((sound) => {
        renderSoundListElement(sound)
    })
}

const renderSoundListElement = (sound) => {
    const li = document.createElement("li")
    const p = document.createElement("p")
    p.innerText = sound.name

    const addBtn = document.createElement("button")
    addBtn.setAttribute("class", "btn btn-primary")
    addBtn.innerText = "+"
    addBtn.addEventListener("click", () => addHandler(event, sound))

    const emptyP = document.createElement("p")
    
    li.append(p, addBtn, emptyP)
    soundList.append(li)
}

const renderCompositionList = (compositions) =>{
        compositions.forEach(composition =>{
            renderCompositionListElement(composition)
        })
}

const renderCompositionListElement = (composition) => {
    const li = document.createElement("li")
    li.setAttribute("is",`comp-${composition.id}`)

    const p = document.createElement("p")
    p.innerText = composition.name

    const loadBtn = document.createElement("button")
    loadBtn.setAttribute("class", "btn btn-primary")
    loadBtn.innerText = "Load"
    loadBtn.addEventListener("click", () => loadSoundCompositionHandler(event, composition))
    
    const delBtn = document.createElement("button")
    delBtn.setAttribute("class", "btn btn-danger")
    delBtn.innerText = "Delete"
    delBtn.addEventListener("click", () => delCompHandler(event, composition))

    const emptyP = document.createElement("p")

    li.append(p, loadBtn, delBtn, emptyP)
    compositionList.append(li)
}

// RENDER AUDIO PLAYER

const renderAudioPlayer = (sound) => {
    console.log(sound)
    console.log(sound.volume)
    

    const soundPlayer = document.createElement("audio")
    soundPlayer.src = sound.sound_url
    //soundPlayer.volume = volume
    soundPlayer.className = "player"
    soundPlayer.setAttribute("controls", "")
    soundPlayer.setAttribute("controlsList", "nodownload")
    soundPlayer.setAttribute("loop", "")
    if(sound.volume==undefined) {
        soundPlayer.volume = 1
    } else {
    soundPlayer.volume = sound.volume
    }

    soundPlayer.setAttribute("border-radius", "2px");

    const player = new Plyr('#player');

    return soundPlayer
}

