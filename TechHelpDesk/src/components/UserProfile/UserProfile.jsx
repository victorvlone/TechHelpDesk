import { useState } from "react";
import "./UserProfile.css";

function UserProfile({ setShowUserProfile }) {
  const [editsInputs, showEditsInputs] = useState(false);
  const [novaFotoPerfil, setNovaFotoPerfil] = useState("");
  const [novaFotoCapa, setNovaFotoCapa] = useState("");
  const [erroTamanhoImagem, setErroTamanhoImagem] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    return JSON.parse(localStorage.getItem("usuario")) || {};
  });
  const [novoPrimeiroNome, setNovoPrimeiroNome] = useState(
    usuario?.primeiroNome || ""
  );
  const [novoSegundoNome, setNovoSegundoNome] = useState(
    usuario?.segundoNome || ""
  );

  function handleFotoPerfilChange(e) {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande! Máximo de 5MB.");
      return;
    }
    setNovaFotoPerfil(file);
  }

  function handleFotoBannerChange(e) {
    const file = e.target.files[0];
    setNovaFotoCapa(file);
  }

  function editarUsuario() {
    if (
      (novaFotoPerfil && novaFotoPerfil.size > 5 * 1024 * 1024) ||
      (novaFotoCapa && novaFotoCapa.size > 5 * 1024 * 1024)
    ) {
      setErroTamanhoImagem(true);
      return;
    }

    setErroTamanhoImagem(false);

    const formData = new FormData();
    formData.append("primeiroNome", novoPrimeiroNome || usuario.primeiroNome);
    formData.append("ultimoNome", novoSegundoNome || usuario.segundoNome);

    if (novaFotoPerfil instanceof File) {
      formData.append("fotoDePerfil", novaFotoPerfil);
    }
    if (novaFotoCapa instanceof File) {
      formData.append("fotoDeCapa", novaFotoCapa);
    }

    console.log([...formData]);
    fetch(`http://localhost:8080/usuarios/${usuario.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${usuario.token}`,
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Dados do usuario atualizados com sucesso!", data);
        localStorage.setItem("usuario", JSON.stringify(data));
        setUsuario(data);
        showEditsInputs(false);
        console.log("nova foto de perfil: ", data.fotoDePerfil)
      })
      .catch((err) => {
        console.error("Erro ao atualizar dados: ", err);
      });
  }

  return (
    <div className={`user-profile-container ${editsInputs ? "expand" : ""}`}>
      <div
        className="user-profile-banner"
        style={{
          backgroundImage: usuario.fotoDeCapa
            ? `url(http://localhost:8080${usuario.fotoDeCapa})`
            : "url(../../../public/assets/images/ceuAzul-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={
            usuario.fotoDePerfil
              ? `http://localhost:8080${usuario.fotoDePerfil}`
              : "../assets/images/userProfile.png"
          }
          alt=""
        />
        <i
          className={`fi fi-ss-pen-circle edit-icon ${
            editsInputs ? "hiden" : ""
          }`}
          onClick={() => showEditsInputs(true)}
        ></i>
        <div
          className={`userProfile-edit-banner ${editsInputs ? "" : "hiden"}`}
        >
          <i className="fi fi-sr-circle-camera camera-icon-banner"></i>
          <input
            type="file"
            accept="image/*"
            className="input-file"
            onChange={handleFotoBannerChange}
          />
        </div>
        <div className={`userProfile-edit ${editsInputs ? "" : "hiden"}`}>
          <i className="fi fi-sr-circle-camera camera-icon"></i>
          <input
            type="file"
            accept="image/*"
            className="input-file"
            onChange={handleFotoPerfilChange}
          />
        </div>
      </div>
      <p className={`fileSize-error ${erroTamanhoImagem ? "show" : ""}`}>
        A imagem precisa ter no maximo 5MB
      </p>
      <div className={`user-profile-content ${editsInputs ? "hiden" : ""}`}>
        <h4>
          {usuario.primeiroNome} {usuario.segundoNome}
        </h4>
        <p>{usuario.tipodeUsuario}</p>
      </div>
      <div className={`user-profile-edits ${editsInputs ? "show" : ""}`}>
        <div className="user-profile-edit-input">
          <label htmlFor="nome">Primeiro nome</label>
          <input
            type="text"
            placeholder="Primeiro nome"
            className="label-text"
            value={novoPrimeiroNome}
            onChange={(e) => setNovoPrimeiroNome(e.target.value)}
          />
        </div>
        <div className="user-profile-edit-input">
          <label htmlFor="nome">Ultimo nome</label>
          <input
            type="text"
            placeholder="Ultimo nome"
            className="label-text"
            value={novoSegundoNome}
            onChange={(e) => setNovoSegundoNome(e.target.value)}
          />
        </div>
      </div>
      <div
        className={`user-profile-back ${editsInputs ? "hiden" : ""}`}
        onClick={() => setShowUserProfile(false)}
      >
        <i className="fi fi-sr-arrow-circle-left"></i>
        <p>voltar</p>
      </div>
      <div className={`edit-buttons ${editsInputs ? "show" : ""}`}>
        <button className="btn-voltar" onClick={() => showEditsInputs(false)}>Voltar</button>
        <button className="btn-salvar" onClick={editarUsuario}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
