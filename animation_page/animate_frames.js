const startFrame = 0;
const endFrame = 9;
const frames = [];

// Preload frames from "frames_2" folder
for (let i = startFrame; i <= endFrame; i++) {
    const img = new Image();
    img.src = `frames/${i}.jpg`;
    frames.push(img);
}

const frameElement = document.getElementById('frame');

// Function to update frame based on position (either mouse or touch)
function updateFrame(positionX) {
    const rect = frameElement.getBoundingClientRect();

    if(positionX < rect.left || positionX > rect.right) return;

    const relativeX = positionX-rect.left;
    const width = rect.width;

    // Map position (mouse or touch) to frame index
    const frameIndex = Math.floor((relativeX / width) * frames.length);
    const clampedIndex = Math.min(frameIndex,frames.length-1);


    // Display the corresponding frame
    frameElement.src = frames[clampedIndex].src;
}

// Event listener for mouse movement (desktop)
document.addEventListener('mousemove', (event) => {
    updateFrame(event.clientX);
});

// Event listener for touch movement (mobile)
document.addEventListener('touchmove', (event) => {
    // Prevent the page from scrolling while swiping
    event.preventDefault();

    // Get the X position of the first touch point
    const touchX = event.touches[0].clientX;
    updateFrame(touchX);
});