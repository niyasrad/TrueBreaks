import React, { Component } from 'react';
import beep from '../assets/beep.mp3'
class HeroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breaklen: 5,
            sessionlen: 25,
            paused: true,
            break: false,
            progress: "25:00",
            minutes1: 25,
            seconds1: 0,
            minutes2: 5,
            seconds2: 0,
            label: "Pomodoro. Time to work!",
            dark: false
        }
        this.handleBreak = this.handleBreak.bind(this);
        this.handleSession = this.handleSession.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({
            dark: !this.state.dark
        })     
    }
    handleBreak(e){
        let data = e.target.innerHTML;
        if(!this.state.paused){
            return
        }
        const  { breaklen, minutes2} = this.state;
        if (data === "+" && this.state.breaklen < 60){
            if(this.state.break){
                this.setState({
                    breaklen: this.state.breaklen + 1,
                    minutes2: this.minutes2+ 1,
                    seconds2: 0,
                    progress: (breaklen+1) < 10? "0"+(breaklen+1)+":"+"00": ""+(breaklen+1)+":"+"00"
                })
            } else{
                this.setState({
                    breaklen: this.state.breaklen + 1,
                    minutes2: this.minutes2+ 1,
                    seconds2: 0,
                })
            }
            
        } else if (data === "-" && this.state.breaklen > 1) {
            if(this.state.break && minutes2!==1){
                this.setState({
                    breaklen: this.state.breaklen - 1,
                    minutes2: this.minutes2- 1,
                    seconds2: 0,
                    progress: (breaklen-1) < 10? "0"+(breaklen-1)+":"+"00": ""+(breaklen-1)+":"+"00"
                })
            } else{
                this.setState({
                    breaklen: this.state.breaklen - 1,
                    minutes2: this.minutes2- 1,
                    seconds2: 0,
                })
            }
        }
    }
    handleSession(e){
        let data = e.target.innerHTML;
        if(!this.state.paused){
            return
        }
        const  { sessionlen, minutes1 } = this.state;
        if (data === "+" && this.state.sessionlen < 60){
            if(!this.state.break){
                this.setState({
                    sessionlen: this.state.sessionlen + 1,
                    minutes1: this.minutes1+ 1,
                    seconds1: 0,
                    progress: (sessionlen+1) < 10? "0"+(sessionlen+1)+":"+"00": ""+(sessionlen+1)+":"+"00"
                })
            } else{
                this.setState({
                    sessionlen: this.state.sessionlen + 1,
                    minutes1: this.minutes1+ 1,
                    seconds1: 0,
                })
            }
        } else if (data === "-" && this.state.sessionlen > 1) {
            if(!this.state.break && minutes1!==1){
                this.setState({
                    sessionlen: this.state.sessionlen - 1,
                    minutes1: this.minutes1- 1,
                    seconds1: 0,
                    progress: (sessionlen-1) < 10? "0"+(sessionlen-1)+":"+"00": ""+(sessionlen-1)+":"+"00"
                })
            } else{
                this.setState({
                    sessionlen: this.state.sessionlen - 1,
                    minutes1: this.minutes1- 1,
                    seconds1: 0,
                })
            }
        }
    }
    startTimer1 = () => {
        this.timer1 = setInterval(this.countDown1, 1000);
    }
    stopTimer1 = () => {
        clearInterval(this.timer1);
    }
    startTimer2 = () => {
        this.timer2 = setInterval(this.countDown2, 1000);
    }
    stopTimer2 = () => {
        clearInterval(this.timer2);
    }
    handlePause(){
        if (this.state.break){
            if(this.state.paused){
                this.setState({
                    paused: !this.state.paused,
                })
                this.startTimer2();
            } else {
                this.setState({
                    paused: !this.state.paused,
                })
                this.stopTimer2();
            }
        } else{
            if(this.state.paused){
                this.setState({
                    paused: !this.state.paused,
                })
                this.startTimer1();
                console.log('started');
            } else {
                this.setState({
                    paused: !this.state.paused,
                })
                this.stopTimer1();
            }
        }       
    }
    convertToSeconds = ( minutes,seconds) => {
        return seconds + minutes * 60;
    }
    hmsToSecondsOnly = (str) => {
        var p = str.split(':'),s = 0, m = 1;
    
        while (p.length > 0) {
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }
        console.log(s);
        
        return s;
    }
    countDown1 = () => {
        let c_seconds = this.hmsToSecondsOnly(this.state.progress);
        if (c_seconds > 0){
            const result2 = new Date((c_seconds-1) * 1000).toISOString().slice(14, 19);
            this.setState({
                progress: result2
            })
        } else{
            this.setState({
                progress: "00:00"
            })
            this.setState({
                progress: this.state.breaklen < 10? "0"+this.state.breaklen+":00": ""+this.state.breaklen+":00",
                label: "Break. You deserve it!"
            })
            this.stopTimer1();
            document.getElementById("beep").play();
            this.startTimer2();
        }
        
    }
    countDown2 = () => {
        let c_seconds = this.hmsToSecondsOnly(this.state.progress);
        if (c_seconds > 0){
            const result2 = new Date((c_seconds-1) * 1000).toISOString().slice(14, 19);
            this.setState({
                progress: result2
            })
        } else{
            this.setState({
                progress: "00:00",
                
            })
            this.stopTimer2();
            document.getElementById("beep").play();
            this.handleReset();
        }
    }
    handleReset(){
        document.getElementById("beep").pause();
        document.getElementById("beep").currentTime = 0;
        this.stopTimer1();
        this.stopTimer2();
        this.setState({
            breaklen: 5,
            sessionlen: 25,
            paused: true,
            break: false,
            progress: "25:00",
            minutes: 25,
            seconds: 0,
            label: "Pomodoro. Time to work!"

        })
    }
    render() {
        return (
            <div className={`screenis${this.state.dark}`}>
                <audio id="beep" src={beep}/>
                <div className="intro">
                    <h1>TrueBreaks</h1>
                    <h4>Structure it all.</h4>
                </div>
                <div className="outro">
                    <div className="abovePart">
                        <div className={`small-glassis${this.state.dark}`}>
                            <div id="break-label">Break</div>
                            <button id="break-decrement" className={`buttonis${this.state.dark}`} onClick={this.handleBreak}>-</button>
                            <button id="break-increment" className={`buttonis${this.state.dark}`} onClick={this.handleBreak}>+</button>
                            <div id="break-length">{this.state.breaklen}</div>
                        </div>
                        <div className={`small-glassis${this.state.dark}`}>
                            <div id="session-label">Session</div>
                            <button id="session-decrement" className={`buttonis${this.state.dark}`} onClick={this.handleSession}>-</button>
                            <button id="session-increment" className={`buttonis${this.state.dark}`} onClick={this.handleSession}>+</button>
                            <div id="session-length">{this.state.sessionlen}</div>
                        </div>
                    </div>
                    <div className="belowPart">
                        <div className={`long-glassis${this.state.dark}`}>
                            <div id="timer-label">{this.state.label}</div>
                            <div id="time-left">{this.state.progress}</div>
                        </div>
                        <div className="footer">
                            <button id="start_stop" className={`buttonis${this.state.dark}`} onClick={this.handlePause}>II</button>
                            <button id="reset" className={`buttonis${this.state.dark}`} onClick={this.handleReset}>RE</button>
                            <button id="dogsoup" className={`buttonis${this.state.dark}`} onClick={this.handleClick}>(=</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeroPage;