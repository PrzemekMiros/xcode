
module.exports = function(eleventyConfig) {
    // Konfiguracja
    eleventyConfig.addPassthroughCopy("src/assets/css"); 
    eleventyConfig.addPassthroughCopy("src/assets/js"); 
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addWatchTarget("src/assets/sass");
    
    // Collections blog
    eleventyConfig.addCollection('posts', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/posts/**/*.md').reverse();
    });

    // Shortcode date
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "includes",
            data: "data"
        }
    };
};
