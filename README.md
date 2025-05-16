Note: I miss flash and the infinite free to play content the internet used to offer, this is (hopefully) one of many full free browser games that you'll be able to enjoy.
Disclaimer: for this reason, you can do what you want with this game/code. Please just offer all the content for free <3

# Interview with an Alien

Hi welcome to my project. I'll add documentation here to explain everything but as a general overview;

This project came to mind from playing around with CSS animations and creating a cool little crt monitor effect so here it is, the idea that came from it.

This project uses Zustand to keep logic together and Jest for unit testing to make sure I don't accidentally add content that can't be accessed

- Stack:
	- Vite React
	- TypeScript
	- Jest
	- Zustand
 	- Electron (for bundling at the end) 

- To come:
	- Saving/Loading
	- Evidence
	- Actual dialogue trees and story
	- Music? Maybe

# Tests
- Dialogue (and dialogue related)
	- Confirm all dialogueOptions have a "nextNode"
	- Confirm both dialogueOptions and dialogueText has "text"
	- Confirm all dialogueText has at least one choice (choices lead to the next dialogueOption)
	- Confirm all dialogueTexts are reachable from a dialogueOption
	- Confirm all dialogueOptions are reachable from a dialogueText
	- Confirm all words are seen at least once through a dialogueOption, evidence or puzzle
	- Confirm all evidence, if containing a meaning or text(s), contains both
	- Confirm all evidence is reachable
	- Confirm all puzzles are reachable

# Dev log:
- 16/05/25
	- Woke up to an email from a job I was very excited about, looks like there's still going to be a lot more time to make this
	- Added first "real" evidence
	- Added talking animation

- 15/05/25
	- Starting work on the alien today, got some blinking in place (TODO: get proper eyelids), next step is to look into talking animations for different emotions, as well as just the different emotions
	- Day wasn't quite as productive as I would have liked, but the eyelids are sorted and I have the mouth movements ready to go
	- Added the new alien PSD so I don't lose it

- 14/05/25 (happy 1 week!):
	- One week on this, today I'd like to finish the UI. I've started with cleaning up a few of the ts errors
	- Finish bottom panel beta UI, need to figure out how to deal with these icons as the selects are a bit too big
	- It also seems that multi line chat messages do not come through very nicely, potentially could fix with scroll bar but sorting these icons out might resolve a lot everything
	- Electron setup for npm run build -> npm run dist, will need to look up grabbing the window options from within the app
	- Changed the word images, seemed to help a lot
	- No more directly mapping document names so they update along with the rest of the UI like words
	- Smaller components
	- Added orderFound to words to work better with;
	- Added dictionary and options button
	- Realised there was some crazy padding going on and regained 20% of the screen space

- 13/05/2025:
	- Documents select and edit added
	- Icons added
	- I really like the alien, but the chat history and evidence window would probably enjoy that space a bit more hmm..
	- Two Hours Later; Update, the alien is gone
	- Update chat messages to help display a bit better on smaller resolutions
	- Give the chat box the majority of the space gained by removing the alien
	- Readd alien, I'm sorry
	- Resolved evidence layout issue

- 12/05/2025:
	- Quite a few changes coming in today already, scrollbars and scroll added
	- Evidence screen and evidence select working
	- Evidence now recognises it's been found, opened and can deliver words to the player
	- Few issues with the layout of evidence but it's functional for now (TODO: Sort this out)
	- Update testing symbols
	- Input component added (TODO: clips a bit on multirow messages)
	- EVIDENCE from here on out is displayed on the UI as "DOCUMENT"
	- QoL chat message updates to make tracking documents easier
	- Evidence (document) type updated to allow for custom names and descriptions

- 11/05/2025:
	- Beta UI start
	- Starting to get things ready for messages; message class, chat icons
   	- Create chat history, add chat icons
   	- Recognise evidence being added
   	- Add user translations
   	- Add symbol mapping function
   	- Add ability to edit translations

- 10/05/2025:
	- Update tests, not really sure what those original ones were trying to accomplish
	- Add the last tests for dialogueTrees
	- Add evidence, add puzzles, add testing. This should be all dialogue specific testing

- 09/05/2025:
	- Added Zustand to keep logic contained and easily accessible if the project grows
	- Added Jest for testing to make sure the game remains playable after adding content

- 08/05/2025:
	- Created system logic for handling dialogue trees, found words and verifying choices

- 07/05/2025:
	- Started project
	- Temporary pictures, words, dialogue trees
