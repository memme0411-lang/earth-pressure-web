export function calcRankine(
H:number,
phi:number,
gamma:number,
beta:number=0
) {

  const r=Math.PI/180;

const BETA=
beta*r;

const PHI=
phi*r;

const Ka=

beta===0

?

Math.pow(
Math.tan(
(45-phi/2)
*
r
),
2
)

:

Math.cos(BETA)

*

(
Math.cos(BETA)

-

Math.sqrt(

Math.cos(BETA)**2

-

Math.cos(PHI)**2

)

)

/

(
Math.cos(BETA)

+

Math.sqrt(

Math.cos(BETA)**2

-

Math.cos(PHI)**2

)

);

  const Pa =
    0.5 *
    Ka *
    gamma *
    H *
    H;

  return {

    Ka,

    Pa,

    y:
      H / 3

  };

}