import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
	return (
		<div>
			{guesses &&
				guesses.map((guess, i) => {
					if (i === turn) {
						return <Row key={i} currentGuess={currentGuess} />;
					}
					return <Row key={i} guess={guess} />;
				})}
		</div>
	);
}
