let Quote = document.querySelector(".quote");
let Btn = document.querySelector("button");
let Author = document.querySelector(".author");
let Sound = document.querySelector('.sound');
let copy = document.querySelector('.copy');
let twitter = document.querySelector('.twitter');

// Get quote content
function getQuote() {
  Btn.classList.add("loading");
  Btn.innerText = "loading...";
  let url = 'https://api.adviceslip.com/advice';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      Quote.textContent = data.slip.advice;
      Author.textContent = "__by Unknown";
      Btn.innerText = "New Quote";
      Btn.classList.remove("loading");
    })
    .catch(error => {
      console.error("Error fetching quote", error);
      Btn.innerText = "Try Again";
      Btn.classList.remove("loading");
    });
}

// Make speech of quote
function voice() {
    let voice = new SpeechSynthesisUtterance();
    voice.lang = 'hi-GB';
    let content = Quote.textContent;
    let author = Author.textContent.slice(5);
    voice.text = `According to ${author}, ${content}`;
    speechSynthesis.speak(voice);
}

// Copy quote to clipboard
function clipboard() {
    let content = `${Quote.textContent} ${Author.textContent}`;
    navigator.clipboard.writeText(content).then(() => {
        alert("Quote copied to clipboard!");
    });
}

// Sharing on Twitter
function sharequote() {
    let post = `${Quote.textContent} ${Author.textContent}`;
    let url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`;
    window.open(url, '_blank');
}

window.addEventListener("load", getQuote);
Btn.addEventListener("click", getQuote);
Sound.addEventListener('click', voice);
copy.addEventListener('click', clipboard);
twitter.addEventListener('click', sharequote);
