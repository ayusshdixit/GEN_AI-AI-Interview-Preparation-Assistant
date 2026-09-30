const { join } = require("path")

/**
 * Store Chrome inside the project so it survives from build to runtime on hosts like Render.
 */
module.exports = {
    cacheDirectory: join(__dirname, ".cache", "puppeteer"),
}
