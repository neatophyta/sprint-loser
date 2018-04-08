/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';

var Sound = require('react-native-sound');

const Spectral = require('./assets/images/Spectral.png');
const grays = require('./assets/images/grays.png');
const BuGn = require('./assets/images/BuGn.png');
const PuBu = require('./assets/images/PuBu.png');
const PuBuGn = require('./assets/images/PuBuGn.png');
const PuRd = require('./assets/images/PuRd.png');
const RdPu = require('./assets/images/RdPu.png');

const fullTimeArr = [
    {
      time: 5,
      color: PuBu,
      text: 'Warmup! Treadmill set to 3mph, incline set to 1.'
    },
    {
      time: 4,
      color: BuGn,
      text: 'Get ready, 30 second sprint',
      audio: 'start'
    },
    {
      time: 6,
      color: RdPu,
      text: 'GO GO GO! 30 SECOND SPRINT!'
    },
    {
      time: 6,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Not so bad.',
      audio: 'finish'
    },
    {
      time: 4,
      color: BuGn,
      text: 'Get ready, 45 second sprint',
      audio: 'start'
    },
    {
      time: 6,
      color: RdPu,
      text: 'GO GO GO! 45 SECOND SPRINT!'
    },
    {
      time: 6,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Still ok.',
      audio: 'finish'
    },
    {
      time: 4,
      color: BuGn,
      text: 'Get ready, 1 minute sprint',
      audio: 'start'
    },
    {
      time: 2,
      color: PuRd,
      text: 'GO GO GO! 1 MINUTE SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes.',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 1.5 minute sprint',
      audio: 'start'
    },
    {
      time: 2,
      color: RdPu,
      text: 'GO GO GO! 1.5 MINUTE SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Not dead yet.',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 2 minute sprint incoming. ohgodwhy',
      audio: 'start'
    },
    {
      time: 2,
      color: PuRd,
      text: 'GO GO GO! 2 MINUTE SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 4 minutes. Don\'t barf!',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Hope you\'re still alive, 1.5 minute sprint incoming',
      audio: 'start'
    },
    {
      time: 2,
      color: RdPu,
      text: 'GO GO GO! 1.5 MINUTE SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Did you die though?',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 1 minute sprint incoming',
      audio: 'start'
    },
    {
      time: 2,
      color: PuRd,
      text: 'GO GO GO! 1 MINUTE SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Downhill.',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 45 second sprint incoming',
      audio: 'start'
    },
    {
      time: 2,
      color: RdPu,
      text: 'GO GO GO! 45 SECOND SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Easy peasy.',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 30 second sprint incoming',
      audio: 'start'
    },
    {
      time: 2,
      color: PuRd,
      text: 'GO GO GO! 30 SECOND SPRINT!'
    },
    {
      time: 2,
      color: Spectral,
      text: 'You lived! Cool down, chill out.',
      audio: 'finish'
    }
  ];

type Props = {};

//Disable warning coming from timer app for now
console.disableYellowBox = true;

export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      timeData: {
        color: Spectral,
        text: '',
      },
      buttonText: 'Start',
      started: false
    };

    //Use Ambient option, this will not pause background app music
    //This sets AVAudioSessionCategoryAmbient, plus mixWithOthers option in the current AVAudioSession
    Sound.setCategory('Ambient', true);

    this.startSound = new Sound('start-beeps.wav', Sound.MAIN_BUNDLE);

    this.finishSound = new Sound('achievement.wav', Sound.MAIN_BUNDLE);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={this.state.timeData.color}
        />
        <Text style={styles.header}>
          Sprint Loser!
        </Text>
        <Text style={styles.instructions}>
          {this.state.timeData.text}
        </Text>
        {
          this.state.timeData.hasOwnProperty('time') &&
          <TimerCountdown
            initialSecondsRemaining={this.state.timeData.time * 1000}
            allowFontScaling={true}
            style={styles.timer}
          />
        }
        {
          this.state.timeData.started &&
          <TouchableOpacity style={styles.buttonWrapper}
            onPress={this.reset}
            >
             <Text style={styles.buttonText}>{this.state.buttonText}</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity style={styles.buttonWrapper}
          onPress={this.start}
          >
           <Text style={styles.buttonText}>{this.state.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  start = () => {
    //clear timer
    if(typeof this.timer !== 'undefined') {
      window.clearTimeout(this.timer);
    }

    //Stop any playing audio
    this.startSound.stop();
    this.finishSound.stop();

    if(this.state.started === true) {
      //If already started, clear timedata, reset to initial state
      this.setState({
        timeData: {
          color: Spectral,
          text: '',
        },
        buttonText: 'Start',
        started: false
      });
    } else {
      //If not already started then start the timer

      //copy time array, since we are modifying it by shifting
      this.timeArr = [...fullTimeArr];

      this.setState({
          buttonText: 'Start Over',
          started: true
        });

      //start timer
      this.setTimer();
    }
  };

  setTimer = () => {
    //Get next time obj from time array
    let timeData = this.timeArr.shift();

    if(typeof timeData !== 'undefined') {
      //Set new time data to state
      this.setState({
        timeData: timeData
      });

      //Change to milliseconds
      let time = timeData.time * 1000;

      //Play audio clip if needed
      if(timeData.hasOwnProperty('audio')) {
        if(timeData.audio === 'start') {
          this.startSound.play(() => {
              this.startSound.stop();
          });
        } else if(timeData.audio === 'finish') {
          this.finishSound.play(() => {
            this.finishSound.stop();
          });
        }
      }

      //Start timeout
      this.timer = setTimeout(() => {
        //Move to next time section
        this.setTimer();
      }, time);
    }
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 60,
    textAlign: 'center',
    margin: 50,
    fontFamily: 'FasterOne-Regular',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 30,
    fontSize: 40,
    height: 250
  },
  buttonWrapper: {
    backgroundColor: 'rgba(222, 222, 222, 0.4)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6B6B6B',
    overflow: 'hidden',
    padding: 10,
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 20,
    color: '#3A3A3A'
  },
  timer: {
    fontSize: 30,
    height:50
  }
});
