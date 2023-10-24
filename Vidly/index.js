const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genre = [
    { id: 1, name: 'Action' },
    { id : 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
];


app.get('/', (req,res) => {
    res.send('Welcome to the Website !!!')
});


app.get('/api/genre', (req,res) => {
    res.send(genre);
});

app.get('/api/genre/:id', (req,res) => {
    const g = gen.find(c => c.id === parseInt(req.params.id));
    if(!g) return res.status(404).send('The genre with the given ID was not found');

    res.send(g);
});

app.post('/api/genre/', (req,res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const g = {
        id: genre.length + 1,
        name: req.body.name
    };
    genre.push(g);
    res.send(g);
});


app.put('/api/genre/:id', (req,res) => {
    const g = genre.find(c => c.id === parseInt(req.params.id));
    if(!g) return res.status(404).send('The genre with the given ID was not found');

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    g.name = req.body.name;
    res.send(g);
});

app.delete('/api/genre/:id', (req,res) => {
    const g = genre.find(c => c.id === parseInt(req.params.id));
    if(!g) return res.status(404).send('The genre with the given ID was not found');

    const index = genre.indexOf(g);
    genre.splice(index,1);

    res.send(g);
});




function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
