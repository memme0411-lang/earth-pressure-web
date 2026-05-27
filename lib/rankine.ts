export function calcRankine(
  H: number,
  phi: number,
  gamma: number
) {

  const Ka =
    Math.pow(
      Math.tan(
        (
          45 -
          phi / 2
        )
        *
        Math.PI
        /
        180
      ),
      2
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