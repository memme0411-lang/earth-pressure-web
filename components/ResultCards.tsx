type Props={

Ka:number;

Kp:number;

Pa:number;

Pp:number;

y:number;

};

function Card({

title,
value,
sub,
color

}:any){

return(

<div
className={`
rounded-2xl
border
p-5
bg-white
shadow-sm
${color}
`}
>

<div
className="
text-sm
font-medium
text-gray-600
mb-3
"
>

{title}

</div>

<div
className="
text-4xl
font-bold
"
>

{value}

</div>

{

sub&&

<div
className="
text-sm
text-gray-500
mt-2
"
>

{sub}

</div>

}

</div>

);

}

export default function ResultCards({

Ka,

Kp,

Pa,

Pp,

y

}:Props){

return(

<div
className="
grid
grid-cols-2
gap-4
"
>

<Card

title="주동토압계수 (Ka)"

value={
Ka.toFixed(3)
}

color="
border-blue-400
"

/>

<Card

title="수동토압계수 (Kp)"

value={
Kp.toFixed(3)
}

color="
border-green-400
"

/>

<Card

title="주동합력 (Pa)"

value={
`${Pa.toFixed(2)}
kN/m`
}

sub={`작용점:
${y.toFixed(2)}
m`}

color="
border-blue-500
"

/>

<Card

title="수동합력 (Pp)"

value={
`${Pp.toFixed(2)}
kN/m`
}

sub={`작용점:
${y.toFixed(2)}
m`}

color="
border-purple-400
"

/>

</div>

);

}