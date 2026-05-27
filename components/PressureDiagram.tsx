type Layer={
depth:number;
};

type Props={

Pa:number;

Pp:number;

y:number;

H:number;

water:boolean;

beta:number;

layers?:Layer[];

};

export default function PressureDiagram({

Pa,

Pp,

y,

H,

water,

beta,

layers=[]

}:Props){

const colors=[

"#fef3c7",
"#fde68a",
"#fcd34d",
"#f59e0b"

];

const total=

layers.reduce(
(
s,
l
)=>

s+
l.depth,

0

)||H;

let current=
90;

const scale=

Math.min(
1,
220/
Math.max(
Pa,
Pp
)
);

const active=
Pa*
scale;

const passive=
Pp*
scale;

return(

<div
className="
bg-white
rounded-[32px]
shadow-lg
p-8
"
>

<div
className="
text-2xl
font-bold
mb-8
"
>

토압 분포 및 합력도

</div>

<svg

viewBox="0 0 1200 700"

className="w-full"

>

<rect

width="1200"

height="700"

fill="#fafafa"

/>

{

layers.length

?

layers.map(
(
layer,
i
)=>{

const h=

(
layer.depth
/
total
)

*
450;

const start=
current;

current+=
h;

return(

<g
key={i}
>

<rect

x="450"

y={start}

width="350"

height={h}

fill={
colors[
i%
colors.length
]
}

/>

<line

x1="450"

y1={start}

x2="800"

y2={start}

stroke="#ffffff"

strokeWidth="4"

/>

</g>

);

}

)

:

<rect

x="450"

y="90"

width="350"

height="450"

fill="#fde68a"

/>

}

<path

d="

M400 90

L450 90

L510 540

L350 540

Z

"

fill="#475569"

/>

<path

d="

M420 90

L450 90

L490 540

L380 540

Z

"

fill="#94a3b8"

opacity="0.5"

/>

<line

x1="450"

y1="90"

x2={
450+
beta*6
}

y2="40"

stroke="#22c55e"

strokeWidth="6"

/>

<text

x="560"

y="45"

fill="#16a34a"

fontSize="20"

>

배면경사

</text>

<polygon

points={`
450,90
${450+active},540
450,540
`}

fill="#ef4444"

opacity="0.45"

/>

<polygon

points={`
400,90
${400-passive},540
400,540
`}

fill="#10b981"

opacity="0.4"

/>

<line

x1={
450+
active
}

y1="300"

x2="900"

y2="300"

stroke="#dc2626"

strokeWidth="10"

/>

<polygon

points="
900,300
850,275
850,325
"

fill="#dc2626"

/>

<circle

cx={
450+
active
}

cy="300"

r="15"

fill="#dc2626"

/>

<text

x="760"

y="270"

fontSize="24"

fill="#dc2626"

>

Pa
{Pa.toFixed(1)}

kN/m

</text>

<line

x1={
400-
passive
}

y1="340"

x2="120"

y2="340"

stroke="#16a34a"

strokeWidth="10"

/>

<polygon

points="
120,340
170,315
170,365
"

fill="#16a34a"

/>

<circle

cx={
400-
passive
}

cy="340"

r="15"

fill="#16a34a"

/>

<text

x="40"

y="310"

fontSize="24"

fill="#16a34a"

>

Pp
{Pp.toFixed(1)}

kN/m

</text>

<line

x1="330"

y1={
100+
y*50
}

x2="520"

y2={
100+
y*50
}

stroke="#111827"

strokeDasharray="12"

strokeWidth="5"

/>

<circle

cx="425"

cy={
100+
y*50
}

r="14"

fill="#111827"

/>

<text

x="540"

y={
110+
y*50
}

fontSize="22"

>

합력 작용점

</text>

{

water&&

<>

<line

x1="120"

y1="260"

x2="1050"

y2="260"

stroke="#2563eb"

strokeWidth="6"

strokeDasharray="18"

/>

<text

x="130"

y="235"

fill="#2563eb"

fontSize="20"

>

지하수위

</text>

</>

}

<text

x="390"

y="620"

fontSize="22"

fill="#334155"

>

H =
{H}
m

</text>

</svg>

</div>

);

}