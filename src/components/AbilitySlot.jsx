/* eslint-disable react/prop-types */
import capitalizeWords from '../helpers/capitalizedWords';
function AbilitySlot({ slot, abilities }) {
	const abilityName = abilities.find((ab) => ab.slot === slot);

	const handleName = () => {
		if (abilityName) {
			const name = abilityName.ability.name;
			return capitalizeWords(name);
		} else {
			return '';
		}
	};

	return <div className='ability-slot'>{handleName()}</div>;
}

export default AbilitySlot;
