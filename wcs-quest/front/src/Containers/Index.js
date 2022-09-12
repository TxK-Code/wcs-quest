import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import EditLogo from "../Sass/Icones/pen-to-square-solid.svg";
import DeleteLogo from "../Sass/Icones/trash-solid.svg";

import {
  addCharacters,
  getCharacters,
  delCharacters,
  editCharacters,
} from "../redux/actions/post.action";

import "../Sass/Index.scss";

export default function Index() {
  // Used to get the character list from the redux store
  const { allCharacters } = useSelector((state) => ({
    ...state.allCharactersReducer,
  }));

  // numberCharacters is set to refresh the state after adding a new character
  const [numberCharacters, setNumberCharacters] = useState(0);
  // modal is set to open the modal and get the id of one item to edit
  const [modal, setModale] = useState({
    isTrue: false,
    id: "",
  });

  // newArgo and editNewName is used to create and update a character
  const [newArgo, setNewArgo] = useState({
    name: "",
  });
  const [editNewName, setEditNewName] = useState();

  // This useEffect is used to cold-refresh the main page
  useEffect(() => {
    if (allCharacters.length === 0) {
      dispatch(getCharacters());
    }
    if (allCharacters[0] && allCharacters[0].length !== numberCharacters) {
      dispatch(getCharacters());
      setNumberCharacters(allCharacters[0].length);
    }
    if (allCharacters[0]) {
      console.log(allCharacters[0].length, numberCharacters, "Id");
    }
  });

  // This one is set to check the syntax of the name added
  const newNameValidate = (e) => {
    const re = {
      full: /^[a-zA-Z]+$/,
    };
    return re.full.test(e.name);
  };

  // saveNewArgonaute and saveEditArgonaute catch the input target
  const saveNewArgonaute = (e) => {
    setNewArgo({
      name: e.target.value,
    });
  };
  const saveEditArgonaute = (e) => {
    setEditNewName({
      name: e.target.value,
    });
  };

  const dispatch = useDispatch();

  // olaComment check the syntax of a new character, then add him to the Db with a dispatch,
  // then add +1 to numberCharacters for refreshing
  const olaComment = (e) => {
    if (newNameValidate(e) === true) {
      dispatch(addCharacters(e));
      document.getElementById("name").value = "";
      dispatch(getCharacters());
      setNumberCharacters(numberCharacters + 1);
    } else {
      alert("Nom invalide, il ne doit contenir que des lettres.");
    }
  };

  // removeGuy delete a character from DB and then make a hard refresh
  const removeGuy = (e) => {
    dispatch(delCharacters(e));
    document.location.reload();
  };

  // editGuy open the modal by adding true to is param and add the id of the item
  const editGuy = (e) => {
    setModale({
      isTrue: true,
      id: e.idcharactersnames,
    });
  };

  // This is the payload to send to the backend
  const dataToEdit = {
    nom: editNewName,
    id: modal.id,
  };

  // sendEdited is same as olaComment but for editing, it check the syntax of the new name
  // then send it to the backend and close the modal
  const sendEdited = (e) => {
    e.preventDefault();
    if (newNameValidate(dataToEdit.nom) === true) {
      dispatch(editCharacters(dataToEdit));
      setNumberCharacters(numberCharacters + 1);
      setModale({
        isTrue: false,
      });
    } else {
      alert("Le nom ne doit contenir que des lettres.");
    }
  };

  // This is the dispatch that commit the new character to the backend,
  // the preventDefault is here to stop the refreshing action after sending a form
  const noReload = (e) => {
    e.preventDefault();
    olaComment(newArgo);
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
            className="header__img"
          />
          Les Argonautes
        </h1>
      </header>

      <main className="main">
        <h2>Ajouter un(e) Argonaute</h2>
        <form
          className="new-member-form"
          encType="text/plain"
          onSubmit={(e) => noReload(e)}
        >
          <label htmlFor="name">Nom de l&apos;Argonaute</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Charalampos"
            onInput={(e) => saveNewArgonaute(e)}
          />
          <button type="submit">Envoyer</button>
        </form>

        <h2>Membres de l'équipage</h2>
        <section className="member-list">
          {allCharacters[0]
            ? allCharacters[0].map((item) => {
                const itemNameToDisplay = item.charactername;
                const upperName =
                  itemNameToDisplay.charAt(0).toUpperCase() +
                  itemNameToDisplay.slice(1).toLowerCase();
                return (
                  <div className="member-item" key={uuidv4()}>
                    <p className="member-item-name" key={uuidv4()}>
                      {upperName}
                    </p>
                    <img
                      src={EditLogo}
                      alt="Edit Button"
                      width="17px"
                      className="member-item-edit"
                      onClick={() => editGuy(item)}
                      key={uuidv4()}
                    />
                    <img
                      src={DeleteLogo}
                      alt="Edit Button"
                      width="17px"
                      className="member-item-delete"
                      onClick={() => removeGuy(item)}
                      key={uuidv4()}
                    />
                  </div>
                );
              })
            : ""}
        </section>
      </main>

      {modal.isTrue === true ? (
        <div className="modale">
          <div className="modale__box">
            <h2 className="modale__title">Nom à éditer :</h2>
            <form
              action=""
              onSubmit={sendEdited}
              encType="text/plain"
              className="modale__form"
            >
              <label htmlFor="">
                <input
                  className="modale__input"
                  type="text"
                  onInput={(e) => saveEditArgonaute(e)}
                />
              </label>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
        <p>Moddé par TxK en Anthestérion de l'an de grâce 2022 aprés JC</p>
      </footer>
    </>
  );
}
