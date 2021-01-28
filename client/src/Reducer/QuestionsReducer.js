import * as actions from "./actionsTypes";

const initialQuestion = {
  category: actions.ADD_GENERALKNOWLEDGE,
  difficulty: "easy",
  question: "What is Pikachu&#039;s National Pok&eacute;Dex Number?",
  correct_answer: "#025",
  incorrect_answers: ["#001", "#031", "#109"],
};

const initialState = [
  { type: "GeneralKnowledge", qa: [initialQuestion] },
  { type: "Sports", qa: [] },
  { type: "History", qa: [] },
  { type: "Geography", qa: [] },
  { type: "Animals", qa: [] },
  { type: "Film", qa: [] },
  { type: "Music", qa: [] },
  { type: "Book", qa: [] },
];

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_GENERALKNOWLEDGE:
      return [...state].map((q) =>
        q.type === actions.ADD_GENERALKNOWLEDGE ? { type, qa: payload.arr } : q
      );

    case actions.ADD_SPORTS:
      return [...state].map((q) =>
        q.type === actions.ADD_SPORTS ? { type, qa: payload.arr } : q
      );

    case actions.ADD_HISTORY:
      return [...state].map((q) =>
        q.type === actions.ADD_HISTORY ? { type, qa: payload.arr } : q
      );

    case actions.ADD_GEOGRAPHY:
      return [...state].map((q) =>
        q.type === actions.ADD_GEOGRAPHY ? { type, qa: payload.arr } : q
      );

    case actions.ADD_ANIMALS:
      return [...state].map((q) =>
        q.type === actions.ADD_ANIMALS ? { type, qa: payload.arr } : q
      );

    case actions.ADD_FILM:
      return [...state].map((q) =>
        q.type === actions.ADD_FILM ? { type, qa: payload.arr } : q
      );

    case actions.ADD_MUSIC:
      return [...state].map((q) =>
        q.type === actions.ADD_MUSIC ? { type, qa: payload.arr } : q
      );

    case actions.ADD_BOOK:
      return [...state].map((q) =>
        q.type === actions.ADD_BOOK ? { type, qa: payload.arr } : q
      );

    default:
      return [...state];
  }
}
