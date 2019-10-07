/* eslint-disable no-unused-vars */
/* eslint-disable react/require-render-return */
import React, { Component } from 'react';

import superagent from 'superagent';

class ScoreBoard extends Component {

    state= {
        scores: [],
        newPerson: {
            name: '',
            score: '',
        }
    }


    _refreshScoreBoard() {

        superagent.get('http://localhost:8080/scores')
            .then((response) => {
                this.setState({
                    scores: response.body
                  })
                console.log(this.state.scores)
            })
        
    }
    componentDidMount() {

         this._refreshScoreBoard();
    }

    deletePerson(_id) {
        console.log(_id);
        superagent.delete('http://localhost:8080/scores/' + _id, {
        })
          .then((response) => {          
            this._refreshScoreBoard();
          });
    }

    handleChangeName = (event) => {
        let {newPerson} = this.state;
        newPerson.name = event.target.value

        this.setState({ newPerson });
    }

    
    handleChangeScore = (event) => {
        let {newPerson} = this.state;
        newPerson.score = event.target.value;

        this.setState({ newPerson });
    }

    handleSubmit = (event) => {
        superagent.post('http://localhost:8080/scores/', this.state.newPerson)
            .then((response) => {

                let{ scores } = this.state;
                scores.push(response.body)

                this.setState({ scores, newPerson: { name: '', score: ''}});
            }) 
            
        
    }


    render() {
        return (
            <>
            <h1>High Scores!!!</h1>
            <ul>
                <div id="container">
                <p>Top Score: </p>

                <div id="scoreboard">

               {this.state.scores.map((person) => (

                    <li key={person._id}>
                    <p>{person.name} </p>
                    <p>{person.score} points</p>
                    <button onClick={this.deletePerson.bind(this, person._id)}>Delete</button>
                    </li>
               ))}
                </div>
                </div>
            </ul>

            <form>

                <input
                type="text"
                placeholder="Name"
                value={this.state.newPerson.name}
                onChange={this.handleChangeName}
                />
                 <input
                type="text"
                placeholder="Score"
                value={this.state.newPerson.score}
                onChange={this.handleChangeScore}
                />
            <button type="submit" onClick={this.handleSubmit}>Add Person</button>
            </form>
            </>
            
            )
        
        
    }
}

export default ScoreBoard;