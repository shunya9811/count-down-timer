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
    this.props.start(this.state.tentHours, this.state.tentMinutes, this.state.tentSeconds)
  }

  render() {
    return (
      <>
        <div className='set'>
          <input type='number' placeholder='時間' min='0' className='input' value={this.state.tentHours} onChange={this.handleHours}/>
          <input type='number' placeholder='分' max='59' min='0' className='input' value={this.state.tentMinutes} onChange={this.handleMinutes}/>
          <input type='number' placeholder='秒' max='59' min='0' className='input' value={this.state.tentSeconds} onChange={this.handleSeconds}/>
          <button className='btn'>開始</button>
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
      seconds: '00'
    }
  }

  start(hours, minutes, seconds){

  }

  render(){
    return (
      <div className="App">
        <h1>Count down timer</h1>
        <hr width="30%" align="center"></hr>
        <SetTimer
          start={this.start}
        />
        <div className='timer'>00:00:00</div>
        <div className='operation'>
          <button className='btn'>一時停止</button>
          <button className='btn'>再スタート</button>
          <button className='btn'>リセット</button>
        </div>
      </div>
    );
  }
}

export default App;
