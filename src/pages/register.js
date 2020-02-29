/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Button from '../components/button.js';
import Input from '../components/input.js';

function register() {
  const template = `
    <header>
      <img src='../img/shewolf.png'>
      <h1>Alcatéia</h1>
      <h3>Bem-vinda!</h3>
    </header>
    <main class='register'>
    <form>
    ${Input({
    id: 'nameReg', placeholder: 'Nome', type: 'text', name: 'name',
  })}
    ${Input({
    id: 'emailReg', placeholder: 'Email', type: 'email', name: 'email',
  })}
    ${Input({
    id: 'passwordReg', placeholder: 'Senha', type: 'password', name: 'password',
  })}
    ${Button({
    class: 'register', title: 'Registrar', id: 'button', onClick: buttonRegister,
  })}
    </form>
    <a class= 'back' href= ${goToLogin}>Voltar</a>
    </main>
  `;

  return template;
}

function goToLogin() {
  window.location.hash = '#home';
}

function buttonRegister() {
  const email = document.querySelector('.js-email-input').value;
  const password = document.querySelector('.js-password-input').value;
  const name = document.querySelector('.username').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((firebaseUser) => {
      window.location.hash = '#feed';
    })
    .catch((user) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
}
export default register;
