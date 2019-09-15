# martsyalis.github.io

Mockup for the financial planner progressive web app. The idea behind the app was a place to collect all info on one's spending and analyze it. The original Project involved ML analysis using TensorFlow but there was nowhere near enough data points to produce any new analysis. I still found the app to be very helpful in keeping track of my daily expenses, and seeing overall trends and predictions for my spending. I use it daily.


### What worked: 
1. I found the addExpense tiles to be very easy and straightforward to use, of course, the available categories were designed around me, but I could never make myself keep a record of anything at all until this app.

2. I think the Cards turned out to be a good design and engineering choice, they were pretty easy to refactor and add features too as they covered more and more components.

### What needs to be added:
1. In future versions, the tiles need to be customizable to an individual user. the difficulty with that right now is that I can't think of the categories that others might need, And I can't offer user to name their own because icons are so crucial to the 'effortlessness' of adding a new expense

2. More Data is needed for this, but where the Charts could really shine is in a multi-month analysis. Until then I have no long term trends to analyze. Still, it would be nice to come up with more data to show in Charts, if only to practice Data Visualisation which was one of the original goals of this project

### What needs to be changed:
1. In Monthly or Total expenses Charts, Rent takes up too much space. I am not sure how to handle it at this time, but potential solutions would be to move Rent to its own category. On the other hand, Thematicly and logically Rent belong in Monthly Expenses, and perhaps the squished graph just tells me I should spend less on Rent...

2. PWA aspect of the app certainly makes it much easier to use on a daily bases and this app simply wouldn't be usable without it, but My cashing technique is inefficient and probably buggy. The only diagnostic tool that I have for PWA, which is google's Lighthouse, shows near 100% ratings. But personally, Everytime the app is updated and the new version has to be loaded, the cashing takes a good 6-7 seconds which feels excruciatingly slow. Half the time I close down the app entirely and re-open it out of impatience. The solution might be to simply let user know whats happening by displaying 'Updating' Messege. But Im a little worried about messing with Service Worker any more then I already have. 
 
## Known Issues: 
1. service worker cashing is taking a long time on new releases of the app, subsequent reloads/visits after the update work as expected 

## To run localy:
1. Clone this repo into your computer
1. Run npm i to download all the dependencies. 
1. run npm start, the aplication will launch on localhost 3001

### [for a list of todos check Project tickets](https://github.com/Martsyalis/planner-mock-up/projects/1)
