/* eslint-disable react/prop-types */
import capitalizeWords from '../helpers/capitalizedWords';
const MAX_STAT = 200;

function Stat({ stat }) {
	const statName = stat.stat.name;
	const statBase = stat.base_stat;

	const statProcent = (statBase * 100) / MAX_STAT;

	return (
		<div className='stat-container'>
			<div className='stat-column'>
				<p>{statBase}</p>
				<div
					className='filled-part'
					style={{
						'--stat-procent': `${statProcent}%`,
					}}
				></div>
			</div>
			<div className='stat-name'>{capitalizeWords(statName)}</div>
		</div>
	);
}

export default Stat;
