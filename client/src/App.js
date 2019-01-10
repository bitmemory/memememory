import React, { Component } from 'react';
import FriendCard from './Components/FriendCard/FriendCard'
import Wrapper from "./Components/Wrapper/Wrapper"
import Title from './Components/Title/Title'
import friends from './friends.json'
import './App.css';
import Navbar from './Components/Navbar/navbar'
import Modal from './Components/Modal/Modal'
import Column from './Components/column'
import Row from './Components/row'
import Container from './Components/container'
import axios from 'axios'
import QR from './Components/Lightning'

class App extends Component {
  state = {
    friends,
    score: 0,
    topScore: 0,
    alreadyChosenIds: [],
    correct: "",
    show: false,
    showLightning: false,
    showWin: false,
    showQR: false,
    charge: '',
    showYes: true,
    amount: 0
  };

  //FISHER YATES SORTING FORMULA FOR SHUFFLING AN ARRAY
  shuffle = friendArray => {
    var i = 0
      , j = 0
      , temp = null

    for (i = friendArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = friendArray[i]
      friendArray[i] = friendArray[j]
      friendArray[j] = temp
    }
    // console.log("NEW ARRAY")
    return friendArray

  }

  showModal = () => this.setState({ show: true })

  showLightning = () => this.setState({ showLightning: true })

  handleHideModal = () => this.setState({ show: false }, () => this.handleEndOfGame())

  componentDidMount() {
    axios.get('/api/charge')
      .then(data => {
        this.setState({ charge: `'${data.data.body.payment_request}'` })
        this.setState({ amount: data.data.body.amount })
        console.log(data.data)
        console.log(this.state.charge)
        console.log(data.data.body.amount)
      })
      .catch(err => console.log(err))
  }

  getQR = () => this.setState({ showQR: true, showYes: false })

  handleClick = id => {

    console.log(id)
    if (this.state.alreadyChosenIds.indexOf(id) === -1) {
      this.handleScoring();
      this.setState({ alreadyChosenIds: this.state.alreadyChosenIds.concat(id) });
    } else
      if (this.state.alreadyChosenIds.indexOf(id) >= 0) {
        this.setState({ correct: "NO!" }, () => this.showModal())
      }
  }

  handleScoring = () => {
    this.setState({ correct: "Yes. Keep hodling" })
    const theScore = this.state.score + 1
    this.setState({ score: theScore })
    if (theScore > this.state.topScore) {
      this.setState({ topScore: theScore })
      // if (this.state.score === 1) {
      //   this.getLightning() }
      if (this.state.score === 4) {
        this.showLightning()
      }
    } if (this.state.score === 16) {
      this.showWin()
    }
    this.setState({ friends: this.shuffle(this.state.friends) })
  }

  handleEndOfGame = () => {

    //  alert("I'm sorry. You clicked the same card twice. Please try again")
    this.setState({
      score: 0,
      topScore: this.state.topScore,
      alreadyChosenIds: [],
      correct: ''
    });
    this.setState({ friends: this.shuffle(this.state.friends) })
  };


  render() {
    return (

      <Wrapper>
        <Navbar><span id="score"> Score: {this.state.score} </span>{"  "} <span id="topscore"> Top Score: {this.state.topScore}</span>{" "} <span id="correct"> Correct? {this.state.correct}{" "}</span></Navbar>
        <Title><strong>meme-ory</strong></Title>

        <Container>
          <Row>
            <p>Click on an image. After you click, the images will reshuffle. Don't click on the same image twice!</p>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  id={friend.id}
                  key={friend.id}
                  name={friend.name}
                  image={friend.image}
                  handleClick={this.handleClick}
                // handleScoring={this.handleScoring}
                // handleEndOfGame={this.handleEndOfGame}

                />
              </Column>
            ))}
            <Modal
              show={this.state.show}>
              You clicked {this.state.score} correctly...<br />
              but then you double clicked.<br />
              YOUR SCORE IS REKT.<br />
              <button className="standard-btn" id='modal' onClick={this.handleHideModal}>Play again?</button>
            </Modal>

            <Modal
              show={this.state.showLightning}>
              {this.state.showYes ?
                <span>
                  <h1>Continue playing?</h1><br />
                  <button onClick={this.getQR}>Yes!</button></span> : null}
              {this.state.showQR ? <span> <QR
                value={this.state.charge} />
         
                <h1>Amount: {this.state.amount} satoshi</h1>
                <h1>Awesome! Scan here to continue</h1>
              </span>
                : null}
            </Modal>


            <Modal
              show={this.state.showWin}>
              YOU WIN!!!<br />
              <button className="standard-btn" id='modal' onClick={this.handleHideModal}>Play again?</button>
            </Modal>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;