const DICTIONARY_API_ENDPOINT =
	"https://api.dictionaryapi.dev/api/v2/entries/en/";

async function displayWordOfTheDay() {
	const response = await fetch(DICTIONARY_API_ENDPOINT + "ephemeral");
	const data = await response.json();

	const wordOfTheDay = document.getElementById("wordOfTheDay");
	const phonetics = document.getElementById("wordOfDayPhonetics");
	const pronunciation = document.getElementById("wordOfDayPronounciation");
	const partOfSpeech = document.getElementById("wordOfDayPartOfSpeech");
	const definition = document.getElementById("definition");
	const synonyms = document.getElementById("synonyms");

	wordOfTheDay.textContent = data[0].word;

	for (let i = 0; i < data[0].phonetics.length; i++) {
		if (data[0].phonetics[i].text) {
			phonetics.textContent = data[0].phonetics[i].text;
			break;
		}
	}

	const hasAudio = data[0].phonetics.some((p) => p.audio && p.audio !== "");
	if (!hasAudio) {
		pronunciation.style.display = "none";
	}

	pronunciation.addEventListener("click", () => {
		for (let i = 0; i < data[0].phonetics.length; i++) {
			if (data[0].phonetics[i].audio === "") {
				continue;
			}
			if (data[0].phonetics[i].audio) {
				const audio = new Audio(data[0].phonetics[i].audio);
				audio.play();
				break;
			}
		}
	});

	partOfSpeech.textContent = data[0].meanings[0].partOfSpeech;
	definition.textContent = data[0].meanings[0].definitions[0].definition;
	synonyms.textContent = data[0].meanings[0].definitions[0].synonyms;
}

async function search() {
	const query = document.getElementById("search").value;

	const response = await fetch(DICTIONARY_API_ENDPOINT + query);
	const data = await response.json();

	document.getElementById("mainSearchBox").style.display = "none";
	document.getElementById("wordOfTheDayCard").style.display = "none";
	document.getElementById("searchResults").style.display = "block";
	document.getElementById("navSearchBox").classList.add("visible");

	const word = document.getElementById("searchedWord");
	const phonetics = document.getElementById("searchedWordPhonetics");
	const pronunciation = document.getElementById("searchedWordPronounciation");
	const partOfSpeech = document.getElementById("searchedWordPartOfSpeech");
	const definitions = document.getElementById("definitions");
	const synonyms = document.getElementById("synonymsList");

	word.textContent = data[0].word;

	for (let i = 0; i < data[0].phonetics.length; i++) {
		if (data[0].phonetics[i].text) {
			phonetics.textContent = data[0].phonetics[i].text;
			break;
		}
	}

	const hasAudio = data[0].phonetics.some((p) => p.audio && p.audio !== "");
	if (!hasAudio) {
		pronunciation.style.display = "none";
	}

	pronunciation.addEventListener("click", () => {
		for (let i = 0; i < data[0].phonetics.length; i++) {
			if (data[0].phonetics[i].audio === "") {
				continue;
			}
			if (data[0].phonetics[i].audio) {
				const audio = new Audio(data[0].phonetics[i].audio);
				audio.play();
				break;
			}
		}
	});

	partOfSpeech.textContent = data[0].meanings[0].partOfSpeech;

	data[0].meanings[0].definitions.forEach((definition) => {
		const meaning = document.createElement("li");
		meaning.textContent = definition.definition;
		definitions.appendChild(meaning);
	});

	data[0].meanings[0].synonyms.forEach((syn) => {
		const synonym = document.createElement("li");
		const button = document.createElement("button");
		button.textContent = syn;
		synonym.appendChild(button);
		synonyms.appendChild(synonym);
	});
}

displayWordOfTheDay();

document.getElementById("homeButton").addEventListener("click", () => {
	displayWordOfTheDay();
});

document.getElementById("searchButton").addEventListener("click", () => {
	search();
});

document
	.getElementById("mainSearchBox")
	.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			search();
		}
	});
