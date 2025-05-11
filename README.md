# Language Game (Real name coming at some point)

Hi welcome to my project. I'll add documentation here to explain everything but as a general overview;

This project came to mind from playing around with CSS animations and creating a cool little crt monitor effect so here it is, the idea that came from it.

This project uses Zustand to keep logic together and Jest for unit testing to make sure I don't accidentally add content that can't be accessed

- Stack:
	- Vite React
	- TypeScript
	- Jest
	- Zustand

- To come:
	- Basic UI art
	- Replace human words with language symbols
	- Add space for the player to write their interpretation about each symbol
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
- 10/08/2025:
	- Beta UI start
	- Starting to get things ready for messages; message class, chat icons
   	- Create chat history, add chat icons
   	- Recognise evidence being added

- 10/07/2025:
	- Update tests, not really sure what those original ones were trying to accomplish
	- Add the last tests for dialogueTrees (TODO: Add evidence and puzzles to the tests once added)
	- Add evidence, add puzzles, add testing. This should be all dialogue specific testing

- 09/07/2025:
	- Added Zustand to keep logic contained and easily accessible if the project grows
	- Added Jest for testing to make sure the game remains playable after adding content

- 08/07/2025:
	- Created system logic for handling dialogue trees, found words and verifying choices

- 07/05/2025:
	- Started project
	- Temporary pictures, words, dialogue trees
