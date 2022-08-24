// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


let hrtstatus = {
  [EMPTY_HEART]: FULL_HEART,
  [FULL_HEART]: EMPTY_HEART
};

//Color def: Red when cliced and vice versa
const Colors = {
  '': 'red',
  'red': ''
};

                                                   
document.addEventListener('DOMContentLoaded', () => {    // Grab the clicks and add event listener after the page loads
  const like = document.querySelectorAll('.like-glyph');
  for (const btn of like){                         //loop over all grabbed like buttons
    btn.addEventListener('click', likePost);
  }
})

function likePost(event){
  const hrt = event.target; //targeting the element containing like hearts

  mimicServerCall()  // Invoking mimicServerCall() upon click and server messagee alert
  .then( (serverMessage) => {
    alert(serverMessage); 

    
    hrt.innerText = hrtstatus[hrt.innerText]; // color changes
    hrt.style.color = Colors[hrt.style.color]; 
  })
  .catch( (error) => {
    document.getElementById('modal').removeAttribute('hidden'); 
    let errorElem = document.getElementById('modal-message'); //garbbing error element and outputing error from the server
    errorElem.textContent = error.message; 
    setTimeout( () => { 
      document.getElementById('modal').hidden = true
    }, 3000);
  })
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
