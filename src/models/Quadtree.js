import Rectangle from './Rectangle';

class Quadtree {

    constructor(level, maxLevels = 0, bounds = null,  colorList = [], parent = null) {
        this.level = level;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; 
        }

        this.color = colorList[getRandomInt(0, colorList.length)];
        this.maxLevels = maxLevels;
        this.bounds = bounds;

        this.parent = parent;

        this.highlighted = false;

        this.children = [];

        this.colorList = colorList

    }

    split() {
        if (this.children.length !== 0 || this.level === this.maxLevels) return;
        const size = this.bounds.size / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        this.color = null;
       
        this.children[0] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x + size, y, size       ), this.colorList, this);
        this.children[1] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x, y, size              ), this.colorList, this);
        this.children[2] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x, y + size, size       ), this.colorList, this);
        this.children[3] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x + size, y + size, size), this.colorList, this);
    }

    smash() {
        if (this.level === 0 || this.level === this.maxLevels) return;
        const size = this.bounds.size / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        this.color = null;
       
        this.children[0] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x + size, y, size       ), this.colorList, this);
        this.children[1] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x, y, size              ), this.colorList, this);
        this.children[2] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x, y + size, size       ), this.colorList, this);
        this.children[3] = new Quadtree(this.level + 1, this.maxLevels, new Rectangle(x + size, y + size, size), this.colorList, this);

    }

    swap(direction) {
        
        var node = this;
            if (node.children.length === 0) return;

           
            //horizontally
            if (direction === 1) {
                this.swapNodes(node.children[0], node.children[3]);
                this.swapNodes(node.children[1], node.children[2]);

            } 
            //vertically
            else if (direction === 0) {

                this.swapNodes(node.children[1], node.children[0]);
                this.swapNodes(node.children[2], node.children[3]);
            }
    }
    swapNodes(child1, child2) {

        var tmp0 = child1;
        var tmp0pos = {x : child1.bounds.x, y: child1.bounds.y}
        var tmp3 = child2;
        var tmp3pos = {x : child2.bounds.x, y: child2.bounds.y}

        child1 = tmp3;
        child2 = tmp0;

        child1.updatePositions.call(child1, tmp0pos.x, tmp0pos.y);
        child2.updatePositions.call(child2, tmp3pos.x, tmp3pos.y);
    }

    rotate(direction) {
        var node = this;
        if (node.children.length === 0) return;
       
        //clockwise
        if (direction === 1) {
            this.swapNodes(node.children[0], node.children[3]);
            this.swapNodes(node.children[3], node.children[2]);
            this.swapNodes(node.children[2], node.children[1]);
         } 
         //counterclockwise
         else if (direction === 0) {
            this.swapNodes(node.children[0], node.children[1]);
            this.swapNodes(node.children[1], node.children[2]);
            this.swapNodes(node.children[2], node.children[3]);
         }
    }

    getDrawingParams() {
        
        var params = [];

        var getChildParams = function(node){
            if (node.children.length == 0) {
                params.push({bounds: node.bounds, fill: node.color, stroke: {color:"#000000", width: 1} });
            } else {
                node.children.forEach( (el) => {
                    getChildParams(el);

                });
                
            }
            if (node.highlighted) {
                params.push({bounds: node.bounds, stroke: {color:"#FFFFFF", width: 5} });

            }
        }

        getChildParams(this);
        return params;
    }

    updatePositions(x, y) {
        this.bounds.x = x;
        this.bounds.y = y;

        const updateChildPositions = (node, x, y) => {
                if (node.children.length != 0) {
                    let size = node.bounds.size / 2;
                    
                    node.children[0].bounds = new Rectangle( x + size, y, size);
                    updateChildPositions(node.children[0], node.children[0].bounds.x, node.children[0].bounds.y);
                    node.children[1].bounds = new Rectangle( x, y, size);
                    updateChildPositions(node.children[1], node.children[1].bounds.x, node.children[1].bounds.y);
                    node.children[2].bounds = new Rectangle( x , y + size, size);
                    updateChildPositions(node.children[2], node.children[2].bounds.x, node.children[2].bounds.y);
                    node.children[3].bounds = new Rectangle( x + size, y + size, size);
                    updateChildPositions(node.children[3], node.children[3].bounds.x, node.children[3].bounds.y);
                }
        }

        updateChildPositions(this, x, y)

    }

    getSelectedRectangle(x, y, level) {

        const getSelectedRectangle = (node) => {
            if (node.level == level || node.children.length == 0) {
                return node;
            }

            let selected = null;
            node.children.forEach((child) => {
                var xStart = child.bounds.x;
                var xEnd = child.bounds.x + child.bounds.size;
                var yStart = child.bounds.y;
                var yEnd = child.bounds.y + child.bounds.size;
                if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
                    selected = getSelectedRectangle(child);
                }
           });
           return selected;
        }
        
       return getSelectedRectangle(this);
    }
}

export default Quadtree;