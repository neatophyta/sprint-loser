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
      time: 5,
      color: BuGn,
      text: 'Get ready, 30 second sprint',
      audio: 'start'
    },
    {
      time: 2,
      color: RdPu,
      text: 'GO GO GO! 30 SECOND SPRINT!'
    },
    {
      time: 2,
      color: PuBuGn,
      text: 'Ok Rest, 2 minutes. Not so bad.',
      audio: 'finish'
    },
    {
      time: 2,
      color: BuGn,
      text: 'Get ready, 45 second sprint',
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
      text: 'Ok Rest, 2 minutes. Still ok.',
      audio: 'finish'
    },
    {
      time: 2,
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
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      timeData: {
        color: Spectral,
        text: '',
      },
      buttonText: 'Start'
    };

    Sound.setCategory('Playback');
    this.startSound = new Sound('start-beeps.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        alert('failed to load the sound', error);
        return;
      }
    });
    this.finishSound = new Sound('achievement.wav', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        alert('failed to load the sound', error);
        return;
      }
    });
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
          Sprint Loser
        </Text>
        <Text style={styles.instructions}>
          {this.state.timeData.text}
        </Text>
        <TouchableOpacity style={styles.buttonWrapper}
          onPress={this.start}
          >
           <Text style={styles.buttonText}>{this.state.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  start = () => {
    //clear timer if restarting
    if(typeof this.timer !== 'undefined') {
      window.clearTimeout(this.timer);
    }
    //copy time array, since we are shifting
    this.timeArr = [...fullTimeArr];

    this.setState({
        buttonText: 'Start Over'
      });

    //start timer
    this.setTimer();
  }

  setTimer = () => {
    //get first time
    let timeData = this.timeArr.shift();

    if(typeof timeData !== 'undefined') {
      this.setState({
        timeData: timeData
      });
      let time = timeData.time * 1000;

      if(timeData.hasOwnProperty('audio')) {
        if(timeData.audio === 'start') {
          this.startSound.play();
        } else if(timeData.audio === 'finish') {
          this.finishSound.play();
        }
      }

      this.timer = setTimeout(() => {
        this.setTimer();
      }, time);
    }
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
  },
  buttonWrapper: {
    backgroundColor: 'rgba(222, 222, 222, 0.4)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6B6B6B',
    overflow: 'hidden',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#3A3A3A'
  },
});
