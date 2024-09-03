document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            const canvas = document.getElementById('originalCanvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size to match the image size
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Calculate quadrant dimensions
            const halfWidth = img.width / 2;
            const halfHeight = img.height / 2;

            const quads = document.getElementById('quadrants');
            quads.style.display = 'block';

            // Create images from quadrants
            createQuadrantImage(canvas, 0, 0, halfWidth, halfHeight, 'quad1');
            createQuadrantImage(canvas, halfWidth, 0, halfWidth, halfHeight, 'quad2');
            createQuadrantImage(canvas, 0, halfHeight, halfWidth, halfHeight, 'quad3');
            createQuadrantImage(canvas, halfWidth, halfHeight, halfWidth, halfHeight, 'quad4');
        }
    }
});

function createQuadrantImage(sourceCanvas, startX, startY, width, height, targetImgId) {
    const targetImg = document.getElementById(targetImgId);
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Set canvas size to match the quadrant size
    tempCanvas.width = width;
    tempCanvas.height = height;

    // Draw the specific quadrant from the original image onto the temporary canvas
    tempCtx.drawImage(sourceCanvas, startX, startY, width, height, 0, 0, width, height);

    // Convert the quadrant to a data URL and set it as the source of the target img element
    targetImg.src = tempCanvas.toDataURL();
}
