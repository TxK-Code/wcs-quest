import axios from "axios";

export const LOAD_CHARACTERS = "LOAD_CHARACTERS";
export const ADD_CHARACTER = "ADD_CHARACTER";

export const getCharacters = () => {
  return (dispatch) => {
    return axios
      .get("http://localhost:3004/api/getCharacters")
      .then((res) => {
        dispatch({
          type: LOAD_CHARACTERS,
          payload: res.data,
        });
      })
      .catch((err) => alert("Chargement des personnages impossible."));
  };
};

export const delCharacters = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3004/api/delGuy", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("User Deleted");
      })
      .catch((err) => alert("Chargement des personnages impossible."));
  };
};

export const addCharacters = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3004/api/addNewGuy", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_CHARACTER,
            payload: res.data,
          });
        }
        if (res.status === 204) {
          alert(`L'argonaute existe déjà dans la DB :)`);
        }
      })
      .catch((err) => alert("Ajout du personnage impossible."));
  };
};

export const editCharacters = (data) => {
  return () => {
    return axios
      .post("http://localhost:3004/api/editGuy", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("User Edited : ", res.data);
      })
      .catch((err) => alert("Changement Impossible."));
  };
};
