const SCROLL_SPEED = 22;

let scrollAnimationFrame = null;
let scrollElement = null;
let directionUp = 0;
let directionDown = 0;

function scrollUp() {
    if (scrollElement) {
        scrollElement.scrollBy(0, -SCROLL_SPEED);
        scrollAnimationFrame = requestAnimationFrame(scrollUp);
    }
}
function scrollDown() {
    if (scrollElement) {
        scrollElement.scrollBy(0, SCROLL_SPEED);
        scrollAnimationFrame = requestAnimationFrame(scrollDown);
    }
}
function stopScrolling() {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = null;
    }
}
function updateScrolling() {
    const dir = directionUp - directionDown;
    if (dir === 0) {
        stopScrolling();
        return;
    }
    if (scrollAnimationFrame) return;
    scrollElement = document.querySelector(window.SCROLL_SELECTOR);
    if (dir > 0) {
        scrollUp();
    } else {
        scrollDown();
    }
}

window.addEventListener('keydown', function (e) {
    const special = (e.ctrlKey || e.altKey) && !e.shiftKey;
    if (special && (e.code === 'KeyW' || e.code === 'KeyE')) {
        if (!e.repeat) {
            directionUp = 1;
            updateScrolling();
        }
        e.preventDefault();
    }
    if (special && e.code === 'KeyD') {
        if (!e.repeat) {
            directionDown = 1;
            updateScrolling();
        }
        e.preventDefault();
    }
    const justKey = !e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey;
    const isPaste = (e.ctrlKey || e.metaKey) && e.code === 'KeyV';
    
    if ((window.AUTO_FOCUS_ON_ANY_KEY && justKey) || isPaste) {
        if (this.document.activeElement.tagName !== 'INPUT' && this.document.activeElement.tagName !== 'TEXTAREA') {
            const inputField = this.document.querySelector(window.INPUT_SELECTOR);
            if (inputField) {
                inputField.focus();
            }
        }
    }
}, true);

window.addEventListener('keyup', function (e) {
    if (e.code === 'KeyW' || e.code === 'KeyE') {
        directionUp = 0;
        updateScrolling();
    }
    if (e.code === 'KeyD') {
        directionDown = 0;
        updateScrolling();
    }
    if (!e.ctrlKey && !e.altKey) {
        directionUp = 0;
        directionDown = 0;
        updateScrolling();
    }
}, true);

window.addEventListener('blur', () => {
    directionUp = 0;
    directionDown = 0;
    updateScrolling();    
}, true);
