# martsyalis.github.io

Mock up for the financial planner progressive web app. The idea behind the app was a place to collect all info on one's spending and analyse it. The original Project involved ML analysis using tensorflow but there was no where near enough data points to produce any new analysis. I still found the App to be very helpfull in keeping track of my daily expenses, and seeing overall trends and predictions for my spending. I use it daily. 

### What worked: 
1. I found the addExpense tiles to be very easy and streightforward to use, ofcourse the availible categories where designed around me  but I could never make myself keep a record of anything at all until this app.
2. I think the Cards turned out to be a good design and engineering choice, they were pretty easy to refactor and add features too as they covered more and more components. 

### What needs to be added:
1. In future versions the tiles need to be customizable to individual user. the dificulty with that right now is that I can't think of the categories that others might need, And I can't offer user to name their own becausse icons are so crucial to the 'effortlessness' of adding a new expense 
2. More Data is needed for this, but where the Charts could really shine is in a multi month analysis. Until then I have no long term trends to analyse. Still it would be nice to come up with more data to show in Charts, if only to practice Data Visualisation which was one of the original goals of this project

### What needs to be changed:
1. In Monthly or Total expenses Charts, Rent takes up too much space. I am not sure how to handle it at this time, but potential solutions would be to move Rent to it's own category. On the other hand, Thematicly and logicly Rent belongs in Monthly Expenses, and perhaps the sqwished graph just tells me I should spend less on Rent... 
 
## Known Issues: 
1. service worker cashing is taking a long time on new releases of the app, subsequent reloads/visits after the update work as expected 

## To run localy:
1. Clone this repo into your computer
1. Run npm i to download all the dependencies. 
1. run npm start, the aplication will launch on localhost 3001

### [for a list of todos check Project tickets](https://github.com/Martsyalis/planner-mock-up/projects/1)
