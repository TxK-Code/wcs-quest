import axios from "axios";

export const LOAD_CHARACTERS = "LOAD_CHARACTERS";
export const ADD_CHARACTER = "ADD_CHARACTER";

// The method to get all the characters, this one call the backend then return the result
// in the redux store for display the list of characters
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

// Method to remove a character, it call the backend with a payload named "data"
// this payload is loaded with the ID of the character and send it to the backend
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

// This one is set to add a new character, it call the backend with a payload named "data"
// this payload is loaded with the new name of the character and send it to the backend
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

// This method is used to edit a character in the database, it call the backend with
// a payload "data" loaded with the ID of the one who's gonna be edited and the
// new name
export const editCharacters = (data) => {
  return () => {
    return axios
      .post("http://localhost:3004/api/editGuy", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("User Edited : ", res);
        if (res.status === 200) {
          console.log("Character Edited : ", res);
        }
        if (res.status === 204) {
          alert("Impossible d'éditer, nom déjà utilisé.");
        }
      })
      .catch((err) => alert("Changement Impossible."));
  };
};
