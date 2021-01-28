import React, { useEffect } from "react";
import axios from "axios";
import store from "../Store/QuestionStore";
import * as actions from "../Reducer/actionsTypes";
import Loading from "./Loading";

const GetQuestions = ({ setIsLoading }) => {
  const getGeneralKnowledgeQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=9&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_GENERALKNOWLEDGE,
        payload: { arr: response.data.results },
      });
    });
  };

  const getSportQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=21&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_SPORTS,
        payload: { arr: response.data.results },
      });
    });
  };

  const getHistoryQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=23&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_HISTORY,
        payload: { arr: response.data.results },
      });
    });
  };

  const getGeographyQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=22&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_GEOGRAPHY,
        payload: { arr: response.data.results },
      });
    });
  };

  const getAnimalsQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=27&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_ANIMALS,
        payload: { arr: response.data.results },
      });
    });
  };

  const getFilmQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=11&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_FILM,
        payload: { arr: response.data.results },
      });
    });
  };

  const getMusicQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=12&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_MUSIC,
        payload: { arr: response.data.results },
      });
    });
  };

  const getBookQuestions = () => {
    const options = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=50&category=10&type=multiple",
    };
    axios(options).then((response) => {
      store.dispatch({
        type: actions.ADD_BOOK,
        payload: { arr: response.data.results },
      });
    });
  };

  const getAllQuestions = async () => {
    getGeneralKnowledgeQuestions();
    getSportQuestions();
    getHistoryQuestions();
    getGeographyQuestions();
    getAnimalsQuestions();
    getFilmQuestions();
    getMusicQuestions();
    getBookQuestions();
  };

  useEffect(() => {
    getAllQuestions();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return <Loading />;
};

export default GetQuestions;
