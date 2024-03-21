// Constants

const fadeInHeight = window.innerHeight * 0.9;

const subtitles = [
    "how did we get here?",
    "cheese and rice!",
    "{{ subtitle }}",
    "now with more bread!"
];

// Functions



// checks that the element is at the right window height to start the fade in animation
function checkFadeInHeight(element) {
    return element.getBoundingClientRect().top < fadeInHeight;
}

/**
 * content: the content div of the element
 * borderer: the borderer div
 * startStyles: {
 *  content: name of the starting style of the content to be removed
 *  border1: name of the first style to be removed
 *  border2: name of the second style to be removed
 *  delay: delay in ms between removing border1 and border2
 * }
 * eventListener: reference to the listener to be removed when this function is executed
*/
function doBorderer(content, borderer, startStyles, eventListener) {
    content.classList.remove(startStyles.content);
    borderer.classList.remove(startStyles.border1);
    setTimeout(() => {
        borderer.classList.remove(startStyles.border2);
    }, startStyles.delay);
    window.removeEventListener('scroll', eventListener, true);
    window.removeEventListener('scroll', eventListener, false);
}

// Generate Subtitle

const subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
const subtitleElement = document.querySelector('.subtitle');
subtitleElement.innerText = subtitle;

// Dark Mode Switch

const darkModeSwitch = document.querySelector('#dark-mode-switch');
const htmlElement = document.querySelector('html');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkModeSwitch.checked = true;
    htmlElement.setAttribute('data-theme', 'dark');
} else {
    darkModeSwitch.checked = false;
    htmlElement.setAttribute('data-theme', 'light');
}

darkModeSwitch.addEventListener('change', function () {
    if (this.checked) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
    }
});


// Header fade in

const header = document.querySelector('header');
const headerA = document.querySelector('header .a');
const headerABorderer = headerA.querySelector(".borderer");
const headerAText = headerA.querySelector('h1');
const headerB = document.querySelector('header .b');
const headerBBorderer = headerB.querySelector(".borderer");
const headerBText = headerB.querySelector('p');

window.addEventListener('load', () => {
    headerABorderer.classList.remove('start-height');
    setTimeout(() => {
        headerABorderer.classList.remove('start-width');
        headerAText.classList.remove('start-opacity');
        setTimeout(() => {
            headerBBorderer.classList.remove('start-height');
            headerBText.classList.remove('start-opacity');
        }, 300);
    }, 400);
});

// Navbar fade in

window.addEventListener('scroll', function () {
    this.document.querySelector('nav .content').classList.remove('start-style');
    this.document.querySelector('nav .borderer').classList.remove('start-height');
}, { once: true });

// About fade in

const about = document.querySelector('#about');
const aboutBorderer = about.querySelector('.borderer');
const aboutContent = about.querySelector('.content');

window.addEventListener('scroll', function aboutOnScroll() {
    if (checkFadeInHeight(about)) {
        doBorderer(
            aboutContent,
            aboutBorderer,
            {
                content: 'start-style',
                border1: 'start-width',
                border2: 'start-height',
                delay: 300
            },
            aboutOnScroll
        );
    }
});

// Resume fade in

const resume = document.querySelector('#resume');
const resumeBorderer = resume.querySelector('.borderer');
const resumeContent = resume.querySelector('.content');

window.addEventListener('scroll', function resumeOnScroll() {
    if (checkFadeInHeight(resume)) {
        doBorderer(
            resumeContent,
            resumeBorderer,
            {
                content: 'start-style',
                border1: 'start-width',
                border2: 'start-height',
                delay: 300
            },
            resumeOnScroll
        );
    }
});

// Resume items fade in

const resumeItems = resume.querySelectorAll('.item');
const itemEventListeners = [];

resumeItems.forEach((item, i) => {
    itemEventListeners[i] = function () {
        if (item.getBoundingClientRect().top < fadeInHeight) {
            item.querySelector('.content').classList.remove('start-style');
            item.querySelector('.borderer').classList.remove('start-height');
            this.window.removeEventListener('scroll', itemEventListeners[i], true);
            this.window.removeEventListener('scroll', itemEventListeners[i], false);
        }
    }
    window.addEventListener('scroll', itemEventListeners[i]);
});