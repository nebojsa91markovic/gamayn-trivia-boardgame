let questions = [];

const ADD_QUESTIONS = (q) => {
  q.forEach((question) => {
    questions.push(question);
  });
};

const getQ = () => {
  return questions;
};

const getQuestionFor = (type) => {
  console.log(questions);
  const allQA = questions.filter((elem) => elem.type === type)[0].qa;
  return allQA;
};

const sortAnswers = (single) => {
  let allAnswers = [{ answer: single.correct_answer, isTrue: true }];
  single.length !== 0 &&
    single.incorrect_answers.forEach((element) => {
      allAnswers.push({ answer: element, isTrue: false });
    });
  const randomAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return randomAnswers;
};

const singleQA = (category, diff) => {
  const arr = getQuestionFor(category);

  const arrForDiff = arr.filter((question) => question.difficulty === diff);

  const single = arrForDiff[Math.floor(Math.random() * arrForDiff.length)];
  const randomAnswers = sortAnswers(single);
  return { single, randomAnswers };
};

module.exports = {
  ADD_QUESTIONS,
  singleQA,
};
