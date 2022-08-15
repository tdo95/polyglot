
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
let FROM_LANG_CODE = "en";
let TO_LANG_CODE = "es";

const leftText = document.querySelector('.from-text');
const rightText = document.querySelector('.translated-text');
const langMenu = document.querySelector('.lang-menu');
const toFromButtons = document.querySelectorAll('.from-lang, .to-lang');

document.querySelector('.flip-btn').addEventListener('click', async () => {
    flipLang();
    let data = await getTranslation(leftText.value)
    //display translation
    rightText.innerText = (data || "");

});

function flipLang() {

    let from = document.querySelector('.from-lang').innerText;
    let to = document.querySelector('.to-lang').innerText;
    
    document.querySelector('.from-lang').innerText = to;
    document.querySelector('.to-lang').innerText = from;
    [FROM_LANG_CODE, TO_LANG_CODE] = [TO_LANG_CODE, FROM_LANG_CODE];

}

const langButtons = document.querySelectorAll(' .lang-menu button')
langButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
        updateLanguage(btn.innerText);
        let data = await getTranslation(leftText.value)
        //display translation
        rightText.innerText = (data || "");
        
    });
})

function updateLanguage(lang) {
    if (leftBtnActive) {
        document.querySelector('.from-lang').innerText = lang;
        FROM_LANG_CODE = langCode[lang.toLowerCase()];
        //close menu
        langMenu.classList.remove('open');
        langMenu.classList.add('close');
        leftText.classList.remove('hidden');
        rightText.classList.remove('hidden');
        leftBtnActive = false;
    } else if (rightBtnActive) {
        document.querySelector('.to-lang').innerText = lang;
        TO_LANG_CODE = langCode[lang.toLowerCase()];
        //close menu
        leftText.classList.remove('hidden');
        rightText.classList.remove('hidden');
        langMenu.classList.remove('open');
        langMenu.classList.add('close');
        rightBtnActive = false;
    }

}

toFromButtons.forEach(btn => {
    btn.addEventListener('click', async () => await toggleLangMenu(btn.id));
});
let leftBtnActive, rightBtnActive;
async function toggleLangMenu(id) {
    if (id === 'left') {
        if (leftBtnActive) {
            //close menu
            langMenu.classList.remove('open');
            langMenu.classList.add('close');
            leftText.classList.remove('hidden');
            rightText.classList.remove('hidden');
            //disable left button
            leftBtnActive = false;
        } else {
            leftBtnActive = true;
            rightBtnActive = false;
            //show menu - triggers quick reappearance
            langMenu.classList.remove('open');
            langMenu.classList.add('close');
            await waitFor(10);
            leftText.classList.add('hidden');
            rightText.classList.add('hidden');
            langMenu.classList.remove('close');
            langMenu.classList.add('open');

        }
        
    } else if (id === 'right') {
        if (rightBtnActive) {
            //close menu
            langMenu.classList.remove('open');
            langMenu.classList.add('close');
            leftText.classList.remove('hidden');
            rightText.classList.remove('hidden');
            //disable right button
            rightBtnActive = false;
        } else {
            leftBtnActive = false;
            rightBtnActive = true;
            //show menu - triggers quick reappearance
            langMenu.classList.remove('open');
            langMenu.classList.add('close');
            await waitFor(10);
            leftText.classList.add('hidden');
            rightText.classList.add('hidden');
            langMenu.classList.remove('close');
            langMenu.classList.add('open');
        }
    }
}

leftText.addEventListener('input', getSearchResults);

let timeout;
function getSearchResults() {
    //displays results 500 milliseconds after input has stopped coming in
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(async () => {
        let data = await getTranslation(leftText.value)
        //display translation
        rightText.innerText = (data || "")
    }, 300);
}


async function getTranslation(text) {
    if (!text) return;
    try {
        const res = await fetch("https://libretranslate.de/translate", {
	        method: "POST",
	        body: JSON.stringify({
	        	q: text,
	        	source: FROM_LANG_CODE,
	        	target: TO_LANG_CODE,
	        	format: "text",
	        	api_key: ""
	        }),
	        headers: { "Content-Type": "application/json" }
        });
        let data = await res.json();
        return data.translatedText;

    } catch(err) {
        console.log(err);
    }
}

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));