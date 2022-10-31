const queue = require('./queue.js');

//Link between 2 vertices
class Edge {
    constructor(start, end, weight = null) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }

    //Add a link between 2 nodes (vertices)
    addEdge(vertexB, weight) {
        if (!(vertexB instanceof Vertex))
        {
            throw new Error("vertex is not an instance of Vertex. Reference: " + vertexB);
        }
        this.edges.push(new Edge(this, vertexB, weight));
    }

    //Remove the link between 2 nodes (vertices)
    removeEdge(vertexB) {
        this.edges = this.edges.filter((edge) => 
            edge.end !== vertexB
        );
    }

    print() {
        const edgeList = this.edges.map(edge =>
            edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data) || [];

        const output = `${this.data} --> ${edgeList.join(', ')}`;
        console.log(output);
    }
}

class Graph {
    constructor(isWeighted = false, isDirected = false) {
        this.vertices = [];
        this.isWeighted = isWeighted;
        this.isDirected = isDirected;
    }

    addVertex(data) {
        const newVertex = new Vertex(data);
        this.vertices.push(newVertex);
        return newVertex;
    }

    removeVertex(vertexToBeRemoved) {
        this.vertices = this.vertices.filter((vertex) =>
            vertex !== vertexToBeRemoved
        );
    }

    //Create a link between 2 vertices 
    addEdge(vertexOne, vertexTwo, weight) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) 
        {
            let edgeWeight = null;
            //Add weight to the link if the graph is weighted
            if(this.isWeighted === true) 
            {
                edgeWeight = weight;
            }
            //Create link from vertex One to Vertex Two
            vertexOne.addEdge(vertexTwo, edgeWeight);
            //2 links are created in an un-directed graph
            if (this.isDirected === false) 
            {
                //Create link from Vertex Two to Vertex One
                vertexTwo.addEdge(vertexOne, edgeWeight);
            }
        } 
        else 
        {
            throw new Error(`Function paremeters are not instances of Vertex. Reference: ${vertexOne}, ${vertexTwo}`);
        }
    }

    //Remove a link between 2 vertices
    removeEdge(vertexOne, vertexTwo) {
        if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) 
        {
            vertexOne.removeEdge(vertexTwo);
            //Undirected graphs always have 2 links between vertices
            if (this.isDirected === false) 
            {
                vertexTwo.removeEdge(vertexOne);
            }
        } 
        else 
        {
            throw new Error('Expected Vertex arguments.');
        }
    }

    print() {
        const vertexList = this.vertices || [];
        vertexList.forEach(vertex => vertex.print());
    }
}

//pre-order depth first traversel with recursion
//Parameters
//start = Vertex
//callback(vertex) = function
function depthFirstTraversal(start, callback, visitedVertices = [start]) {
    //Log the current vertex data
    console.log(start.data);
    callback(start);

    start.edges.forEach( (edge) => {
        //Check if there are vertices attached to this vertex
        const neighbor = edge.end;
        //Check if we have not yet visited the neighbor vertex
        if (!visitedVertices.includes(neighbor)) 
        {
            //Add the neighbour to visited vertices
            visitedVertices.push(neighbor);
            //Continue to the next neighbour.
            depthFirstTraversal(neighbor, callback, visitedVertices);
        }
    });
}

//Parameters
//start = Vertex
function breadthFirstTraversal(start) {
    //Visited vertices keeps track of which vertices have already been visited during the search
    //Visited vertices prevents vertices from being added to the visitQueue
    const visitedVertices = [start];
    // The queue holds all of the vertices that have not yet been iterated through.
    // visitQueue maintains the order of vetices to visit next
    const visitQueue = new Queue();
    visitQueue.enqueue(start);
    while (!visitQueue.isEmpty()) 
    {
        //Current is the current vertex being looked at
        const current = visitQueue.dequeue();
        console.log(current.data);
        //Iterate through all the neighbours of the current vertex
        current.edges.forEach((edge) => {
            //Check if there are vertices attached to this vertex
            const neighbor = edge.end;
            //Check if we have not yet visited the neighbor vertex
            if (!visitedVertices.includes(neighbor)) 
            {
                //Add the neighbour to visited vertices
                visitedVertices.push(neighbor);
                visitQueue.enqueue(neighbor);
            }
        });
    }
}

module.exports = {Edge, Graph, Vertex};
