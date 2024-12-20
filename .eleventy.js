const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
    // Konfiguracja
    eleventyConfig.addPassthroughCopy("src/assets/css"); 
    eleventyConfig.addPassthroughCopy("src/assets/js"); 
    eleventyConfig.addPassthroughCopy("src/assets/img"); 
    eleventyConfig.addPassthroughCopy("src/assets/fonts"); 
    eleventyConfig.addPassthroughCopy("src/content/posts/img"); 
    eleventyConfig.addPassthroughCopy("src/content/works/img"); 
    eleventyConfig.addWatchTarget("src/assets/sass");

    // Collection blog
    eleventyConfig.addCollection('posts', function(collectionApi) {
        return collectionApi.getFilteredByGlob('src/content/posts/**/*.md').reverse();
      });

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


    eleventyConfig.addNunjucksAsyncShortcode('Image', async (src, alt) => {
      if (!alt) {
        throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }
    
      let stats = await Image(src, {
        widths: [25, 320, 640, 960, 1200],
        formats: ['jpeg', 'webp'],
        urlPath: '/assets/img/',
        outputDir: './public/assets/img/',
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
    

    eleventyConfig.addNunjucksAsyncShortcode('workImage', async (src, alt) => {
      if (!alt) {
          throw new Error(`Missing \`alt\` on myImage from: ${src}`);
      }
  
      let stats = await Image(src, {
          widths: [320, 640, 960, 1200],
          formats: ['jpeg', 'webp'],
          urlPath: '/content/works/img/',
          outputDir: './public/content/works/img/',
      });
  
      const srcset = Object.keys(stats).reduce(
          (acc, format) => ({
              ...acc,
              [format]: stats[format].map(image => `${image.url} ${image.width}w`).join(', '),
          }),
          {}
      );
  
      const source = `<source type="image/webp" srcset="${srcset['webp']}" sizes="(min-width: 1024px) 1024px, 100vw">`;
  
      const img = `<img
          loading="lazy"
          alt="${alt}"
          src="${stats['jpeg'][0].url}"
          sizes="(min-width: 1024px) 1024px, 100vw"
          srcset="${srcset['jpeg']}"
          width="${stats['jpeg'][0].width}"
          height="${stats['jpeg'][0].height}">`;
  
      return `<div class="image-wrapper blur-load">
          <picture> ${source} ${img} </picture></div>`;
    });
  

    eleventyConfig.addNunjucksAsyncShortcode('postImage', async (src, alt) => {
        if (!alt) {
          throw new Error(`Missing \`alt\` on myImage from: ${src}`);
        }
    
        let stats = await Image(src, {
          widths: [25, 320, 640, 960, 1200],
          formats: ['jpeg', 'webp'],
          urlPath: '/content/posts/img/',
          outputDir: './public/content/posts/img/',
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
