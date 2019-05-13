import React from 'react';
import { Button } from './Buttons';
import { connect } from 'react-redux';
import AllPoses from './AllPoses';
import CountdownTimer from './CountdownTimer';
import Camera from './Camera';
import GameFunctions from './GameFunctions';
import ResultPage from './ResultPage';

class GameLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGame: false,
      loadCamera: false,
    };
    this.displayCamera = this.displayCamera.bind(this);
    this.disableCountdown = this.disableCountdown.bind(this);
  }

  componentDidMount() {
    setTimeout(this.displayCamera, 8000);
  }

  displayCamera() {
    this.setState({ loadCamera: true });
    setTimeout(this.disableCountdown, 3000);
  }

  disableCountdown() {
    //remove the countdown from view and begin running the game in gameFunctions component
    this.setState({ startGame: true });
  }

  render() {
    return (
      <div>
        {this.props.gameOver ? (
          <ResultPage />
        ) : (
          /* only when the countdown is done and the camera has loaded, do we want the game functions to begin running */
          <div>
            <div className="countdownDiv">
              {this.state.startGame ? <GameFunctions /> : <CountdownTimer />}
            </div>

            <div>{this.state.loadCamera ? <Camera /> : <div />}</div>

            <div className="allPosesDiv">
              <AllPoses />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  gameOver: state.gameOver,
});

export default connect(mapState)(GameLandingPage);
