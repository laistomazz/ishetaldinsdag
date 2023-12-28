import './normalize.css';
import './style.css';

import * as Terminal from 'javascript-terminal';

const addKeyDownListener = (eventKey, target, onKeyDown) => {
    target.addEventListener('keydown', e => {
      if (e.key === eventKey) {
        onKeyDown();
  
        e.preventDefault();
      }
    });
  };
  
  const scrollToPageEnd = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  
  // User interface
  const viewRefs = {
    input: document.getElementById('input'),
    output: document.getElementById('output-wrapper')
  };
  
  const createOutputDiv = (className, textContent) => {
    const div = document.createElement('div');
  
    div.className = className;
    div.appendChild(document.createTextNode(textContent));
  
    return div;
  };
  
  const outputToHTMLNode = {
    [Terminal.OutputType.TEXT_OUTPUT_TYPE]: content =>
      createOutputDiv('text-output', content),
    [Terminal.OutputType.TEXT_ERROR_OUTPUT_TYPE]: content =>
      createOutputDiv('error-output', content),
    [Terminal.OutputType.HEADER_OUTPUT_TYPE]: content =>
      createOutputDiv('header-output', `$ ${content.command}`)
  };
  
  const displayOutputs = (outputs) => {
    viewRefs.output.innerHTML = '';
  
    const outputNodes = outputs.map(output =>
      outputToHTMLNode[output.type](output.content)
    );
  
    for (const outputNode of outputNodes) {
        viewRefs.output.append(outputNode);
    }
  };
  
  const getInput = () => viewRefs.input.value;
  
  const setInput = (input) => {
    viewRefs.input.value = input;
  };

  const setCustomOutput = (output) => {
    viewRefs.output.append(createOutputDiv('header-output', `$ ${output}`));
  };

  const setCurrentQuestion = (question) => {
    currentQuestion = question;
    setCustomOutput(question);
  }
  
  const clearInput = () => {
    setInput('');
  };
  
  // Execution
  const emulator = new Terminal.Emulator();
  
  let emulatorState = Terminal.EmulatorState.createEmpty();
  const historyKeyboardPlugin = new Terminal.HistoryKeyboardPlugin(emulatorState);
  const plugins = [historyKeyboardPlugin];

  
  const questions = {
      matchDate: `Which day of the month did we match?`,
      myName: `What's my first name?`,
      favoriteColor: `Now a very hard question. What's my favorite color?`,
      love: `Type the command 'love' in`
    };
  
  let currentQuestion = questions.matchDate;

  const matchForCustomCommands = (command) => {
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
            const currentDate = new Date();
            const dayOfWeek = currentDate.getDay();
            let result;

            if (dayOfWeek === 2) {
                result = `Turns out it's a Tuesday!`;
            } else {
                result = `Today is not a Tuesday.`;
            }

            setCustomOutput(`${result} love result`);
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

const init = () => {
    setCustomOutput('Hi Frank, I need to confirm you are you');
    setCurrentQuestion(currentQuestion);
};

init();
