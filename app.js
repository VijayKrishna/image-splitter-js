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

            // Draw each quadrant onto its own canvas
            drawQuadrant(canvas, ctx, 0, 0, halfWidth, halfHeight, 'quad1');
            drawQuadrant(canvas, ctx, halfWidth, 0, halfWidth, halfHeight, 'quad2');
            drawQuadrant(canvas, ctx, 0, halfHeight, halfWidth, halfHeight, 'quad3');
            drawQuadrant(canvas, ctx, halfWidth, halfHeight, halfWidth, halfHeight, 'quad4');
        }
    }
});

function drawQuadrant(sourceCanvas, sourceCtx, startX, startY, width, height, targetCanvasId) {
    const targetCanvas = document.getElementById(targetCanvasId);
    const targetCtx = targetCanvas.getContext('2d');

    // Set canvas size to match the quadrant size
    targetCanvas.width = width;
    targetCanvas.height = height;

    // Draw the specific quadrant from the original image
    targetCtx.drawImage(sourceCanvas, startX, startY, width, height, 0, 0, width, height);
}
