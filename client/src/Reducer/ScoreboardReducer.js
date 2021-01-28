import ScoreboardCollection from "../services/ScoreboardCollection";
import * as actions from "./scoreboardTypes";
import firebase from "firebase";
export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_TO_SCOREBOARD:
      ScoreboardCollection.doc(payload.nickname).set({
        nickname: payload.nickname,
        numofmatches: firebase.firestore.FieldValue.increment(1),
        sumpoints: firebase.firestore.FieldValue.increment(payload.points),
        wins: firebase.firestore.FieldValue.increment(payload.win),
      });

      const newState = [...state].map((user) =>
        user.nickname === payload.nickname
          ? {
              nickname: user.nickname,
              numofmatches: user.numofmatches + 1,
              sumpoints: user.sumpoints + payload.points,
              wins: user.wins + payload.win,
            }
          : user
      );
      return newState;
    case actions.GET_FROM_SCOREBOARD:
      return state;
    case actions.ALL_DATA:
      return action.payload.allData;
    default:
      return state;
  }
}
