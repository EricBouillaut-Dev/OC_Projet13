import { NavLink } from "react-router-dom";

//Composant de la page d'erreur
function Error() {
  return (
    <div className="error">
      <h2>Erreur 404</h2>
      <p>La page que vous demandez n'existe pas.</p>
      <NavLink to="/">Retourner sur la page d'accueil</NavLink>
    </div>
  );
}

export default Error;
