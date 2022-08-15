
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

const leftText = document.querySelector('.from-text');
const rightText = document.querySelector('.translated-text');
const langMenu = document.querySelector('.lang-menu');
const langButtons = document.querySelectorAll('.from-lang, .to-lang');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => toggleLangMenu(btn.id));
});
let leftBtnActive, rightBtnActive;
function toggleLangMenu(id) {
    if (id === 'left') {
        if (leftBtnActive) {
            //close menu
            //disable left button
            leftBtnActive = false;
        } else {
            leftBtnActive = true;
            rightBtnActive = false;
            //show menu
            leftText.classList.add('hidden');
            rightText.classList.add('hidden');
            langMenu.classList.remove('close');
            langMenu.classList.add('open');

        }
        
    } else if (id === 'right') {
        if (rightBtnActive) {
            //close menu
            //disable right button
            rightBtnActive = false;
        } else {
            leftBtnActive = false;
            rightBtnActive = true;
            //show menu
        }
    }
    console.log(id, leftBtnActive, rightBtnActive);

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