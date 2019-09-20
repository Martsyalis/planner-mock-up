# [Planer](https://money-planner-mock.netlify.com)
Mockup for the financial planner PWA. As I got more bank accounts. To solve this I wanted to create a centralized place for all my financial expenses. I set out to create an app that would be extreamly easy to use, while still providing financial insights and
self accountability. I found the app to be very helpful in keeping track of my daily and monthly expenses, and seeing overall trends and predictions for my spending. Over the first month, it cut my expenses by third. Turns out that $4 coffees, and 3 dollar snacks add up very quickly.


### What worked: 
1. If user is going to use this app to track every purchase, it must be really easy and quick to use. I think Add Expense page achives that goal rather well. THe expense tiles make it quick to pick a category for users expense. Once the user picks the tile, the enire screen becomes one numeric input line with a native NuPad. As a result user needs only 3 clicks to enter a new expense

2. PWA adds inteligent cashing, offline capabilities, and an option to download and use the app as native on mobile device. This makes it much more practical for everyday, 'on the go' use. When using Android OS, which allows PWA to behave like native app from the app store, This adds a lot of utility and ease to User Expirience

### What needs to be added:
1. In future versions, the tiles need to be customizable to an individual user. the difficulty with that right now is that I can't think of the categories that others might need, And I can't offer user to name their own because icons are so crucial to the 'effortlessness' of adding a new expense

2. More Data is needed for this, but where the Charts could really shine is in a multi-month analysis. Until then I have no long term trends to analyze. Still, it would be nice to come up with more data to show in Charts, if only to practice Data Visualisation which was one of the original goals of this project

### What needs to be changed:
1. "Rent takes too much space in Charts. One potential solution would be to move it to its own category. But thematicly and logically rent belong in monthly expenses. And refactoring would mean changing existing user Data. This once again reinforced just how crusial it is to get data schemas and overall structure right, because once the app.

2. As mentioned before PWA is a great tool for android mobile apps. However I don't have enough expirience with the technology to make sure the cashing follows best practices and logic. Moreover, downloading the app on the device from the webpage is still not supported on iOS, so the app produces significantly different user expirience depending on OS.
 
## Known Issues: 
1. service worker cashing is taking a long time on new releases of the app, subsequent reloads/visits after the update work as expected 

## To run localy:
1. Clone this repo into your computer
1. Run npm i to download all the dependencies. 
1. run npm start, the aplication will launch on localhost 3001

### [for a list of todos check Project tickets](https://github.com/Martsyalis/planner-mock-up/projects/1)
