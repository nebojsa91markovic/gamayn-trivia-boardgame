import { createStore } from "redux";
import reducer from "../Reducer/QuestionsReducer";

const store = createStore(reducer);

export default store;
