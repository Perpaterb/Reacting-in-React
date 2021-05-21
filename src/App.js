import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    running: false,
    timer: 300,
    bestScoreCount: 0,
    scoreCount: 0,
    targetSize: 100,
    targetsDown: 0,
    targets: [[-200,-200,-200,-200,-200,-200],[-200,-200,-200,-200,-200,-200]],
    newTargets: true,
    mouseX: 0,
    mouseY: 0,
  }
  
  _onMouseMove(e) {
    this.setState({ mouseX: e.nativeEvent.offsetX, mouseY: e.nativeEvent.offsetY });
  }
 
  handleStart = () => {
    this.setState({running: true})
    this.starttimer()
    //this.createTargetCoords(this.state.targetSize)
  }

  starttimer(){
      let timerId = setInterval(() => {this.setState({timer: this.state.timer - 1})}, 100)
      this.setState({timerId: timerId })
  }

  getRandom(min, max, size) {
    return Math.floor(Math.random() * ((max-(size)) - (min)) + min)
  }

  createTargetCoords(size){
    let targetX = []
    let targetY = []
    for(var i = 0; i < 6 ; i++) {
      let ok = true
      let x = this.getRandom(0, 1000, size)
      let y = this.getRandom(0, 600, size)
      for (let a = 0; a < targetX.length; a ++) {
        if (targetX[a] + (size) > x && targetX[a] - (size) < x) {
          if (targetY[a] + (size) > y && targetY[a] - (size) < y) {
            ok = false     
          } 
        }    
      }
      if (ok === true){
        targetX.push(x)
        targetY.push(y)
      } else {
        i--
      }          
    }
    this.setState({targets: [targetX,targetY]})
  }

  timeIsUp (){
    console.log("timeIsUp")
    clearInterval(this.state.timerId)
    this.setState({running: false})
    this.setState({timer: 300})
    this.setState({targetSize: 100})
    this.setState({scoreCount: 0})
    this.setState({newTargets: true})
    this.setState({targetsDown: 0})
    this.setState({targets: [[-200,-200,-200,-200,-200,-200],[-200,-200,-200,-200,-200,-200]]})
    if (this.state.scoreCount > this.state.bestScoreCount) {
      this.setState({ bestScoreCount: this.state.scoreCount })
    }
  }

  componentDidUpdate(){
    if (this.state.timer <= 0) {
      this.timeIsUp()
    }
    if (this.state.targets[0][0] !== -200){
      this.renderTargets()
    }
    if (this.state.targets[0][0] === -200){
      this.createTargetCoords(this.state.targetSize)
    }
    if (this.state.targetsDown === 6){
      this.newRound()
    }
  }

  renderTargets(){
    if (this.state.newTargets === true){
        console.log("Render" + this.state.targets)
        this.setState({ newTargets: false})
        this.setState({ target0PosY: this.state.targets[1][0]})
        this.setState({ target1PosY: this.state.targets[1][1]})
        this.setState({ target2PosY: this.state.targets[1][2]})
        this.setState({ target3PosY: this.state.targets[1][3]})
        this.setState({ target4PosY: this.state.targets[1][4]})
        this.setState({ target5PosY: this.state.targets[1][5]})
        this.setState({ target0PosX: this.state.targets[0][0]})
        this.setState({ target1PosX: this.state.targets[0][1]})
        this.setState({ target2PosX: this.state.targets[0][2]})
        this.setState({ target3PosX: this.state.targets[0][3]})
        this.setState({ target4PosX: this.state.targets[0][4]})
        this.setState({ target5PosX: this.state.targets[0][5]})
      
    }
 }

 targetClicked(target){
  this.setState({targetsDown: this.state.targetsDown + 1})
  this.setState({['target' + target + 'PosY']: -400})
  this.setState({['target' + target + 'PosX']: -400})
  this.setState({ scoreCount: this.state.scoreCount + 100})
  let xScore = this.state.targetSize / 2 - this.state.mouseX
  if (xScore < 0) {xScore = xScore *-1}
  xScore = 50 - xScore
  let yScore = this.state.targetSize / 2 - this.state.mouseY
  if (yScore < 0) {yScore = yScore *-1}
  yScore = 50 - yScore
  let score = Math.round((this.state.scoreCount + 100 + xScore + yScore)*100) /100
  this.setState({scoreCount: score})
 }

 newRound(){
  console.log("New Round")
  this.setState({targetsDown: 0})
  this.setState({targetSize: this.state.targetSize/1.3})
  this.setState({targets: [[-200,-200,-200,-200,-200,-200],[-200,-200,-200,-200,-200,-200]]})
  this.setState({newTargets: true})
 }

 restart(){
  this.setState({timer: 0})
 }


  render(){
    return (
    <div id="clickGame">
      <div id="border">
        {this.state.running ? (
          <div id="targetButDiv">
            <button id="target0" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('0')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target0PosX + "px", marginTop: this.state.target0PosY + "px"}}></button>
            <button id="target1" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('1')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target1PosX + "px", marginTop: this.state.target1PosY + "px"}}></button>
            <button id="target2" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('2')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target2PosX + "px", marginTop: this.state.target2PosY + "px"}}></button>
            <button id="target3" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('3')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target3PosX + "px", marginTop: this.state.target3PosY + "px"}}></button>
            <button id="target4" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('4')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target4PosX + "px", marginTop: this.state.target4PosY + "px"}}></button>
            <button id="target5" onMouseMove={this._onMouseMove.bind(this)} onClick={() => this.targetClicked('5')} style={{position: "absolute", width: this.state.targetSize + "px", height: this.state.targetSize + "px", backgroundColor: 'red', marginLeft: this.state.target5PosX + "px", marginTop: this.state.target5PosY + "px"}}></button>
          </div>
        ) : (
          <div id="startButDiv">
            <button id="startButton" onClick={this.handleStart}>Start</button>
          </div>
        )}   
      </div>
      <div id="totalScore">
        <h1 id="scoreText">Timer : {this.state.timer/10}</h1>
        <h1 id="scoreText">Score : {this.state.scoreCount}</h1>
        <h1 id="scoreText">Your Best : {this.state.bestScoreCount}</h1>
        <button id="restart" onClick={() => this.restart()}>Restart</button>
      </div>
    </div>
    )
  }
}

export default App;
