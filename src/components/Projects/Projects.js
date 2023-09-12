import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import carleton from "../../Assets/Projects/carleton.png";
import mlbwizard from "../../Assets/Projects/mlbwizard.png";
import wifiheat from "../../Assets/Projects/wifiheat.jpg";
import alphasecurity from "../../Assets/Projects/alphasecurity.jpg";
import sudoku from "../../Assets/Projects/sudoku.png";
import spp from "../../Assets/Projects/spp.jpg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mlbwizard}
              isBlog={false}
              title="MLB Wizard"
              description="Django Application displaying live MLB statistics for teams, rosters, players and news articles using MLB API"
              ghLink="https://github.com/jamesruntas/BlueJaysChallenge"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={alphasecurity}
              isBlog={false}
              title="Alpha Security Squared"
              description="Fully modular Cloud-based Home Security system utilizing Raspberry Pi. User can register/login to the mobile app. And monitor the status of motion sensors, tripwires, cameras, and sound detection. "
              ghLink="https://github.com/bradenhayes/Alpha_Security"
              demoLink="https://docs.google.com/document/d/1jq68JXwyx_laQ1z1VP5tOaR38cIFh3tzH76Wqj5AdRc/edit?usp=sharing"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={spp}
              isBlog={false}
              title="Space Palette Pro: Haptic Electronic Instrument"
              description="Project won 2nd Place prize for the 2021/2022 Undergraduate Computer Engineering Project Competition: Audio-Visual-Haptic electronic instrument where user(s) produce musical sounds and live visual and haptic feedback
              by interacting with four pressure pads and a touch screen. Project tied for 2nd Place in 2022 SYSC Capstone Project Competition.
              Permanent display in Carleton University, with a federal grant from the Canada Foundation for Innovation. Planned installation and demo
              at Canadian Museum of Nature, use for live concerts/shows for Carleton Music Department."
              ghLink="https://github.com/vizicist/palette"
              demoLink="https://www.youtube.com/embed/jvf_uyb9I8g"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={wifiheat}
              isBlog={false}
              title="Wi-Fi Router Placement Optimization"
              description="Using linear programming, mathematical matrices, and electromagentic waveform equations, a team of other students and myself uncovered the direct correlation with Wi-fi Signal strength with the layout of any given floorplan. Our program is able to give the optimal location of a router inside a home or office with the ability to adjust building materials such as walls and other obstacles."
              
              demoLink="https://docs.google.com/document/d/1pcHk6W4b-_bWIkrXtuanDfWLHRIgock57hhnWqSjabE/edit?usp=sharing"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={carleton}
              isBlog={false}
              title="IBM & Carleton University One Health 2022 Greenspace Initiative"
              description="A proposition for making a new green hospital on the Experimental Farm in Ottawa, Ontario.  Created a video, report, and wesbite for Environmental Engineering Workshop hosted by Carleton University and IBM."
              
              demoLink="https://drive.google.com/file/d/17G86fRuYozoJYOaH3h9fh5jZZgDpGUhh/preview"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sudoku}
              isBlog={false}
              title="Sudoku Solver"
              description="Solves any sudoku puzzle that the user inputs into the application."
              ghLink="https://github.com/jamesruntas/SudokuSolver"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
