import Button from '../components/button.js';
import Input from '../components/input.js';


function Home() {

  const template= `
  <div class="logotipo">
    <h4 class="text-center">ALCATEIA</h4>
  </div>
    <div class="banner"></div>

  <h2> Faça login na sua conta </h2>

  <form>
  ${Input({placeholder: 'Email', type: 'email', class: 'js-email-input'})}
  ${Input({placeholder: 'Senha', type: 'password', class: 'js-password-input'})}
  ${Button({id: 'button',  title: 'Entrar', onClick: buttonLogin, class:'bntentrar'})}<br>
  
  ${Button({id:'google-btn', onClick:googleLogin, class:'bntgoogle' , title: '<img src= img/google.png width="36" height="15"> Registre-se usando Google'})}
  </form><br>


  ${Button({id: 'cadastro', title: 'Cadastrar', onClick: goToRegister, class:'cadastro' })}

  `
    return template;
};
export default Home;

 
function goToRegister () {
  window.location.hash='#register';
}

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
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    // ...
    window.location.hash='#feed'
  }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });
}