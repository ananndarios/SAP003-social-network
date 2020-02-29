/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
import Button from '../components/button.js';
import Input from '../components/input.js';


function logout() {
  firebase.auth().signOut().then(() => {
    window.location.hash = '#home';
  }, (error) => {
    console.error('Sign Out Error', error);
  });
}

function deleteButton(event) {
  const id = event.target.dataset.id;
  firebase.firestore().collection('posts').doc(id).delete();
  event.target.parentElement.remove();
}

function load() {
  const postCollection = firebase.firestore().collection('posts');
  // const user = firebase.auth().currentUser;
  postCollection.get().then((snap) => {
    snap.forEach((post) => {
      console.log(post);
    });
  });
}

function likePost(event) {
  const id = event.target.dataset.id;
  const likeButton = document.querySelector(`#gostei${id}`);
  firebase.firestore().collection('posts').doc(id).get()
    .then((snap) => {
      const counter = snap.likes + 1;
      firebase.firestore().collection('posts').doc(id).update({
        likes: counter,
      });
      likeButton.innerText = `Likes:${counter}`;
    });
}

window.load = load;

function addPost(post, postId) {
  const printPost = document.querySelector('.postSection');
  const id = firebase.auth().currentUser.uid;
  const template = `
   
    <div class='postCard'>
    ${Button({
    dataId: postId, class: 'delete', title: '🗑️', onClick: deleteButton,
  })}
    ${Button({
    dataId: postId, class: 'like', title: '❤️', onClick: likePost,
  })}  

    <div class'postLikes' id='gostei${postId}'>${id}    
      <p class='likes'>Likes:${post.data().likes}</p></div>
      <p class='text'>    
      ${post.data().text}  
      </p>
      
    </div>
    `;
  printPost.innerHTML += template;
}


function formSubmit() {
  const text = document.querySelector('.postText').value;
  const id = firebase.auth().currentUser.uid;
  const post = {
    text,
    user: id,
    date: new Date(),
    likes: 0,
    comments: [],
  };
  firebase.firestore().collection('posts').add(post)
    .then((postId) => {
      const printPost = document.querySelector('.postSection');
      const template = `
    <div class='postCard'>
    <div class'postLikes' id='gostei${postId}'>${id}    <p class='likes'>Likes:${post.likes}</p></div>
    <div class='buttons'>
    ${window.button.component({
    dataId: postId, class: 'like', title: '❤️', onClick: likePost,
  })}
    ${window.button.component({
    dataId: postId, class: 'delete', title: '🗑️', onClick: deleteButton,
  })}
    </div>
    <p class='text'>    
    ${post.text}  
    </p>
    
  </div>
      `;
      printPost.innerHTML += template;
    });
  text.value = '';
}

window.likePost = likePost;
window.deleteButton = deleteButton;


function timeline() {
  const template = `
    <header class='feed'>
        <h1>Alcateia</h1>
        ${Button({
    class: 'logout', title: 'Sair', onClick: logout,
  })}
    </header>
    <div class='user'>
        <div class='photo'></div>
        <p>Fulana da Silva</p>
    </div>
    <section class='align'>
        <form class='post'>
            ${Input({ class: 'postText', placeholder: 'O que você está pensando?', type: 'textarea' })}
            ${Button({
    class: 'sendPost', title: 'Postar', id: 'button', onClick: formSubmit,
  })}
        </form>
    </section>
    <section class='postSection'></section>
    `;


  return template;
}

export default timeline;
