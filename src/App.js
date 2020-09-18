import './App.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Quadtree from './models/Quadtree';
import Rectangle from './models/Rectangle';
import PropTypes from 'prop-types'


const draw = (drawingParams) => {
  const canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawingParams.forEach((el) => {
    let bounds = el.bounds;
    ctx.beginPath();

    ctx.rect(bounds.x, bounds.y, bounds.size, bounds.size);
    if (el.fill) {
      ctx.fillStyle = el.fill;
      ctx.fill();
    }
    if (el.stroke) {
      ctx.strokeStyle = el.stroke.color;
      ctx.lineWidth = el.stroke.width;
      ctx.stroke();
    }
    ctx.closePath();
  });
}

let root = null;
let selected = null;
let maxLevel = 5;
let selectedLevel = 0;

function App({gameGenerated}) {

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={()=> {
            root = new Quadtree(0, maxLevel, new Rectangle(0, 0, 400), ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]);

            const generateRandomTree = function(level, node) {
                    if (level > 0) {
                      node.split();
                      node.children.forEach( node => {
                        if (Math.random() >= 0.5) {
                          generateRandomTree(level - 1, node);
                        }
                      })
                    }
            }
                
            generateRandomTree(maxLevel, root);

            draw(root.getDrawingParams())
            gameGenerated = true;
            }}>
            
            New Game
          </Button>
        <Typography id="select-max-level" gutterBottom>
          Max level
        </Typography>
        <Slider
          defaultValue={5}
          aria-labelledby="select-max-level"
          step={1}
          marks
          min={1}
          max={9}
          valueLabelDisplay="on"
          onChange={(e, val)=>{
            maxLevel = val;
          }}
        />

        <div id="scene"> 
            <canvas 
            id="canvas" 
            width="400" 
            height="400"
            style={{backgroundColor: "whitesmoke"}}
            onClick={(e) => {
                if (!root) {
                  return
                }
                let rect = e.currentTarget.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                if (selected) {
                  selected.highlighted = false;
                }
                selected = root.getSelectedRectangle(x, y, selectedLevel);
                selected.highlighted = true;
                draw(root.getDrawingParams());
            }}></canvas>
          </div>
       <Typography id="select-action-level" gutterBottom>
          Select level
        </Typography>
        <Slider
          defaultValue={5}
          aria-labelledby="select-action-level"
          step={1}
          marks
          min={0}
          max={maxLevel}
          valueLabelDisplay="on"
          onChange={(e, val)=>{
            selectedLevel = val;
          }}
        />

        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button 
          onClick={()=>{
            if (selected == null) {
              return;
            }
            selected.rotate(1);
            draw(root.getDrawingParams());
          }}>
            Rotate clockwise
          </Button>
          <Button
          onClick={()=>{
            if (selected == null) {
              return;
            }
            selected.rotate(0);
            draw(root.getDrawingParams());
          }}>
            Rotate counterclockwise
          </Button>
        </ButtonGroup>
        
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={()=>{
            if (selected == null) {
              return;
            }
            selected.swap(1);
            draw(root.getDrawingParams());
          }}>
            Swap horizontally
          </Button>
          <Button  onClick={()=>{
            if (selected == null) {
              return;
            }
            selected.swap(0);
            draw(root.getDrawingParams());
          }}>
            Swap vertically
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button onClick={()=>{
            if (selected == null) {
              return;
            }
            selected.smash();
            draw(root.getDrawingParams());
          }}>
            Smash 
          </Button>
         
        </ButtonGroup>
        </Container>
    </div>
  );
}

App.propTypes = {
  gameGenerated: PropTypes.bool
}
export default App;
