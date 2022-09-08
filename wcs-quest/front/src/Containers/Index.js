import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  addCharacters,
  getCharacters,
  delCharacters,
  editCharacters,
} from "../redux/actions/post.action";

import "../Sass/Index.scss";

export default function Index() {
  const { allCharacters } = useSelector((state) => ({
    ...state.allCharactersReducer,
  }));

  const [numberCharacters, setNumberCharacters] = useState(0);
  const [modal, setModale] = useState({
    isTrue: false,
    id: "",
  });

  const [newArgo, setNewArgo] = useState({
    name: "",
  });
  const [editNewName, setEditNewName] = useState();

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

  const newNameValidate = (e) => {
    const re = {
      full: /^[a-zA-Z]+$/,
    };
    return re.full.test(e.name);
  };

  const saveNewArgonaute = (e) => {
    setNewArgo({
      name: e.target.value,
    });
  };
  const saveEditArgonaute = (e) => {
    setEditNewName({
      name: e.target.value,
    });
    console.log(modal, editNewName, "modalmodal");
  };

  const dispatch = useDispatch();

  const olaComment = (e) => {
    console.log(newNameValidate(e), " IS true ?");
    if (newNameValidate(e) === true) {
      dispatch(addCharacters(e));
      document.getElementById("name").value = "";
      dispatch(getCharacters());
      setNumberCharacters(numberCharacters + 1);
    } else {
      alert("Nom invalide, il ne doit contenir que des lettres.");
    }
  };

  const removeGuy = (e) => {
    console.log(e.idcharactersnames, "e");
    dispatch(delCharacters(e));
    document.location.reload();
  };

  const editGuy = (e) => {
    console.log(e, "eeeesy");
    setModale({
      isTrue: true,
      id: e.idcharactersnames,
    });
  };

  const dataToEdit = {
    nom: editNewName,
    id: modal.id,
  };

  const sendEdited = (e) => {
    e.preventDefault();
    console.log(dataToEdit.nom);
    if (newNameValidate(dataToEdit.nom) === true) {
      console.log(newNameValidate(dataToEdit.nom), "TRRRUUE");
      dispatch(editCharacters(dataToEdit));
      setNumberCharacters(numberCharacters + 1);
      setModale({
        isTrue: false,
      });
    } else {
      alert("Le nom ne doit contenir que des lettres.");
    }
  };

  const noReload = (e) => {
    e.preventDefault();
    olaComment(newArgo);
  };

  return (
    <>
      <header>
        <h1>
          <img
            src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
            alt="Wild Code School logo"
          />
          Les Argonautes
        </h1>
      </header>

      <main>
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
                return (
                  <div className="member-item" key={uuidv4()}>
                    <p className="member-item-name" key={uuidv4()}>
                      {item.charactername}
                    </p>
                    <button
                      className="member-item-edit"
                      onClick={() => editGuy(item)}
                      key={uuidv4()}
                    >
                      Edit
                    </button>
                    <button
                      className="member-item-delete"
                      onClick={() => removeGuy(item)}
                      key={uuidv4()}
                    >
                      Delete
                    </button>
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
