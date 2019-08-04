import React, { useState, useEffect } from "react";
import eventEmitter from "./lib/event-emitter";
import { ReactComponent as Fortuneteller } from "./images/fortuneteller.svg";
import { ReactComponent as Funghi } from "./images/funghi1.svg";
import { ReactComponent as Funghi2 } from "./images/funghi2.svg";
import { ReactComponent as Card } from "./images/card.svg";
import { ReactComponent as Watch } from "./images/watch.svg";
import { ReactComponent as Rabbit } from "./images/hasi-holesite.svg";

import { coordinator, endpoint } from "./coordinator";

const CarrotBin = props => {
  console.log(props.carrots);
  const carrots = props.carrots.map(carrot => {
    return (
      <li class="carrot" key={carrot.url} style={{ padding: "40px" }}>
        <a href="{carrot.url}" target="_blank">
          <img
            style={{ backgroundColor: "#fff", borderRadius: "50%" }}
            src={carrot.favicon}
          />
        </a>
      </li>
    );
  });
  return <ul>{carrots}</ul>;
};

export default class RabbitHolePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carrots: []
    };
  }

  componentDidMount() {
    const eventSource = new EventSource(`${endpoint}/events`);
    eventSource.onmessage = msg => {
      if ("ping" === msg.data) return false;

      const carrot = JSON.parse(msg.data);

      let carrots = this.state.carrots;
      carrots.push(carrot);
      this.setState({ carrots: carrots });
    };
  }

  render() {
    return (

        <div
          style={{
            backgroundColor: "#310f3f",
            height: "100%",
            minHeight: "1550px",
            color: "#FFF",
            padding: "20px"
          }}
        >
          <div
            style={{
              margin: "0 auto",
              marginTop:"40px"
            }}
          >
            <p style={{
              fontSize:"30px",
              fontWeight:"bold",
              textAlign:"center",
              letterSpacing:"2px",
              color:"#e5d3ed"
            }}>WELCOME TO THE RABBIT HOLE</p>
          </div>

          <a href="http://www.nyan.cat/" rel="noopener noreferrer" target="_blank">
            <div
              style={{
                width: "250px",
                position:"absolute",
                left:"50%",
                top:"200px",
                marginLeft:"-125px"
              }}
            >
              <Fortuneteller />
            </div>
          </a>

          <div
            style={{
              position: "absolute",
              width: "220px",
              right: "-70px"
            }}
          >
            <Funghi />
          </div>

          <div
            style={{
              position: "absolute",
              width: "250px",
              left: "-70px"
            }}
          >
            <Funghi2 />
          </div>

          <div
            style={{
              position: "absolute",
              width: "250px",
              right: "-70px",
              top: "600px"
            }}
          >
            <Card />
          </div>

          <div
            style={{
              position: "absolute",
              width: "450px",
              left: "270px",
              top: "800px"
            }}
          >
            <Watch />
          </div>

          <div
            style={{
              position: "absolute",
              width: "150px",
              left: "-30px",
              top: "1300px"
            }}
          >
            <Rabbit />
          </div>

        <CarrotBin carrots={this.state.carrots} />
      </div>
    );
  }
}
