let Quote = document.querySelector(".quote");
let Btn = document.querySelector("button");
let Author = document.querySelector(".author");
let url = "https://api.quotable.io/random";
let Sound = document.querySelector('.sound')
let copy = document.querySelector('.copy')
let twitter = document.querySelector('.twitter')

// // get quote content
function getQuote() {
  Btn.classList.add("loading");
  Btn.innerText = "loading...";
  fetch(url)
    .then((result) => result.json())
    .then((quote) => {
      console.log(quote.author);
      Quote.textContent = quote.content;
      Author.textContent = `__by ${quote.author}`;
      Btn.innerText = "New Quote";
      Btn.classList.remove("loading");
    });
}
// getQuote() 
// // make speech of quote
function voice (){
    let voice = new SpeechSynthesisUtterance()
    voice.lang = 'hi-GB'
    let content = Quote.textContent
    let author = Author.textContent.slice(5)
     voice.text = `according to ${author}, ${content}`
  
    speechSynthesis.speak(voice)
}

// // copy quote to your clipboard
function clipboard (){
    let content = `${Quote.textContent} ${Author.textContent}`
    let myCopy = navigator.clipboard.writeText(content)
//     console.log('click',)
    
}

// // sharing on twitter
function sharequote() {
    let post = `${Quote.textContent} ${Author.textContent}`
  let url = `https:twitter.com/intent/tweet?url=${post}`
  window.open(url, '_blank');
};

window.addEventListener("load", getQuote);
Btn.addEventListener("click", getQuote);
Sound.addEventListener('click',voice)
copy.addEventListener('click',clipboard)
twitter.addEventListener('click',sharequote)

