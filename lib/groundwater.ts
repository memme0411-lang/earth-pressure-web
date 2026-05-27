export function applyWater(
gamma:number,
water:boolean
){

if(
water
){

return gamma-9.81;

}

return gamma;

}