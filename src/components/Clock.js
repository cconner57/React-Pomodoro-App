import React, { useState, useEffect, useCallback, useRef } from 'react';
import soundfile from '../audio/Alert.mp3';

const Clock = ({ userSettings, setUserSettings }) => {
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');
	const [circle, setCircle] = useState(0);

	const { active, paused, finished, font, color } = userSettings;

	const timer = useCallback(
		(event) => {
			if (event === 'start') {
				setSeconds('00');
				setUserSettings({
					...userSettings,
					active: true,
					finished: false,
					paused: false,
				});
				setMinutes(userSettings[userSettings.mode]);
			} else if (event === 'pause') {
				setUserSettings({ ...userSettings, active: false, paused: true });
			} else if (event === 'resume') {
				setUserSettings({ ...userSettings, active: true, paused: false });
			} else if (event === 'stop') {
				setUserSettings({
					...userSettings,
					active: false,
					finished: true,
					paused: false,
				});
			}
		},
		[userSettings, setUserSettings]
	);

	const timerAlert = useRef();
	const playAlert = useCallback(() => {
		timerAlert.current.play();
	}, []);

	useEffect(() => {
		setMinutes(userSettings[userSettings.mode]);
	}, [userSettings]);

	useEffect(() => {
		if (!active && !paused) {
			setMinutes(userSettings[userSettings.mode]);
			setSeconds('00');
			setCircle(0);
		}
		if (active && !paused) {
			const interval = setInterval(() => {
				if (minutes === '00' && seconds === '00') {
					timer('stop');
					playAlert();
				} else if (seconds === '00') {
					if (minutes < 11) {
						setMinutes(() => '0' + (minutes - 1));
						setSeconds(59);
					} else {
						setMinutes(() => minutes - 1);
						setSeconds(59);
					}
					setCircle(
						() =>
							circle + 301 / (parseInt(userSettings[userSettings.mode]) * 60)
					);
				} else {
					if (seconds < 11) {
						setSeconds(() => '0' + (seconds - 1));
					} else {
						setSeconds(() => seconds - 1);
					}
					setCircle(
						() =>
							circle + 301 / (parseInt(userSettings[userSettings.mode]) * 60)
					);
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [
		active,
		paused,
		minutes,
		seconds,
		timer,
		userSettings,
		circle,
		playAlert,
	]);

	return (
		<div className='Clock'>
			<div className='OuterRing'>
				<svg className='Ring' viewBox='0 0 100 100'>
					<circle
						className='Circle'
						cx='50'
						cy='50'
						r='48'
						style={{ strokeDashoffset: `${circle}` }}
						stroke={color}
						fill='transparent'
						strokeWidth='4'
						transform='rotate(-90, 50, 50)'
						strokeLinecap='round'
					/>
				</svg>
				<div className='Units'>
					<h1 style={{ fontFamily: font }}>{`${minutes}:${seconds}`}</h1>
					{finished && <h3 onClick={() => timer('start')}>Restart</h3>}
					{active && !paused && <h3 onClick={() => timer('pause')}>Pause</h3>}
					{!active && !finished && !paused && (
						<h3 onClick={() => timer('start')}>Start</h3>
					)}
					{!active && paused && <h3 onClick={() => timer('resume')}>Resume</h3>}
				</div>
			</div>
			<audio ref={timerAlert} src={soundfile} type='audio' />
		</div>
	);
};

export default Clock;
