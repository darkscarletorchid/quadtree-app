import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Quadtree from './models/Quadtree';
import Rectangle from './models/Rectangle';

let selected = null;

function App() {

  const [gameInit, setGameInit] = useState(false)
  const [maxLevel, setMaxLevel] = useState(5)
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [root, setRoot] = useState(null);
  const colorList = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }
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

  return (
    <div className="App">
      <div className="TopPanel">
        <Button 
          style={{marginBottom: '2em'}}
          variant="contained" 
          color="primary" 
          onClick={()=> {
           
            const root = new Quadtree(0, maxLevel, new Rectangle(0, 0, 400), colorList[getRandomInt(0, colorList.length)]);
            setRoot(root);
            const generateRandomTree = function(level, node) {
                    if (level > 0) {
                      const size = node.bounds.size / 2;
                      const x = node.bounds.x;
                      const y = node.bounds.y;
                      node.children[0] = new Quadtree(node.level + 1, node.maxLevels, new Rectangle(x + size, y, size       ), colorList[getRandomInt(0, colorList.length)]);
                      node.children[1] = new Quadtree(node.level + 1, node.maxLevels, new Rectangle(x, y, size              ), colorList[getRandomInt(0, colorList.length)]);
                      node.children[2] = new Quadtree(node.level + 1, node.maxLevels, new Rectangle(x, y + size, size       ), colorList[getRandomInt(0, colorList.length)]);
                      node.children[3] = new Quadtree(node.level + 1, node.maxLevels, new Rectangle(x + size, y + size, size), colorList[getRandomInt(0, colorList.length)]);
              
                      node.children.forEach( node => {
                        if (Math.random() >= 0.5) {
                          generateRandomTree(level - 1, node);
                        }
                      })
                    }
            }
                
            generateRandomTree(maxLevel, root);

            draw(root.getDrawingParams())
            setGameInit(true);
            }}>
            New Game
          </Button>
        <Typography id="select-max-level" gutterBottom>
          Max level
        </Typography>
        <Slider
          color="primary"
          defaultValue={5}
          aria-labelledby="select-max-level"
          step={1}
          marks
          min={1}
          max={9}
          valueLabelDisplay="auto"
          onChange={(e, val)=>{
            setMaxLevel(val);
          }}
        /></div>
      <div className="Content">
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
        { gameInit && (
            <div className="ControlsContainer">
              
       <Typography id="select-action-level" gutterBottom>
          Select level
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="select-action-level"
          step={1}
          marks
          min={0}
          max={maxLevel}
          valueLabelDisplay="on"
          onChange={(e, val)=>{
            setSelectedLevel(val);
          }}
        />

        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"  style={{marginBottom: '2em'}}>
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
        
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"  style={{marginBottom: '2em'}}>
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

        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group"  style={{marginBottom: '2em'}}>
          <Button onClick={()=>{
            if (selected == null) {
              return;
            }
            if (selected.smash()) {
              selected.children.forEach((child) => {
                child.color = colorList[getRandomInt(0, colorList.length)];
              })
            draw(root.getDrawingParams());
            }
            
          }}>
            Smash 
          </Button>
         
        </ButtonGroup>
            </div>
          )
        }
       </div>
    </div>
  );
}

export default App;
