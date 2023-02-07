import React from "react";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {/1/.test(this.props.k) ? (
          <p>
            {this.props.k
              .replace(/1/, "")
              .split("_")
              .map((e) => e[0].toUpperCase() + e.substring(1))
              .join(" ")}
          </p>
        ) : null}
        <label htmlFor={this.props.k}>set {this.props.k.match(/\d/)}</label>
        <input
          id={this.props.k}
          type="number"
          value={this.props.v || ""}
          onChange={(e) => this.props.handler(e, this.props.k)}
        />
      </>
    );
  }
}

export default Exercise;
