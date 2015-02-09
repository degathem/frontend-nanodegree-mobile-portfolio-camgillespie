## Modified by Cameron Gillespie for Performance Optimization Assignment Project 4

### Critical Rendering Path
I was able to get a Google Page Speed Insight rating of 96/100 for the index.html :)
I used the Gulp task runner to enable automated performance tweaks including minifying css and html, uglifying javascript, inlining css and javascript, resizing and optimizing images.
Please check out gulpfile.js for more info on how I used Gulp.
/src contains the source files for the website, /build contains the gulp processed files for the website and are meant to be deployed to the production site, the index.html in /build is where Google PSI should be tested.

Helpful Links for CRP:
*[Google Developers Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
*[Gulp: Automate and Enhance your Workflow](http://gulpjs.com/)
*[Fuzzy Tolerance 32: Task Runners and Modern Workflows](http://fuzzytolerance.info/blog/2014/02/21/2014-02-21-fuzzy-tolerance-32-task-runners-and-modern-workflows/)
*[Mark Goodyear - Getting started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/)

### Pizza page rendering Scrolling Frames/Second and Pizza Resize time
This exercise was tricky, luckily others on Piazza asked the same questions i had and was able to tweak the performance based on their discussions and recommended links.
For scrolling FPS the key to enhancing this was to update the function called updatePositions(). updatePositions() is called by an event listener which runs every time the page is scrolled.  updatePosititions() contained a for loop where the scrollTop property was called for **every single moving pizza element on the page each time the page is scrolled**.  The scrollTop property call is easily moved outside this loop. I also removed the css property of width from the .mover selector in the css because this property triggers a paint event each time the page is scrolled, hence slowing the page down.  I was unable to achieve exactly 60 fps, but I came very close and drastically improved over the orginal state.

For the Pizza resize time the key was to move the 3 separate calls of .querySelectorAll() out of the for loop because it is expensive operation and doesn't need to be called at all within the loop.  .querySelectorAll() can be called before the loop and then each of the pizza elements resized within the loop.

Helpful links for Pizza Page Rendering
*[Paul Irish Why Moving Elements With Translate() Is Better Than Pos:abs Top/left](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)
*[Jankfree.org](http://jankfree.org/)
*[Addy Osmani Making a site Jank Free](http://addyosmani.com/blog/making-a-site-jank-free/)

## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
