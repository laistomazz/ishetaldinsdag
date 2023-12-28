import { viewRefs, outputToHTMLNode } from './constants';

export const addKeyDownListener = (eventKey, target, onKeyDown) => {
    target.addEventListener('keydown', e => {
        if (e.key === eventKey) {
            onKeyDown();
  
            e.preventDefault();
        }
    });
};

export const scrollToPageEnd = () => {
    window.scrollTo(0, document.body.scrollHeight);
};

export const createOutputDiv = (className, textContent) => {
    const div = document.createElement('div');
  
    div.className = className;
    div.appendChild(document.createTextNode(textContent));
  
    return div;
};

export const displayOutputs = (outputs) => {
    viewRefs.output.innerHTML = '';
  
    const outputNodes = outputs.map(output =>
      outputToHTMLNode[output.type](output.content)
    );
  
    for (const outputNode of outputNodes) {
        viewRefs.output.append(outputNode);
    }
};

export const getInput = () => viewRefs.input.value;
  
export const setInput = (input) => {
    viewRefs.input.value = input;
};

export const setCustomOutput = (output) => {
    viewRefs.output.append(createOutputDiv('header-output', `$ ${output}`));
};

export const clearInput = () => {
    setInput('');
};

export const isTuesday = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 2) {
        return `Turns out it's a Tuesday`;
    }
    
    return `Today is not a Tuesday`;
}