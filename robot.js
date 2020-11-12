const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];
//convert road to graph
function buildGraph(edges)
{
   let graph = {};
    for(var[from , to] of edges.map((r)=> r.split("-")))
    {
        addEdge(from[0] , to[0]);
        addEdge(to[0] , from[0]);
    }
    function addEdge(from , to)
    {
        if(graph[from] == undefined)
        {
            graph[from] = [to];

        }
        else
        {
            graph[from].push(to);
        }
    }
    return graph;
}
const roadGraph = buildGraph(roads);
//var test = buildGraph(roads);
//console.log(roadGraph['P']);
class VillageState
{
    constructor(place , parcels)
    {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination)
    {
        if(!roadGraph[this.place].includes(destination))
        {
            return 'this destination is undefined';
        } 
        else
        {
            var testcolation = this.parcels.map( (p) => {
                return p.place;
            })
            if(testcolation != this.place)
            {
                return 'your location is incorrect';
            }
            else
            {
                var newparcel = this.parcels.map( (p) => 
                {
                    return {place : destination , address : p.address};
                }).filter((p) => p.place != p.address);
                return new VillageState(destination , newparcel);
            }
        }
    }
}
//var test = new VillageState( 'P', [{place:'P' ,  address : 'A'}]);
//console.log(test.parcels.length);
//console.log(test.move('A').parcels);

function randomRobot(state)
{
    return {direction : randomPick(roadGraph[state.place])};
}
function randomPick(array)
{
    let choice = Math.floor(Math.random() * this.length);
    return this[choice];
}
function runRobot(state , robot , memory)
{
    for(var turn = 0 ; ; turn++)
    {
        // if(state.parcels.length == 0 )
        // {
        //     console.log(`done in ${turn} turns`);
        //     break;
        // }
        var action = robot (state , memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`move to ${action.direction}`);
    }
}
VillageState.random = function(parcelsCount = 5)
{
    var randomParcels = [];
    for(var i  = 0 ; i < parcelsCount ; i++)
    {
        var address = randomPick(Object.keys(roadGraph));
        var place;
        do
        {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        randomParcels.push({place : place , address : address});
    }
    return new VillageState('P' , randomParcels);
};
runRobot(VillageState.random , randomRobot);
