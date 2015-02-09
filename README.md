## Modified by Cameron Gillespie for Performance Optimization Assignment Project 4

### Critical Rendering Path
I was able to get a Google Page Speed Insight rating of 96/100 for the index.html :)
I used the Gulp task runner to enable automated performance tweaks including minifying css and html, uglifying javascript, inlining css and javascript, resizing and optimizing images.
Please check out gulpfile.js for more info on how I used Gulp.
/src contains the source files for the website, /build contains the gulp processed files for the website and are meant to be deployed to the production site, the index.html in /build is where Google PSI should be tested.

Helpful Links for CRP:
* [Google Developers Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
* [Gulp: Automate and Enhance your Workflow](http://gulpjs.com/)
* [Fuzzy Tolerance 32: Task Runners and Modern Workflows](http://fuzzytolerance.info/blog/2014/02/21/2014-02-21-fuzzy-tolerance-32-task-runners-and-modern-workflows/)
* [Mark Goodyear - Getting started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/)

### Pizza page rendering Scrolling Frames/Second and Pizza Resize time
This exercise was tricky, luckily others on Piazza asked the same questions i had and was able to tweak the performance based on their discussions and recommended links.
For scrolling FPS the key to enhancing this was to update the function called updatePositions(). updatePositions() is called by an event listener which runs every time the page is scrolled.  updatePosititions() contained a for loop where the scrollTop property was called for **every single moving pizza element on the page each time the page is scrolled**.  The scrollTop property call is easily moved outside this loop. I also removed the css property of width from the .mover selector in the css because this property triggers a paint event each time the page is scrolled, hence slowing the page down.  I was unable to achieve exactly 60 fps, but I came very close and drastically improved over the orginal state.

For the Pizza resize time the key was to move the 3 separate calls of .querySelectorAll() out of the for loop because it is expensive operation and doesn't need to be called at all within the loop.  .querySelectorAll() can be called before the loop and then each of the pizza elements resized within the loop.

Helpful links for Pizza Page Rendering
* [Paul Irish Why Moving Elements With Translate() Is Better Than Pos:abs Top/left](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)
* [Jankfree.org](http://jankfree.org/)
* [Addy Osmani Making a site Jank Free](http://addyosmani.com/blog/making-a-site-jank-free/)
