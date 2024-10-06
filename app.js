// Store references to the audio elements and sliders
const audioElements = Array.from(document.querySelectorAll('audio'));
const volumeSliders = document.querySelectorAll('.slider');
let isDimmed = false; // Track the dimmed state
let currentVolume = 1; // Track the current volume level

// Function to toggle audio play/pause
function toggleAudio(index) {
    const audio = audioElements[index];

    // Pause other audio elements
    audioElements.forEach((aud, i) => {
        if (i !== index) {
            aud.pause();
            aud.currentTime = 0; // Reset the audio
        }
    });

    // Toggle play/pause for the selected audio
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Function to update audio volume
function updateVolume() {
    const universalVolume = volumeSliders[0].value / 100; // Use the first slider as the universal volume
    audioElements.forEach(audio => {
        audio.volume = universalVolume;
    });
}

// Attach event listeners to the volume sliders
volumeSliders.forEach(slider => {
    slider.addEventListener('input', updateVolume);
});

// Dim function to control volume
function Dim() {
    const dimButton = document.getElementsByTagName("a")[0];

    // Toggle dimming
    if (isDimmed) {
        // Restore volume
        updateVolume(); // Set to current slider value
        dimButton.classList.remove("active");
    } else {
        // Set volume to 0
        audioElements.forEach(audio => {
            audio.volume = 0;
        });
        dimButton.classList.add("active");
    }
    
    isDimmed = !isDimmed; // Toggle the state
}

// Initialize the volume based on the first slider
updateVolume();
