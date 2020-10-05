import React, { useEffect } from 'react';
import Snap from 'snapsvg-cjs-ts';

const Tamagotchi = () => {

	useEffect(() => {
		svg();
	}, []);

	const svg = () => {
		let s = Snap('.tamagotchi-body');
		console.log('s: ', s);
		Snap.load('img/cat.svg', ( loadedFragment ) => {
																s.append( loadedFragment );
															});
		let mouth = s.node.children;
		console.log('mouth: ', mouth);
	};

	return(
		<div className="tamagotchi-body">
		</div>
	);
};

export default Tamagotchi;