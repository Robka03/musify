
//	TSL-Textures: Scream



import { Color } from "three";
import { add, cos, exp, mix, positionLocal, sin, tslFn } from 'three/examples/jsm/nodes/Nodes.js';
import { hsl, noise, toHsl } from './tsl-utils.js';



var scream = tslFn( ( params ) => {

	var pos = positionLocal.mul( exp( params.scale ) ).add( params.seed ).toVar( );

	var k = noise( add( sin( pos.xyz ), cos( pos.yzx ) ).mul( 2 ) );

	pos.assign( positionLocal.mul( exp( params.scale ).mul( k ) ).add( params.seed ) );

	var col = mix( params.background, params.color, k ).toVar();

	var HSL = toHsl( col ).toVar();

	return hsl( add( HSL.x, params.variety.mul( sin( k.mul( Math.PI ) ) ).mul( 0.5 ) ), HSL.y, HSL.z );

} );



scream.defaults = {
	$name: 'Scream',

	scale: 2,
	variety: 1,

	color: new Color( 0xF0F060 ),
	background: new Color( 0xD09090 ),

	seed: 0,
};



export { scream };
