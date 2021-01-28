import { createStore } from "redux";
import reducer from "../Reducer/ScoreboardReducer";

const store = createStore(reducer);

export default store;
