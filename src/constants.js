import * as Terminal from 'javascript-terminal';
import { createOutputDiv } from './helpers';

export const viewRefs = {
    input: document.getElementById('input'),
    output: document.getElementById('output-wrapper')
};

export const outputToHTMLNode = {
    [Terminal.OutputType.TEXT_OUTPUT_TYPE]: content =>
      createOutputDiv('text-output', content),
    [Terminal.OutputType.TEXT_ERROR_OUTPUT_TYPE]: content =>
      createOutputDiv('error-output', content),
    [Terminal.OutputType.HEADER_OUTPUT_TYPE]: content =>
      createOutputDiv('header-output', `$ ${content.command}`)
};

export const questions = {
    matchDate: `Which day of the month did we match?`,
    myName: `What's my first name?`,
    favoriteColor: `Now a very hard question. What's my favorite color?`,
    love: `Type the command 'love' in`,
    more: `Type the command 'more' in`
};