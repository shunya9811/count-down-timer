import React from 'react';
import './App.css'

class SetTimer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tentHours : '',
      tentMinutes : '',
      tentSeconds: ''
    }
    this.handleHours = this.handleHours.bind(this)
    this.handleMinutes = this.handleMinutes.bind(this)
    this.handleSeconds = this.handleSeconds.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleHours(e){
    this.setState({
      tentHours: e.target.value
    })
  }

  handleMinutes(e){
    let minute;
    if (e.target.value >= 60){
      minute = 59
    } else {
      minute = e.target.value
    }
    this.setState({
      tentMinutes: minute
    })
  }

  handleSeconds(e){
    let second;
    if (e.target.value >= 60){
      second = 59
    } else {
      second = e.target.value
    }
    this.setState({
      tentSeconds: second
    })
  }

  handleClick(){
    let hour;
    let minute;
    let second;

    if (this.state.tentHours === ""){
      hour = "00"
    } else {
      hour = this.state.tentHours
    }

    if (this.state.tentMinutes === ""){
      minute = "00"
    } else {
      minute = this.state.tentMinutes
    }

    if (this.state.tentSeconds === ""){
      second = "00"
    } else {
      second = this.state.tentSeconds
    }

    this.props.start(hour, minute, second)
    this.setState({
      tentHours : "",
      tentMinutes: "",
      tentSeconds: "",
    })
  }

  render() {
    return (
      <>
        <div className='set'>
          <input type='number' placeholder='時間' min='0' className='input' value={this.state.tentHours} onChange={this.handleHours}/>
          <input type='number' placeholder='分' max='59' min='0' className='input' value={this.state.tentMinutes} onChange={this.handleMinutes}/>
          <input type='number' placeholder='秒' max='59' min='0' className='input' value={this.state.tentSeconds} onChange={this.handleSeconds}/>
          <button className='btn' onClick={this.handleClick} disabled={this.props.started}>開始</button>
        </div>
      </>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      isTimeUp: false,
      started: false, //開始が押されたらtrue 
      moving: false, //開始が押されて、一時停止が押されたらtrue 再スタートが押されたら
      intervalId: ''
    }
    this.start = this.start.bind(this)
    this.run = this.run.bind(this)
    this.stop = this.stop.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this.formatDisplay = this.formatDisplay.bind(this)
  }

  formatDisplay() {
    let displayString = "";
    displayString += ("0" + this.state.hours).slice(-2) + ":"
    displayString += ("0" + this.state.minutes).slice(-2) + ":"
    displayString += ("0" + this.state.seconds).slice(-2)
    return displayString
  }

  start(hours, minutes, seconds){
    this.setState({
      hours, minutes, seconds,
      started: true,
      moving: true
    });
    this.run();
    this.setState({
      intervalId: setInterval(this.run, 1000)
    })
  }

  run(){
    let updatedHours = parseInt(this.state.hours)
    let updatedMinutes = parseInt(this.state.minutes)
    let updatedSeconds = parseInt(this.state.seconds)

    if (updatedSeconds === 0){
      if (updatedMinutes === 0){
        if (updatedHours === 0) {
          if (this.state.moving === true){
            this.setState({
              isTimeUp : true
            })          
          }
          clearInterval(this.state.intervalId)
          return
        }
        updatedHours--
        updatedMinutes = 60;
        updatedSeconds = 60;
        
      } 
      updatedMinutes--
      updatedSeconds = 60;
    }
    updatedSeconds--
    

    this.setState({
      hours: updatedHours.toString(),
      minutes: updatedMinutes.toString(),
      seconds: updatedSeconds.toString(),
    })

  }

  stop(){
    clearInterval(this.state.intervalId)
    this.setState({
      moving: false
    })
  }

  resume(){
    this.setState({
      moving: true
    })
    this.run()
    this.setState({
      intervalId: setInterval(this.run, 1000)
    })
  }

  reset(){
    clearInterval(this.state.intervalId)
    this.setState({
      hours: '00',
      minutes: '00',
      seconds: '00',
      isTimeUp: false,
      started: false, 
      moving: false,
      intervalId: ''
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Count down timer</h1>
        <hr width="30%" align="center"></hr>
        <SetTimer
          start={this.start}
          started={this.state.started}
        />
        <div className='timer'>{this.formatDisplay()}</div>
        <div className='operation'>
          <button className='btn' onClick={this.stop} disabled={this.state.started && !this.state.isTimeUp ? !this.state.moving : true}>一時停止</button>
          <button className='btn' onClick={this.resume} disabled={this.state.started && !this.state.isTimeUp ? this.state.moving : true}>再スタート</button>
          <button className='btn' onClick={this.reset} disabled={!this.state.started}>リセット</button>
        </div>
        <div className='timeup'>{this.state.isTimeUp ? "Time Up!" : ""}</div>
      </div>
    );
  }
}

export default App;
