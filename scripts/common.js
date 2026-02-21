const SCROLL_SPEED = 22;

let scrollAnimationFrame = null;
let scrollElement = null;

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

function startScrolling(direction) {
    if (scrollAnimationFrame) return;
    scrollElement = document.querySelector(window.SCROLL_SELECTOR);
    if (direction > 0) {
        scrollDown();
    } else {
        scrollUp();
    }
}

function stopScrolling() {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = null;
    }
}

window.addEventListener('keydown', function (e) {
    if (e.altKey && e.code === 'KeyR') {
        if (!e.repeat) {
            startScrolling(1);
        }
        e.preventDefault();
    }
    if (e.altKey && e.code === 'KeyF') {
        if (!e.repeat) {
            startScrolling(-1);
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
    if (e.code === 'KeyR' || e.code === 'KeyF') {
        stopScrolling();
    }
    if (!e.altKey) {
        stopScrolling();
    }
}, true);
