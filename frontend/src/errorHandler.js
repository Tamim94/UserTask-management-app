
window.addEventListener('error', (event) => {
    if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
        event.stopImmediatePropagation();
    }
});