//const http = require('http')

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
]

const inputEl = document.getElementById("input-el")
const addBtn = document.getElementById("add-btn")
const modifyBtn = document.getElementById("modify-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

// Functions
addBtn.addEventListener("click", function(){
    if(inputEl.value != ""){
        //pasar el ultimo id de curso +1
        let newCourseId = courses[courses.length-1].id + 1  // toma ultimo id de curso y le suma 1
        let newCourseStr = '{"id": ' + newCourseId + ', "name": "'+ inputEl.value + '"}'
        let newCourse = JSON.parse(newCourseStr)
        courses.push(newCourse)
        inputEl.value = ""
        localStorage.setItem("newCourse", JSON.stringify(newCourse))
        render(courses)
    }
    //empty input
})

function render(item){
    let listItems = ""
    for(let i=0; i< item.length; i++){
        listItems += `
            <li>
                <p> 
                ${JSON.stringify(item[i].name)}
                </p>
            </li>

        `        
    }
    ulEl.innerHTML = listItems
}

render(courses)