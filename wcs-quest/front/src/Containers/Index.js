import React, { useState } from "react";

import "../Sass/Index.scss";

export default function Index() {
  const [newArgo, setNewArgo] = useState({
    name: "",
  });

  const saveNewArgonaute = (e) => {
    setNewArgo({
      name: e.target.value,
    });
  };

  const noReload = (e) => {
    e.preventDefault();
    console.log("No Reload");
    console.log("Argo Name : ", newArgo);
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
        <form className="new-member-form" onSubmit={(e) => noReload(e)}>
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
          <div className="member-item">NoBody</div>
          <div className="member-item">For</div>
          <div className="member-item">Now</div>
        </section>
      </main>

      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
        <p>Moddé par TxK en Anthestérion de l'an de grâce 2022 aprés JC</p>
      </footer>
    </>
  );
}
