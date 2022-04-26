export default function Row({ guess, currentGuess }) {
	if (guess) {
		return (
			<div className="row">
				{guess.map((g, i) => (
					<div key={i} className={g.color}>
						{g.key}
					</div>
				))}
			</div>
		);
	}

	if (currentGuess) {
		const letters = currentGuess.split("");
		return (
			<div className="row current">
				{letters.map((letter, i) => (
					<div key={i} className="filled">
						{letter}
					</div>
				))}
				{[...Array(5 - letters.length)].map((_, i) => (
					<div key={i}></div>
				))}
			</div>
		);
	}

	return (
		<div className="row">
			<div>{guess && guess[0].key}</div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
