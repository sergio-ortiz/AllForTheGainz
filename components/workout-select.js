import React from "react";
import Link from "next/link";
import Workout from "./workout";

export default class WorkoutSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { workout: null };
  }

  handler = (e) => {
    this.setState({ workout: e.target.value });
  };

  render() {
    return (
      <>
        {!this.state.workout ? (
          <ul style={{ listStyle: "none", marginLeft: "-2rem" }}>
            <li>
              <button
                value="push"
                className="button block"
                onClick={(e) => this.handler(e)}
              >
                Push
              </button>
            </li>
            <li>
              <button
                value="pull"
                className="button block"
                onClick={(e) => this.handler(e)}
              >
                Pull
              </button>
            </li>
            <li>
              <button
                value="legs"
                className="button block"
                onClick={(e) => this.handler(e)}
              >
                Legs
              </button>
            </li>
          </ul>
        ) : (
          <Workout
            session={this.props.session}
            workout={this.state.workout}
            handler={this.handler}
          />
        )}
      </>
    );
  }
}
