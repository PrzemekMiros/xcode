const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    // Konfiguracja
    eleventyConfig.addPassthroughCopy("src/assets/css"); 
    eleventyConfig.addPassthroughCopy("src/assets/js"); 
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addPassthroughCopy("src/content/works/img"); 
    eleventyConfig.addWatchTarget("src/assets/sass");
    
        // Collections portfolio
        eleventyConfig.addCollection('works', (collection) => {
            const works = collection.getFilteredByGlob('src/content/works/**/*.md').reverse();
              return works.sort((a, b) => {
                const orderA = a.data.order || 0; // Ustawiamy domyślną wartość na wypadek braku pola order
                const orderB = b.data.order || 0;
                return orderA - orderB;
              });
            });

    // Shortcode date
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addNunjucksAsyncShortcode('workImage', async (src, alt) => {
        if (!alt) {
          throw new Error(`Missing \`alt\` on myImage from: ${src}`);
        }
      
        let stats = await Image(src, {
          widths: [25, 320, 640, 960, 1200, 1800 ],
          formats: ['jpeg', 'webp'],
          urlPath: '/content/works/img/',
          outputDir: './public/content/works/img/',
        });
    
        let lowestSrc = stats['jpeg'][0];
        let largestSrc = stats['jpeg'][2];
    
        const srcset = Object.keys(stats).reduce(
          (acc, format) => ({
            ...acc,
            [format]: stats[format].reduce(
              (_acc, curr) => `${_acc} ${curr.srcset} ,`,
              '',
            ),
          }),
          {},
        ); 
    
        const source = `<source type="image/webp" srcset="${srcset['webp']}" >`;
    
        const img = `<img
          loading="lazy"
          alt="${alt}"
          src="${lowestSrc.url}"
          sizes='(min-width: 1024px) 1024px, 100vw'
          srcset="${srcset['jpeg']}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}">`;
    
          return `<div class="image-wrapper blur-load" >
            <img class="placeholder" src="${lowestSrc.url}" loading="lazy" alt="Placeholder" width="${largestSrc.width}" height="${largestSrc.height}"><picture> ${source} ${img} </picture></div>`;
      });
      
    
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "includes",
            data: "data"
        }
    };
};
