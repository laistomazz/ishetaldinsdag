import './normalize.css';
import './style.css';

import * as Terminal from 'javascript-terminal';
import { loveLetter } from './text';
import { viewRefs, questions } from './constants';
import {
    addKeyDownListener,
    scrollToPageEnd,
    displayOutputs,
    getInput,
    setInput,
    setCustomOutput,
    clearInput,
    isTuesday
} from './helpers';

let currentQuestion = questions.more;

const setCurrentQuestion = (question) => {
    currentQuestion = question;
    setCustomOutput(question);
}

const matchForCustomCommands = (command) => {
    if (currentQuestion === questions.more && (command == 'more')) {
        setCustomOutput(`Good boy 🫠 I can give you more, but first I need to confirm you are you.`);
        setCurrentQuestion(questions.matchDate);

        return true;
    }

    if (currentQuestion === questions.matchDate && (command == '28' || command == '28th')) {
        setCustomOutput(`That's right 🤩 What a lucky day!`);
        setCurrentQuestion(questions.myName);

        return true;
    }

    if (currentQuestion === questions.matchDate && (command == '29' || command == '29th')) {
        setCustomOutput(`Nope, you're thinking of the day we met, my love, try again`);
        setCurrentQuestion(currentQuestion);

        return true;
    }

    if (currentQuestion === questions.myName && (command == 'lais' || command == 'laís')) {
        setCustomOutput(`Wow, you remembered this time 🙃`);
        setCurrentQuestion(questions.favoriteColor);

        return true;
    }

    if (currentQuestion === questions.favoriteColor && command == 'black') {
        setCustomOutput(`Well done you! 🖤`);
        setCurrentQuestion(questions.love);

        return true;
    }

    if (command == 'love') {
        if (currentQuestion === questions.love) {
            console.log(loveLetter);
            setCustomOutput(`Take a peak into the console 😉`);
        } else {
            setCurrentQuestion(currentQuestion);
        }

        return true;
    }


    if (command === '') {
        setCurrentQuestion(currentQuestion);
        return true;
    }

    return false;
};
  

const initEmulator = () => {
  // Execution
  const emulator = new Terminal.Emulator();
  
  let emulatorState = Terminal.EmulatorState.createEmpty();
  const historyKeyboardPlugin = new Terminal.HistoryKeyboardPlugin(emulatorState);
  const plugins = [historyKeyboardPlugin]; 
  
  addKeyDownListener('Enter', viewRefs.input, () => {
    const commandStr = getInput();
    const isCustomCommand = matchForCustomCommands(commandStr.trim().toLowerCase());

    if (!isCustomCommand) {
        emulatorState = emulator.execute(emulatorState, commandStr, plugins);
        const outputs = emulatorState.getOutputs();
    
        displayOutputs(outputs);
    }
    
    scrollToPageEnd();
    clearInput();
  });
  
  addKeyDownListener('ArrowUp', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeUp());
  });
  
  addKeyDownListener('ArrowDown', viewRefs.input, () => {
    setInput(historyKeyboardPlugin.completeDown());
  });
  
  addKeyDownListener('Tab', viewRefs.input, () => {
    const autoCompletionStr = emulator.autocomplete(emulatorState, getInput());
    setInput(autoCompletionStr);
  });
}

const init = () => {
    initEmulator();
    setCustomOutput(`${isTuesday()}, but if you're Frank, you can type in 'more'`);
};

init();
