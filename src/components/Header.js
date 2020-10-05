import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Specifications = (props) => {
	let feeding = props.feeding;
	let communicating = props.communicating;
	let energy = props.energy;

	useEffect(() => {
		props.tamagotchiDeath();
	}, [ props.feeding, props.communicating, props.energy ]);

	return(
		<div className="specifications">
			<ProgressBar  now={ feeding } 
										className="specifications__item feeding"
										variant="success"
										label={`Питание: ${ feeding }%`} />
			<ProgressBar  now={ communicating }
										className="specifications__item communicating"
										variant="info"
										label={`Общение: ${ communicating }%`} />
			<ProgressBar  now={ energy }
										className="specifications__item energy"
										variant="warning"
										label={`Энергия: ${ energy }%`} />
		</div>
	);
};

const Timer = ({ decreaseSpecifications }) => {

	const [timer, setTimer] = useState({
		seconds: 0,
		minutes: 0,
		hours: 0
	});

	useEffect(() => {
		let timerId = setTimeout(() => {
			let newSeconds = timer.seconds,
					newMinutes = timer.minutes,
					newHours = timer.hours;
	
			newSeconds++;
			if (newSeconds === 60) {
				newSeconds = 0;
				newMinutes++;
			}
			if (newMinutes === 60) {
				newMinutes = 0;
				newHours++;
			}
			if (newSeconds % 10 === 0) {
				decreaseSpecifications();
			}
			
			document.querySelector('.timer__body').innerHTML =
				(newHours < 10 ? '0' + newHours : newHours) + ":" +
				(newMinutes < 10 ? '0' + newMinutes : newMinutes) + ":" +
				(newSeconds < 10 ? '0' + newSeconds : newSeconds);
			
			setTimer({
				seconds: newSeconds,
				minutes: newMinutes,
				hours: newHours
			});
		}, 1000);

		return () => clearTimeout(timerId);

	}, [ timer.seconds, timer.minutes, timer.hours ]);

	return(
		<div className="timer d-flex align-items-center">
			<div className="timer__body h4 m-0 text-dark text-monospace">
				00:00:00
			</div>
			<button className="pause-btn btn btn-warning ml-4">
				Пауза
			</button>
		</div>
	);
};

const Header = ({ getSpecifications,
									decreaseSpecifications,
									tamagotchiDeath }) => {
	return(
		<header className=" header
												d-flex
												bg-primary
												justify-content-around
												align-items-center">
			<Specifications
				feeding = { getSpecifications().feeding }
				communicating = { getSpecifications().communicating }
				energy = { getSpecifications().energy }
				tamagotchiDeath = { tamagotchiDeath }
			/>
			<Timer
				decreaseSpecifications = { decreaseSpecifications }
			/>
		</header>
	);
};

export default Header;