export const calculateAge = (birthDate: Date) => {
	const then = new Date(birthDate)
	const msBetweenDates = Math.abs(then.getTime() - new Date().getTime())
	const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000)
	return Math.round(hoursBetweenDates)
}
