import React from 'react';

const Mode = ({ userSettings, setUserSettings }) => {
	const { mode, font, color } = userSettings;

	const findStyle = (style) => {
		return {
			backgroundColor: mode === style ? color : 'hsl(234, 39%, 14%)',
			color:
				mode === style ? 'hsl(234, 39%, 14%)' : 'hsla(226, 100%, 92%, 0.4)',
			fontFamily: font,
		};
	};

	return (
		<div className='Mode'>
			<p
				style={findStyle('pomodoro')}
				onClick={() =>
					setUserSettings({
						...userSettings,
						mode: 'pomodoro',
						active: false,
						paused: false,
					})
				}>
				pomodoro
			</p>
			<p
				style={findStyle('shortBreak')}
				onClick={() =>
					setUserSettings({
						...userSettings,
						mode: 'shortBreak',
						active: false,
						paused: false,
					})
				}>
				short break
			</p>
			<p
				style={findStyle('longBreak')}
				onClick={() =>
					setUserSettings({
						...userSettings,
						mode: 'longBreak',
						active: false,
						paused: false,
					})
				}>
				long break
			</p>
		</div>
	);
};

export default Mode;
