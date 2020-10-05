import React from 'react';
import Tamagotchi from './Tamagotchi';

const Main = () => {

	const FeedBtn = () => {
		return(
			<button className="feed-btn btn btn-danger btn-lg">
				Покормить
			</button>
		);
	};
	
	return(
		<main className=" main
											d-flex
											flex-grow-1
											justify-content-center
											align-items-center ">
			<FeedBtn />
			<Tamagotchi />
		</main>
	);
};

export default Main;