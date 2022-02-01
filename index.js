//const http = require('http')
const express = require ('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
]

app.get('/', (req, res) => {
    res.send('Hellos World!!!')
})

app.get('/api/courses', (req,res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found.')
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening on port ${port}...`))

app.post('/api/courses', (req, res) =>{ 
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and should be minimum 3 characters')
    
    //pasar el ultimo id de curso +1
    let newCourseId = courses[courses.length-1].id + 1  // toma ultimo id de curso y le suma 1
    let newCourseStr = '{"id": ' + newCourseId + ', "name": '+ JSON.stringify(req.body.name) + '}'
    const newCourse = JSON.parse(newCourseStr)
    courses.push(newCourse)
    res.send(newCourse)
})


app.put('/api/courses/:id', (req,res) => {
    // look up the course, if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found.')
    

    // validate, if invalid, return 404
    if (!req.body.name || req.body.name.length < 3) return res.status(400).send('Name is required and should be minimum 3 characters')

    let newCourseStr = '{"id": ' + req.body.id + ', "name": '+ JSON.stringify(req.body.name) + '}'
    console.log (newCourseStr)
    let courseModify = JSON.parse(newCourseStr)
    console.log(courseModify)
    courses.push(courseModify)
    res.send(courseModify)    
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found.')
    
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})

