import { TouchBarColorPicker, TouchBarSlider } from 'electron';
import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      status: {
        off: true,
        work: false,
        rest: false
      },
      time: 0,
      timer: null
    }
  }

  imgRender = () => {
    if(this.state.status.work){
      return <img src="./images/work.png" />
    }else if(this.state.status.rest){
      return <img src="./images/rest.png" />
    }
  }

  formatTime = () => {
    const minutes = Math.floor(this.state.time / 60);
    const seconds = (this.state.time % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});

    return minutes + ':' + seconds;
  }

  step = () => {
    const secondsLeft = this.state.time - 1;

    this.setState({
      time: secondsLeft,
    });

    const status = this.state.status;

    if(secondsLeft < 1){

      if(status.work){
        this.playBell();

        this.setState({
          time: 20,
          status: {
            work: false,
            rest: true
          }
        })
      }else if(status.rest){
        this.playBell();

        this.setState({
          time: 1200,
          status: {
            work: true,
            rest: false
          }
        })
      }
    }
  }

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      time: 5,
      status: {
        work: true
      }
    });
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      time: 0,
      status: {
        off: true,
        work: false,
        rest: false
      }
    });
  }

  buttonRender = (button) => {
    if(button === 'start'){
      return <button className="btn" onClick={() => this.startTimer()}>Start</button>
    }else{
      return <button className="btn" onClick={() => this.stopTimer()}>Stop</button>
    }
  }

  closeApp = () => {
    window.close()
  }

  playBell = () => {
    const gongSound = new Audio('./sounds/bell.wav');

    gongSound.play()
  }

  appInfo = () => {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    )
  }

  render() {
    const status = this.state.status;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status.off && this.appInfo()}
        {this.imgRender()}
        <div className="timer">
        {!status.off && this.formatTime()}
        </div>
        {status.off ? this.buttonRender('start') : this.buttonRender('stop')}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};


render(<App />, document.querySelector('#app'));
