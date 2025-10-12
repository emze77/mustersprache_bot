import patterns from "./patterns.js";
import { isDatabankEmpty, actualizeDatabank, parseArray } from "./handleDB.js";
console.log("compose.js loaded!");

const TOOT_MAX_LENGTH = 5000; //climatejustice.social configuration

let leftPatterns;
let nextPatternNumber;
let composedExamples;
let possibleQuote;
let nextPattern;
let OverflowAlarmLevel = 0;
let patternTooLong = false;
let nextTootLength = 0;
let tootParams;
let selectedQuestion;
let composedHashtags

const openQuestions = [
  "Welche Beispiele kennst du?",
  "Kennst du dieses Muster aus deinem Leben?",
  "Was sind deine Gedanken dazu?",
];

const createNextToot = () => {
  if (isDatabankEmpty()) {
    actualizeDatabank(patterns);
    console.log("All patterns loaded to db");
  }

  selectRandomPattern();
  composeExamples();
  composeQuote();
  composeQuestion();
  composeHashtags();
  composeToToot();
  checkTootLength();
  removeUsedPattern();

  if (patternTooLong) {
    resetStates();
    createNextToot();
  }

  resetStates();

  return tootParams;
};

const selectRandomPattern = () => {
  leftPatterns = parseArray();

  nextPatternNumber = Math.floor(Math.random() * leftPatterns.length);
  nextPattern = leftPatterns[nextPatternNumber];

  console.log(
    `Next Pattern is '${nextPattern.title}' (Nr. ${nextPatternNumber} in Array).`
  );
};

const composeExamples = () => {
  composedExamples = "";
  for (let i = 0; i < nextPattern.examples.length - OverflowAlarmLevel; i++) {
    composedExamples += `👉 ${nextPattern.examples[i]}\n`;
  }
};

const composeQuote = () => {
  if (nextPattern.quote !== "") {
    possibleQuote = `\n\n🗿 »${nextPattern.quote}«`;
  } else {
    possibleQuote = "";
  }
};

const composeQuestion = () => {
  selectedQuestion = openQuestions[Math.floor(Math.random() * openQuestions.length)]
}

const composeHashtags = () => {
  composedHashtags = `#commons #commoning ${nextPattern.specialHashtags}`;
}

const composeToToot = () => {
  tootParams = {
    privacy: "public",
    spoiler_text: nextPattern.title.toUpperCase(),
    status: `❓ ${nextPattern.problem}\n\n❕${nextPattern.solution}${possibleQuote}\n\n${composedExamples}\n\n${selectedQuestion}\n\n${composedHashtags}`,
    sensitive: false,
    language: "de",
  };
};



const checkTootLength = () => {
  nextTootLength = tootParams.spoiler_text.length + tootParams.status.length;
  console.log(`Next toot length: ${nextTootLength} chars`);

  while (nextTootLength > TOOT_MAX_LENGTH) {
    console.log(
      `Next toot is too long (${nextTootLength}). Reducing one example.`
    );
    OverflowAlarmLevel++;
    composeExamples();
    composeToToot();
    nextTootLength = tootParams.spoiler_text.length + tootParams.status.length;

    if (OverflowAlarmLevel === nextPattern.examples.length) {
      console.log("The pattern is still too long, even with no examples!");
      patternTooLong = true;
      break;
    }
  }
};

const removeUsedPattern = () => {
  leftPatterns.splice(nextPatternNumber, 1);
  actualizeDatabank(leftPatterns);
  console.log(`There are ${leftPatterns.length} patterns left until reset.`);
};

const resetStates = () => {
  OverflowAlarmLevel = 0;
  patternTooLong = false;
};

// createNextToot();

export { createNextToot, nextPattern };
