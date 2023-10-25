const Joi = require('joi')
const logger = require('./logger')
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(logger);

const array = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Mary'},
    {id: 3, name: 'Peter'}

];


app.get('/', (req,res) => {
    res.send('Welcome to the array !!!')
});

app.get('/api/courses', (req,res) => {
    res.send(array);
});

app.get('/api/courses/:id', (req,res) => {
    const course = array.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
}
);

app.post('/api/courses', (req,res) => {

   const { error } = validateCourse(req.body); // result.error
    if(error){
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
       
    }


    const course = {
        id: array.length + 1,
        name: req.body.name
    };
    array.push(course);
    res.send(course);
});



app.put('/api/courses/:id', (req,res) => {
    const course = array.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');


    // Validate
    // If invalid, return 400 - Bad request
    
    const { error } = validateCourse(req.body); // result.error
    if(error)
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
        
  
    // Update
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req,res) => {
    const course = array.find(c => c.id === parseInt(req.params.id));
    if(!course)  return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = array.indexOf(course);
    array.splice(index, 1);

    res.send(course);
});


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
