import Home from './pages/home.js';
import register from './pages/register.js';

function init() {
  document.querySelector('main').innerHTML = Home();
 
} 

window.addEventListener('load', init);


function locationHashChanged() {
  if(location.hash==='#register') {
    // return registrar()
    document.querySelector('main').innerHTML=register();
  } else if (location.hash==='#home') {
    document.querySelector('main').innerHTML=Home();
  }
}
window.addEventListener('hashchange', locationHashChanged, false);