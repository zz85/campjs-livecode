# Simple Live Coding Editor

On the flight to Melbourne for CampJS, I was thinking how I would be able to live code and show some examples for my talk on particles. So that's how yet another live coding editor came about. It's nothing really groundbreaking, but I just wanted it to be something I'm comfortable with.

## Under the hood
I use some hardcoded CSS to split the screen into two - code on the left, preview on the right. That is one layout that works well with me, but someday I should allow code/preview on the top/bottom.

I use CodeMirror for syntax highlighting. ACE editor and Orion are popular alternatives, but I'm more familiar with CodeMirror besides the fact that I had it offline on the plane. Sometime later I should want to customize it such that it feels as good as using SublimeText.

I use acorn (the smaller version of esprima) for Javascript syntax checking. Great for checking errors quickly as you type.

I thought of different approaches to allow hot code reloading. For the purposes of what I needed to demostrate, re-running the entire script works fine. This is done by killing the old live preview iframe, creating a new one, inserting some html boilerplate and injecting the script within the html. I think its possible to hot reload functions the way LightTable IDE does it. Again, another day maybe.

Sometimes I prefer hot-reloading as I type, but not this time. I bind the keys Cmd-Enter to run/reload the script. This editor is simple in the sense that it exposes the JS editor only. Although this forces you to use JavaScript, you are free to add and manipulate the dom and css with JS. This is nice in some ways, I find JS only code more portable, and such code can easily be embedable in different webpages on ran in "about:blank".

There are 2 dropdown where one is for loading examples, and another is for inserting presets like macros. This probably wasn't very well thought out but useful only for my intended demostration. Lastly, I added some localStorage support so whatever code you've worked on stays, in case you accidently hit back, reload or just in case of some crash. There is currently no other server side components (apart from a web server) or saving mechanism, right now I do some copy pasting into sublime for saving.

Feel free to contact me on twitter [@blurspline](https://twitter.com/blurspline) if you've got comments or suggestions.

In case you are interested with other tools that does hot-reloading with JS, checkout
- jsbin, jsfiddle, codepen
- chrome dev tools
- lighttable ide