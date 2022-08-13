
const langCode = {
    english: 'en',
    arabic: 'ar',
    azerbaijani: 'az',
    chinese: 'zh',
    czech: 'cs',
    danish: 'da',
    dutch: 'nl',
    esperanto: 'eo',
    finnish: 'fi',
    french: 'fr',
    german: 'de',
    greek: 'el',
    hebrew: 'he',
    hindi: 'hi',
    hungarian: 'hu',
    indonesian: 'id',
    irish: 'ga',
    italian: 'it',
    japanese: 'ja',
    korean: 'ko',
    persian: 'fa',
    polish: 'pl',
    portuguese: 'pt',
    russian: 'ru',
    slovak: 'sk',
    spanish: 'es',
    swedish: 'sv',
    turkish: 'tr',
    ukranian: 'uk'
}

async function getTranslation() {
    try {
        const res = await fetch("https://libretranslate.de/translate", {
	        method: "POST",
	        body: JSON.stringify({
	        	q: "",
	        	source: "uk",
	        	target: "es",
	        	format: "text",
	        	api_key: ""
	        }),
	        headers: { "Content-Type": "application/json" }
        });
        let data = await res.json()
        console.log(data)

    } catch(err) {
        console.log(err);
    }
}