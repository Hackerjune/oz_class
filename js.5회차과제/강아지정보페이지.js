const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"

const request1 = new XMLHttpRequest
const request2 = new XMLHttpRequest

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text") 
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")

const currentDogs = []

window.addEventListener("load", function(){

    // 강아지 사진 뿌리기
    request1.open("get", apiRandomDogs)
    request1.addEventListener("load", function(){
        const response = JSON.parse(request1.response)
        response.message.forEach(function(item){
            currentDogs.push(item)

            const dogImgDiv = document.createElement("div")
            dogImgDiv.classList.add("flex-item")
            dogImgDiv.innerHTML = `<img src = ${item}>`
            main.appendChild(dogImgDiv)
        });
    })
    request1.send()
    
    // 셀렉트에 견종정보 뿌리기

    request2.open("get", apiAllBreeds)
    request2.addEventListener("load", function(){
        const response = JSON.parse(request2.response)
        Object.keys(response.message).forEach(function(item){   // 객체의 키 값만 빼와서 배열을 만들어줌
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        })     
    })
    request2.send()
})
 
function action(){
    main.innerHTML = ""
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(input.value) !== -1
    })

    input.value = " "

filteredDogs.forEach(function(item){
    currentDogs.push(item)

    const dogImgDiv = document.createElement("div")
    dogImgDiv.classList.add("flex-item")
    dogImgDiv.innerHTML = `<img src = ${item}>`
    main.appendChild(dogImgDiv)
    })
}

select.addEventListener("change", function(){
    main.innerHTML = ""
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(select.value) !== -1
    })

filteredDogs.forEach(function(item){
    currentDogs.push(item)

    const dogImgDiv = document.createElement("div")
    dogImgDiv.classList.add("flex-item")
    dogImgDiv.innerHTML = `<img src = ${item}>`
    main.appendChild(dogImgDiv)
    })
})

function reset(){
    
        main.innerHTML = ""
        // 강아지 사진 뿌리기
        request1.open("get",apiRandomDogs)
        function handleRequest2Response(){
            const response = JSON.parse(request1.response)
            response.message.forEach(function(item){
                currentDogs.push(item)
                displayDogs(item)
            })
        }
        request1.send()
        request1.addEventListener("load",handleRequest2Response);
   
}