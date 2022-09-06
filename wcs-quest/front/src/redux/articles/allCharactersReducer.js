import axios from "axios";

const INITIAL_STATE = {
  allCharacters: [],
};

function allCharactersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_CHARACTERS": {
      const newArrSec = [...state.allCharacters];
      newArrSec.unshift(action.payload);

      return {
        state,
        allCharacters: newArrSec,
      };
    }
  }

  return state;
}

export default allCharactersReducer;

export const addCharacters = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3004/api/addcharacters", data)
      .then((res) => {
        dispatch({ type: "ADD_CHARACTER", payload: res.data });
      })
      .catch((err) => alert("Error: " + err.message));
  };
};
