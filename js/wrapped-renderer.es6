/* jshint esversion: 6 */

// renderer that wraps another renderer to add rulers, quant stuff, etc.

import * as DefaultRenderer from "./default-renderer.es6";

export { wrapRenderer };

function wrapRenderer(renderer) {
    return { renderTier: renderTier(renderer),
             drawTier: drawTier(renderer)
           };
}

function renderTier(renderer) {
    return function(status, tier) {
        console.log(renderer);
        drawTier(renderer)(tier);
    };
}

function drawTier(renderer) {
    return function(tier) {
        console.log(renderer.drawTier);
        renderer.drawTier(tier);

        tier.drawOverlay();
        tier.paintQuant();
    };
}
