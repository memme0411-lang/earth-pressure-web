type Layer = {

depth:number;

gamma:number;

phi:number;

};

export function calcMultiLayer(
layers:Layer[],
waterDepth:number=0
){

let sigmaV=0;

let Pa=0;

let moment=0;

let currentDepth=0;

const details=[];

for(
let i=0;

i<
layers.length;

i++
){

const h=
layers[i].depth;

let gamma=
layers[i].gamma;

const phi=
layers[i].phi;

if(
currentDepth
>=
waterDepth
&&
waterDepth>0
){

gamma=
Math.max(
gamma-
9.81,
1
);

}

sigmaV+=
gamma*
h;

const Ka=

Math.pow(

Math.tan(

(
45-
phi/2
)

*

Math.PI

/

180

),

2

);

const sigmaH=

Ka*
sigmaV;

const force=

sigmaH*
h;

const centroid=

currentDepth+
h/2;

Pa+=
force;

moment+=
force*
centroid;

details.push({

layer:
i+1,

Ka,

sigmaV,

sigmaH,

force,

centroid

});

currentDepth+=
h;

}

const y=

Pa
?

moment/
Pa

:

0;

return{

Pa,

y,

detail:
details

};

}