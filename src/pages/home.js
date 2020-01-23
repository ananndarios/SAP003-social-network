import Button from '../components/Button.js';
import Input from '../components/Input.js';


function Home() {

  const template= `
  <div class="logotipo">
    <h1 class="text-center teste">ALCATEIA</h1>
  </div>
    <div class="banner"></div>
  <h2> Faça login na sua conta </h2>
  <form>
  ${Input({placeholder: 'Email', type: 'email', class: 'js-email-input'})}
  ${Input({placeholder: 'Senha', type: 'password', class: 'js-password-input'})}
  ${Button({id: 'button',  title: 'Entrar', onClick: buttonLogin, class:'bntentrar'})}<br>
  
  ${Button({id:'google-btn', onClick:googleLogin, class:'bntgoogle' , title: '<img src= img/google.png width="60" height="70"> '})}
  
  </form><br>
  
  <p class="register-link">Não é cadastrado? <a class="register-hash" href="#register">Registre-se.</a></p>
  `

  return template;
};
export default Home;

 
function buttonLogin () {
  const email= document.querySelector('.js-email-input').value;
  const password= document.querySelector('.js-password-input').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(firebaseUser => {
   window.location.hash='#feed'
  })
  .catch(function(error) {
    let errorCode = error.code;
    if (errorCode === 'auth/user-not-found'){
      throw alert('Usuário não encontrado')
    } else if (errorCode === 'auth/invalid-email'){
      throw alert('E-mail inválido')
    }else if (errorCode === 'auth/wrong-password'){
      throw alert('Senha incorreta')
    }
  
  });
  
}

function googleLogin () {
    let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    let user = result.user;
    window.location.hash='#feed'
  }).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
    
  });
}

