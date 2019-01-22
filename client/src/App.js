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
import Clipboard from 'react-clipboard.js';
import Confetti from './Components/Confetti'
import API from './utils/API'
import ReactTooltip from 'react-tooltip'

const QRCode = require('qrcode.react');

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
    amount: 0,
    charge_id: '',
    paid: false,
    continuePlay: false,
    exit: false,
    error: false
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
    return friendArray

  }

  showModal = () => this.setState({ show: true })

  showLightning = () => {
    if (this.state.charge === '') {
      this.setState({ error: true })
    } else { this.setState({ showLightning: true }) }
  }

  handleHideThis = () => this.setState({ showLightning: false })

  handleHideModal = () => this.setState({ show: false, error: false }, () => this.handleEndOfGame())

  handleHideWin = () => this.setState({ showWin: false }, () => this.exitApp())

  componentDidMount() {
    API.getStrike()
      .then(data => {
        this.setState({ charge: data.data.body.payment_request })
        this.setState({ amount: data.data.body.amount })
        this.setState({ charge_id: data.data.body.id })
      })
      .catch(err => console.log(err))
  }

  getQR = () => this.setState({ showQR: true, showYes: false })

  chargePlayer = () => {
    API.getConfirm(this.state.charge_id)
      .then(data => {
        if (data.data.body.paid === true) {
          this.setState({ showQR: false })
          this.setState({ paid: true }, () => this.handleHideThis())
        } else { this.setState({ exit: true, showQR: false }) }
      })
      .catch(err => {
        console.log(err)
        this.setState({ showQR: false })
        this.setState({ exit: true })
      })
  }

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
      if (this.state.score === 4) {
        this.showLightning()
      }
    } if (this.state.score === 15) {
      this.setState({ showWin: true })
    }
    this.setState({ friends: this.shuffle(this.state.friends) })
  }

  handleEndOfGame = () => {
    this.setState({
      score: 0,
      topScore: this.state.topScore,
      alreadyChosenIds: [],
      correct: ''
    });
    this.setState({ friends: this.shuffle(this.state.friends) })
  };

  exitApp = () => {
    window.location.href = 'https://bitmemory.herokuapp.com'
  }

  getText() {
    return "03a8355790b89f4d96963019eb9413b9a2c884691837ac976bacfe25a5212892d7@99.71.113.187:9735";
  }

  getPaymentRequest = () => {
    const charge = this.state.charge
    return charge
  }

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
              show={this.state.error}>
              <h1>We apologize!</h1><br /> 
              <h1>Meme-ory is currently not working.</h1>
              <h1>Please try again later</h1>
              <button className="standard-btn" id='modal' onClick={this.handleHideModal}>Play again?</button>
            </Modal>


            <Modal
              show={this.state.showLightning}>
              {this.state.showYes ?
                <span>
                  <h1>Continue playing?</h1>
                  <button id='modal' onClick={this.getQR}>Yes!</button></span> : null}
              {this.state.showQR ?
                <span>
                  <QRCode value={this.state.charge}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                    renderAs={"svg"} />
                  <h1 className='charge'><strong>Amount: {this.state.amount} satoshi</strong></h1>
                  <hr />
                  <h1 className='charge2'>No mobile device? Copy payment request below! </h1>
                  <textarea id="bar">{this.state.charge}</textarea><br />
                  <Clipboard option-text={this.getPaymentRequest} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                    Copy Payment Request</Clipboard><br />
                  <ReactTooltip />
                  <hr />
                  <h1 className='charge'><strong>After you have paid, click here to continue your game<i className="fas fa-arrow-circle-right"></i></strong><button className="standard-btn" id='modal' onClick={this.chargePlayer}>Continue Game</button></h1>
                </span>
                : null}
              {this.state.exit ?
                <span>
                  <h1>Bummer...no Payment received</h1>
                  <button className="standard-btn" id='modal' onClick={this.exitApp}>Exit</button>
                </span>
                : null}
            </Modal>


            <Modal
              show={this.state.showWin}>
              <Confetti />
              YOU MADE IT TO THE MOON!<br />
              <p id='connect'>Connect with the creators of BTC Meme-ory on Lightning {'  '}<i className="fas fa-bolt"></i>{'  '}
                <Clipboard option-text={this.getText} data-tip="Copied" data-event='click' className="standard-btn" id='modal' >
                  <i className="fas fa-paste"></i> Connection Code </Clipboard></p>
              <ReactTooltip />

              <button className="standard-btn" id='modal' onClick={this.handleHideWin}>Play again?</button>
            </Modal>

          </Row>
          <footer>Version 1.0< a href='https://github.com/bitmemory'><i className="fab fa-github"></i></a></footer>
        </Container>
      </Wrapper>
    );
  }
}

export default App;