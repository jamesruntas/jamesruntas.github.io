import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I am <span className="purple">James Runtas </span>
            from <span className="purple"> Ottawa, Ontario.</span>
            <br />Early professional with 2 years of Software development and Cyber Security experience. September 2023 Carleton University Undergraduate degree in <span className="purple">Systems & Computer Engineering</span>
            <br />
            <br />
            Apart from building and coding, I love to
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Read
            </li>
            <li className="about-activity">
              <ImPointRight /> Cook
            </li>
            <li className="about-activity">
              <ImPointRight /> Play guitar and drums
            </li>
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
