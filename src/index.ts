import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware)

const db = {
    courses: [
        {id: 1, title: 'frontend'},
        {id: 2, title: 'backend'},
        {id: 3, title: 'qa'},
        {id: 4, title: 'devops'}
    ]
}

app.get('/', (req, res) => {
    res.send('server is workin');
})
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if(req.query.title) {
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title as string) > -1);
    }

    res.json(foundCourses);
})
app.get('/courses/:id', (req, res) => {
    const foundCore = db.courses.find(c => c.id === +req.params.id)

    if(!foundCore) {
        res.sendStatus(404);
        return;
    } 
    
    res.json(foundCore);
    
})
app.post('/courses', (req, res) => {
    
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    }
    db.courses.push(createdCourse);
    res
        .status(201)
        .json(createdCourse);
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id)

    res.sendStatus(204);
    
})
app.put('/courses/:id', (req, res) => {
    if(!req.body.title) {
        res.sendStatus(404);
        return;
    } 

    const foundCore = db.courses.find(c => c.id === +req.params.id)
    if(!foundCore) {
        res.sendStatus(404);
        return;
    } 

    foundCore.title = req.body.title;
    
    res.sendStatus(204);
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})