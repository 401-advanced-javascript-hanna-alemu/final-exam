'use strict';

const express = require('express');

const router = express.Router();

router.get('/scores', handleGet);

router.get('/scores-bigger-than/:value', handleGetBiggerThan);

router.post('/scores', handlePost);

router.delete('/scores/:_id', handleDelete)

const uuid = require('uuid/v4');

let scores = [
    {_id: uuid(), name: 'Peter', score: '100'},
    {_id: uuid(), name: 'Hanna', score: '30'},
    {_id: uuid(), name: 'Nate', score: '200'},
    {_id: uuid(), name: 'Ben', score: '50'},
    {_id: uuid(), name: 'Sam', score: '60'}

]
//Hannna - this function returns an array of scores sorted by scores in descending order
function handleGet (request, response, next) {

const sortByScores = (array) => {
    array.sort((a, b) => {
      return (b.score - a.score);
    });
    return(array);
  };
    response.status(200).json(sortByScores(scores));

}

// Hanna - this function returns an array of all scores bigger than the passed value, or returns empty array if none are bigger than the given value
function handleGetBiggerThan(request, response, next) {
    let value = request.params.value;
    
    console.log(value);
    let results = [];
    scores.forEach(person => {
        if( person.score > value) {
            results.push(person);
        }
    })
    console.log(results);
    response.status(200).json(results);
 
}

//Hanna - this function adds a new score to storage
function handlePost(request, response, next) {
    const data = request.body;
    console.log(data);
    data._id = uuid();

    scores.push(data);
    response.status(200).json(scores)

}

//Hanna - this function deletes a score by id
function handleDelete(request, response, next) {
    const { _id } = request.params;
    
    scores = scores.filter(person => person._id !== _id);
    response.status(200).json(scores);

}

module.exports = router;
