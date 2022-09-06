import axios from "axios";

const INITIAL_STATE = {
  characters: [],
};

function charactersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_CHARACTER":
      const newArr = [...state.characters];
      newArr.unshift(action.payload);

      return {
        ...state,
        characters: newArr,
      };
  }

  return state;
}

export default charactersReducer;

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
