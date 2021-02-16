import React, { useState } from 'react';
import { ReactComponent as UpArrow } from '../images/icon-arrow-up.svg';
import { ReactComponent as DownArrow } from '../images/icon-arrow-down.svg';
import { ReactComponent as Close } from '../images/icon-close.svg';

const Settings = ({
	viewSettings,
	setViewSettings,
	userSettings,
	settingsHandler,
}) => {
	const [settings, setSettings] = useState({ ...userSettings });

	const formatTime = (e) => {
		if (e.pomodoro < 10 && e.pomodoro[0] !== '0') {
			e.pomodoro = '0' + e.pomodoro;
		}
		if (e.shortBreak < 10 && e.shortBreak[0] !== '0') {
			e.shortBreak = '0' + e.shortBreak;
		}
		if (e.longBreak < 10 && e.longBreak[0] !== '0') {
			e.longBreak = '0' + e.longBreak;
		}
		settingsHandler(e);
	};

console.log(userSettings.shortBreak[0])

	return (
		<div className='Settings'>
			<h2>Settings</h2>
			<Close className='Close' onClick={() => setViewSettings(!viewSettings)} />
			<div className='Time'>
				<h4>Time (Minutes)</h4>
				<div>
					<div className='TimeChange'>
						<p>pomodoro</p>
						<p>short break</p>
						<p>long break</p>
					</div>
					<div className='InputList'>
						<div className='Input'>
							<p>{settings.pomodoro}</p>
							<div className='Arrows'>
								<UpArrow
									className='ArrowUp'
									onClick={() =>
										setSettings({
											...settings,
											pomodoro: parseInt(settings.pomodoro) + 1,
										})
									}
								/>
								<DownArrow
									className='ArrowDown'
									onClick={() =>
										setSettings({
											...settings,
											pomodoro: parseInt(settings.pomodoro) - 1,
										})
									}
								/>
							</div>
						</div>
						<div className='Input'>
							<p>{settings.shortBreak}</p>
							<div className='Arrows'>
								<UpArrow
									className='ArrowUp'
									onClick={() =>
										setSettings({
											...settings,
											shortBreak: parseInt(settings.shortBreak) + 1,
										})
									}
								/>
								<DownArrow
									className='ArrowDown'
									onClick={() =>
										setSettings({
											...settings,
											shortBreak: parseInt(settings.shortBreak) - 1,
										})
									}
								/>
							</div>
						</div>
						<div className='Input'>
							<p>{settings.longBreak}</p>
							<div className='Arrows'>
								<UpArrow
									className='ArrowUp'
									onClick={() =>
										setSettings({
											...settings,
											longBreak: parseInt(settings.longBreak) + 1,
										})
									}
								/>
								<DownArrow
									className='ArrowDown'
									onClick={() =>
										setSettings({
											...settings,
											longBreak: parseInt(settings.longBreak) - 1,
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='Font'>
				<h4>Font</h4>
				<div className='FontChange'>
					<div className='Outline'>
						<p
							className={
								settings.font === "'Kumbh Sans', sans-serif" ? 'FontActive' : ''
							}
							onClick={() =>
								setSettings({
									...settings,
									font: "'Kumbh Sans', sans-serif",
								})
							}>
							Aa
						</p>
					</div>
					<div className='Outline'>
						<p
							className={
								settings.font === "'Roboto Slab', serif" ? 'FontActive' : ''
							}
							onClick={() =>
								setSettings({
									...settings,
									font: "'Roboto Slab', serif",
								})
							}>
							Aa
						</p>
					</div>
					<div className='Outline'>
						<p
							className={
								settings.font === "'Space Mono', monospace" ? 'FontActive' : ''
							}
							onClick={() =>
								setSettings({
									...settings,
									font: "'Space Mono', monospace",
								})
							}>
							Aa
						</p>
					</div>
				</div>
			</div>
			<div className='Color'>
				<h4>Color</h4>
				<div className='ColorChange'>
					<div className='Outline'>
						<p
							className='Check1'
							onClick={() =>
								setSettings({
									...settings,
									color: 'hsl(0, 91%, 71%)',
								})
							}>
							{settings.color === 'hsl(0, 91%, 71%)' && '✓'}
						</p>
					</div>
					<div className='Outline'>
						<p
							className='Check2'
							onClick={() =>
								setSettings({
									...settings,
									color: 'hsl(182, 91%, 71%)',
								})
							}>
							{settings.color === 'hsl(182, 91%, 71%)' && '✓'}
						</p>
					</div>
					<div className='Outline'>
						<p
							className='Check3'
							onClick={() =>
								setSettings({
									...settings,
									color: 'hsl(284, 89%, 74%)',
								})
							}>
							{settings.color === 'hsl(284, 89%, 74%)' && '✓'}
						</p>
					</div>
				</div>
			</div>
			<button onClick={() => formatTime(settings)}>Apply</button>
		</div>
	);
};

export default Settings;
