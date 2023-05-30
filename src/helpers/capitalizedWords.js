const capitalizeWords = (name) => {
	if (name.includes('-')) {
		const words = name.split('-');
		const capitalizedWords = words.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1)
		);
		const convertedName = capitalizedWords.join(' ');
		return convertedName;
	}
	return name.charAt(0).toUpperCase() + name.slice(1);
};

export default capitalizeWords;
