const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// This event is fired by the browser just before displaying the install prompt for a PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object for later use
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Logic for handling click event on the install button
butInstall.addEventListener('click', async () => {
    // Retrieve the stored event object
    const promptEvent = window.deferredPrompt;

    // If the event object is not available, return early
    if (!promptEvent) {
     return;
    }

    // Trigger the installation prompt
    promptEvent.prompt();

    // Reset the deferredPrompt to null as it can only be used once
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// This event is fired when the PWA is successfully installed
window.addEventListener('appinstalled', (event) => {
    // Reset the deferredPrompt to null after successful installation
    window.deferredPrompt = null;
});
