import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../images/icon-logo.svg';
import Mode from './Mode';
import Clock from './Clock';
import Settings from './Settings';
import { ReactComponent as SettingsIcon } from '../images/icon-settings.svg';

const Pomodoro = () => {
	const [viewSettings, setViewSettings] = useState(false);
	const [userSettings, setUserSettings] = useState({
		mode: 'pomodoro',
		active: false,
		paused: false,
		finished: false,
		pomodoro: 25,
		shortBreak: '05',
		longBreak: 15,
		font: "'Kumbh Sans', sans-serif",
		color: 'hsl(0, 91%, 71%)',
	});

	useEffect(() => {
		if (localStorage.getItem('userSettings')) {
			const localSettings = JSON.parse(localStorage.getItem('userSettings'));
			setUserSettings((user) => ({
				...user,
				...localSettings,
				mode: 'pomodoro',
				paused: false,
			}));
		}
	}, []);

	const settingsHandler = (e) => {
		localStorage.setItem('userSettings', JSON.stringify(e));
		setUserSettings(e);
		setViewSettings(!viewSettings);
	};

	return (
		<div className='Container'>
			<Logo />
			<Mode userSettings={userSettings} setUserSettings={setUserSettings} />
			<Clock userSettings={userSettings} setUserSettings={setUserSettings} />
			<SettingsIcon
				className='SettingsIcon'
				onClick={() => setViewSettings(!viewSettings)}
			/>
			{viewSettings && (
				<Settings
					viewSettings={viewSettings}
					setViewSettings={setViewSettings}
					userSettings={userSettings}
					setUserSettings={setUserSettings}
					settingsHandler={settingsHandler}
				/>
			)}
		</div>
	);
};

export default Pomodoro;
