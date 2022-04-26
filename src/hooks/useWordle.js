import { useState } from "react";

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
	const [history, setHistory] = useState([]); // each guess is a string
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});

	// format a guess into an array of letter objects
	// e.g. [{key: 'a', color: 'yellow'}]
	const formatGuess = () => {
		let solutionChars = [...solution];
		let formattedGuess = [...currentGuess].map((c) => {
			return { key: c, color: "gray" };
		});

		formattedGuess.forEach((guess, idx) => {
			const sourceVal = solutionChars[idx];
			if (sourceVal === guess.key) {
				guess.color = "green";
			} else if (solutionChars.includes(guess.key)) {
				guess.color = "yellow";
			}
		});
		return formattedGuess;
	};

	// add a new guess to the guesses state
	// update the isCorrect state if the guess is correct
	// add one to the turn state
	const addNewGuess = (guess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}
		setGuesses((prev) => {
			let newGuesses = [...prev];
			newGuesses[turn] = guess;
			return newGuesses;
		});
		setHistory((prev) => [...prev, currentGuess]);
		setTurn((prev) => prev + 1);
		setUsedKeys((prev) => {
			let newKeys = { ...prev };
			guess.forEach((l) => {
				const currentColor = newKeys[l.key];
				if (l.color === "green") {
					newKeys[l.key] = "green";
				} else if (l.color === "yellow" && currentColor !== "green") {
					newKeys[l.key] = "yellow";
				} else if (l.color === "gray" && !currentColor) {
					newKeys[l.key] = "gray";
				}
			});
			return newKeys;
		});
		setCurrentGuess("");
	};

	// handle keyup event & track current guess
	// if user presses enter, add the new guess
	const handleKeyup = ({ key }) => {
		if (key === "Enter") {
			if (turn > 5) {
				console.log("Used all guesses!");
				return;
			}
			if (history.includes(currentGuess)) {
				console.log("Already used that word!");
				return;
			}
			if (currentGuess.length !== 5) {
				console.log("Must be 5 chars long!");
				return;
			}
			const formatted = formatGuess();
			addNewGuess(formatted);
		}

		if (key === "Backspace") {
			setCurrentGuess((prev) => prev.slice(0, -1));
			return;
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => prev + key);
			}
		}
	};

	return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
