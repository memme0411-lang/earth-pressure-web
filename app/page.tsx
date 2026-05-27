"use client";

import { useState } from "react";

import ResultCards from "../components/ResultCards";
import PressureDiagram from "../components/PressureDiagram";

import { calcRankine } from "../lib/rankine";
import { calcCoulomb } from "../lib/coulomb";
import { applyWater } from "../lib/groundwater";
import { calcMultiLayer } from "../lib/multilayer";

type Layer={
depth:string;
gamma:string;
phi:string;
};

export default function Home(){

const [tab,setTab]=useState("diagram");

const [theory,setTheory]=useState("Rankine");

const [height,setHeight]=useState("");

const [beta,setBeta]=useState("");

const [delta,setDelta]=useState("");

const [gamma,setGamma]=useState("");

const [phi,setPhi]=useState("");

const [water,setWater]=useState(false);

const [layers,setLayers]=
useState<Layer[]>([
{
depth:"",
gamma:"",
phi:""
}
]);

const [result,setResult]=
useState<any>(null);

function updateLayer(
i:number,
field:keyof Layer,
v:string
){

const next=[...layers];

next[i][field]=v;

setLayers(next);

}

function addLayer(){

setLayers([

...layers,

{
depth:"",
gamma:"",
phi:""
}

]);

}

function removeLayer(
i:number
){

if(
layers.length===1
)
return;

setLayers(

layers.filter(
(_,idx)=>
idx!==i
)

);

}

function calculate(){

const H=
Number(height);

const PHI=
Number(phi);

let GAMMA=
applyWater(
Number(gamma),
water
);

let active;

const valid=

layers.filter(

l=>

l.depth&&
l.gamma&&
l.phi

);

if(
valid.length>1
){

active=

calcMultiLayer(

valid.map(
l=>({

depth:
Number(
l.depth
),

gamma:
Number(
l.gamma
),

phi:
Number(
l.phi
)

})

)

);

const Ka=

active.Pa/

Math.max(
0.5*
GAMMA*
H*
H,
1
);

active={
...active,
Ka
};

}

else{

active=

theory==="Rankine"

?

calcRankine(
H,
PHI,
GAMMA
)

:

calcCoulomb(
H,
PHI,
GAMMA,
Number(beta),
Number(delta)
);

}

const Kp=
1/
Math.max(
active.Ka,
0.01
);

const Pp=

0.5*
Kp*
GAMMA*
H*
H;

setResult({

...active,

Kp,

Pp,

H,

beta:
Number(beta),

water,

theory,

gamma:
GAMMA,

phi:
PHI,

layers:
valid.map(
l=>({

depth:
Number(
l.depth
)

})
)

});

}

return(

<main className="min-h-screen bg-slate-100 p-8">

<div className="max-w-[1700px] mx-auto">

<h1 className="text-5xl font-bold mb-8">

Earth Pressure Calculator

</h1>

<div className="grid grid-cols-12 gap-6">

<div className="col-span-4">

<div className="bg-white rounded-3xl shadow p-8">

<div className="text-2xl mb-6">

입력조건

</div>

<div className="space-y-3">

<select
value={theory}
onChange={(e)=>
setTheory(
e.target.value
)}
className="border rounded-xl p-3 w-full"
>

<option>
Rankine
</option>

<option>
Coulomb
</option>

</select>

<input
placeholder="벽 높이 H"
value={height}
onChange={(e)=>
setHeight(
e.target.value
)}
className="border rounded-xl p-3 w-full"
/>

<input
placeholder="배면경사 β"
value={beta}
onChange={(e)=>
setBeta(
e.target.value
)}
className="border rounded-xl p-3 w-full"
/>

<input
placeholder="벽마찰각 δ"
value={delta}
onChange={(e)=>
setDelta(
e.target.value
)}
className="border rounded-xl p-3 w-full"
/>

<input
placeholder="단위중량 γ"
value={gamma}
onChange={(e)=>
setGamma(
e.target.value
)}
className="border rounded-xl p-3 w-full"
/>

<input
placeholder="내부마찰각 φ"
value={phi}
onChange={(e)=>
setPhi(
e.target.value
)}
className="border rounded-xl p-3 w-full"
/>

<div className="border rounded-2xl p-4">

<div className="font-semibold mb-4">

다층 입력

</div>

{

layers.map(
(
layer,
i
)=>

<div
key={i}
className="mb-4"
>

<div className="flex justify-between mb-2">

<div>

층
{i+1}

</div>

{

layers.length>1

&&

<button

onClick={()=>

removeLayer(
i
)

}

className="text-red-500"

>

삭제

</button>

}

</div>

<input
placeholder="깊이"

value={
layer.depth
}

onChange={(e)=>

updateLayer(
i,
"depth",
e.target.value
)

}

className="border rounded p-2 w-full mb-2"
/>

<input
placeholder="γ"

value={
layer.gamma
}

onChange={(e)=>

updateLayer(
i,
"gamma",
e.target.value
)

}

className="border rounded p-2 w-full mb-2"
/>

<input
placeholder="φ"

value={
layer.phi
}

onChange={(e)=>

updateLayer(
i,
"phi",
e.target.value
)

}

className="border rounded p-2 w-full"
/>

</div>

)

}

<button

onClick={
addLayer
}

className="
bg-slate-200
rounded-xl
w-full
p-3
"

>

+ 층 추가

</button>

</div>

<label className="flex gap-2">

<input
type="checkbox"

checked={water}

onChange={()=>
setWater(
!water
)
}
/>

지하수 고려

</label>

<button

onClick={
calculate
}

className="
bg-blue-600
text-white
rounded-xl
w-full
p-4
"

>

계산

</button>

</div>

</div>

</div>

<div className="col-span-8 space-y-6">

{

result&&

<>

<ResultCards
Ka={result.Ka}
Kp={result.Kp}
Pa={result.Pa}
Pp={result.Pp}
y={result.y}
/>

<div className="bg-white rounded-3xl p-8">

<div className="flex gap-6 mb-8">

<button onClick={()=>setTab("diagram")}>
도면
</button>

<button onClick={()=>setTab("calc")}>
계산과정
</button>

<button onClick={()=>setTab("table")}>
결과표
</button>

</div>

{

tab==="diagram"

&&

<PressureDiagram

Pa={result.Pa}
Pp={result.Pp}
y={result.y}
H={result.H}
water={result.water}
beta={result.beta}
layers={result.layers}

/>

}

{
tab==="calc"

&&

<div className="space-y-6">

<div className="bg-white rounded-3xl border p-8">

<div className="text-3xl font-bold mb-6">

계산과정

</div>

<div className="grid grid-cols-2 gap-4">

<div>
토압이론 :
{result.theory}
</div>

<div>
벽 높이 :
{result.H}
m
</div>

<div>
단위중량 :
{result.gamma}
kN/m³
</div>

<div>
내부마찰각 :
{result.phi}
°
</div>

</div>

</div>

<div className="bg-blue-50 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

① 토압계수 계산

</div>

{

result.theory==="Rankine"

?

<>

<div>

Ka = tan²(45−φ/2)

</div>

<div className="mt-4">

Ka

=

tan²(

45−

{result.phi}

/2

)

</div>

</>

:

<>

<div>

Coulomb 적용

</div>

<div>

배면경사 + 벽마찰 고려

</div>

</>

}

<div className="mt-4">

Ka

=

{result.Ka.toFixed(4)}

</div>

<div>

Kp

=

{result.Kp.toFixed(4)}

</div>

</div>

<div className="bg-yellow-50 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

② 수직응력 계산

</div>

<div>

σv = γH

</div>

<div className="mt-3">

σv

=

{result.gamma}

×

{result.H}

</div>

<div className="font-bold mt-4">

σv

=

(
result.gamma*
result.H
).toFixed(2)

kPa

</div>

</div>

<div className="bg-red-50 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

③ 수평응력 계산

</div>

<div>

σh = Kaσv

</div>

<div className="mt-3">

σh

=

{result.Ka.toFixed(3)}

×

{(
result.gamma*
result.H
).toFixed(2)
}

</div>

<div className="font-bold mt-4">

σh

=

(
result.Ka*
result.gamma*
result.H
).toFixed(2)

kPa

</div>

</div>

<div className="bg-red-100 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

④ 주동합력 적분

</div>

<div>

Pa = ∫σh dz

</div>

<div className="mt-3">

Pa

=

½KaγH²

</div>

<div className="font-bold mt-4">

Pa

=

{result.Pa.toFixed(2)}

kN/m

</div>

</div>

<div className="bg-green-100 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

⑤ 수동합력 계산

</div>

<div>

Pp = ½KpγH²

</div>

<div className="mt-4">

Pp

=

{result.Pp.toFixed(2)}

kN/m

</div>

</div>

{

result.layers?.length>1

&&

<div className="bg-orange-50 rounded-3xl p-8">

<div className="text-2xl font-bold mb-6">

⑥ 다층 적분 계산

</div>

{

result.layers.map(
(
layer:any,
i:number
)=>

<div
key={i}
className="mb-4"
>

층
{i+1}

↓

h=
{layer.depth}

m

</div>

)

}

<div className="font-bold">

누적 유효응력 적용

</div>

</div>

}

<div className="bg-slate-100 rounded-3xl p-8">

<div className="text-2xl font-bold mb-4">

⑦ 합력 작용점

</div>

<div>

ȳ = M / Pa

</div>

<div className="mt-4">

y

=

{result.y.toFixed(2)}

m

</div>

</div>

</div>

}

{

tab==="table"

&&

<div className="grid grid-cols-2 gap-4">

<Box k="토압이론" v={result.theory}/>

<Box k="Ka" v={result.Ka.toFixed(3)}/>

<Box k="Kp" v={result.Kp.toFixed(3)}/>

<Box k="Pa" v={result.Pa.toFixed(2)}/>

<Box k="Pp" v={result.Pp.toFixed(2)}/>

<Box k="작용점" v={result.y.toFixed(2)}/>

</div>

}

</div>

</>

}

</div>

</div>

</div>

</main>

);

}

function Box({
k,
v
}:any){

return(

<div className="bg-slate-50 rounded-xl p-4">

<div>
{k}
</div>

<div className="text-2xl font-bold">

{v}

</div>

</div>

);

}