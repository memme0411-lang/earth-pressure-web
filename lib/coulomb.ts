export function calcCoulomb(
H:number,
phi:number,
gamma:number,
beta:number,
delta:number
){

const r=
Math.PI/180;

const PHI=
phi*r;

const BETA=
beta*r;

const DELTA=
delta*r;

const numerator=

Math.cos(
PHI-BETA
)**2;

const denominator=

Math.cos(BETA)**2

*

Math.cos(
DELTA+BETA
)

*

(

1+

Math.sqrt(

(
Math.sin(
PHI+DELTA
)

*

Math.sin(
PHI-BETA
)

)

/

(

Math.cos(
DELTA+BETA
)

*

Math.cos(
BETA
)

)

)

)**2;

const Ka=

numerator/
denominator;

const Pa=

0.5*
Ka*
gamma*
H*
H;

return{

Ka,

Pa,

y:
H/3

};

}