/* jshint esversion: 6 */

// renderer that wraps a purescript renderer to add rulers, quant stuff, etc.

import * as DefaultRenderer from "./default-renderer.es6";

export { wrapRenderer };


function wrapRenderer(glyphifyFeatures, canvasHeight) {

    const prepareSubtiers = tier => {

        const view = { viewStart: tier.browser.viewStart,
                       scale: tier.browser.scale,
                       height: canvasHeight
                     };

        const features = tier.currentFeatures;

        tier.padding = 3;
        tier.subtiers = [];

        const results = glyphifyFeatures(view)(features);

        // If all the results are a string, we want to show it on screen - something went wrong.
        if (typeof results === "string") {
            tier.updateStatus(results);
        } else {
            // Otherwise we want to print the errors to console, while telling the user something went wrong.
            let status = "";
            results.glyphs.forEach(r => {
                if (typeof r === "string") {
                    if (status === "") {
                        status = "Error when parsing features - see browser console";
                    }
                    console.log(r);
                }
            });
            if (status !== "") {
                tier.updateStatus(status);
            }

            tier.subtiers[0] =
                { glyphs: results.glyphs.filter(r => typeof r !== "string"),
                  height: canvasHeight
                };
        }

        if (results.quant) {
            console.log(results.quant);
            tier.subtiers[0].quant = results.quant;
        }


        tier.glyphCacheOrigin = tier.browser.viewStart;
    };

    const drawTier = tier => {

        // if the source has a sub config, this track is treated as a subtrack
        if (typeof tier.dasSource.sub === "object") {
            let browser = tier.browser;

            let multiTier = browser.tiers.
                filter(t => t.dasSource.renderer === 'multi' &&
                       t.dasSource.multi.multi_id === tier.dasSource.sub.multi_id);

            multiTier.forEach(t => browser.refreshTier(t));
        } else {
            prepareSubtiers(tier);

            const ctx = tier.viewport.getContext("2d");
            const retina = tier.browser.retina && window.devicePixelRatio > 1;

            DefaultRenderer.prepareViewport(tier, ctx, retina);
            DefaultRenderer.paint(tier, ctx);

            tier.drawOverlay();
            tier.paintQuant();

            if (typeof(tier.dasSource.drawCallback) === "function") {
                tier.dasSource.drawCallback(ctx, tier);
            }

            tier.originHaxx = 0;
            tier.browser.arrangeTiers();
        }
    };

    const renderTier = (status, tier) => {
        drawTier(tier);
        tier.updateStatus(status);
    };

    return { prepareSubtiers: prepareSubtiers,
             drawTier: drawTier,
             renderTier: renderTier
           };
}
