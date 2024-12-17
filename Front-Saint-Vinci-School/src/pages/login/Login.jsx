import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <form>
        <h2>Se connecter</h2>
        <span>Identifiant</span>
        <input type="text" />
        <span>Mot de passe</span>
        <input type="password" />
        <a href="/forgot-password">Mot de passe oublié ?</a>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
