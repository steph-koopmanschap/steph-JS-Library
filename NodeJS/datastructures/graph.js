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
            const edgeWeight = null;
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



module.exports = {Edge, Graph, Vertex};
