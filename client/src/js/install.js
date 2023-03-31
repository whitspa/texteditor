const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//Added an event listener to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
console.log('target')
console.log("event" + event)
event.preventDefault();
//Syntax for triggered events
window.deferredPrompt = event;
//Code line below removes the hidden class from the button
butInstall.classList.toggle('hidden', false);
});



// Logic to add click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
const promptEvent = window.deferredPrompt;
if (!promptEvent) {
    return;
}
//calling the function and showing the prompt
promptEvent.prompt();
//reset the variable b/c it can only be called once
window.deferredPrompt = null;

butInstall.classList.toggle('hidden', true);
});

// Added handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('install target')
    window.defeferredPrompt = null;
});
