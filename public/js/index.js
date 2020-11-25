const quote = document.getElementById('quote');
const author = document.getElementById('author');
const html = document.querySelector('html');
let resource = {};

function toggleMode(){
    html.classList.toggle('dark');
}

async function getQuote(){
    try{
        const response = await fetch('http://quotes.stormconsultancy.co.uk/random.json');
        const data = await response.json();
        return data;

    } catch(error) {
        console.log(error);
    }
}

getQuote()
    .then(data => {
        console.log(data);
        quote.innerHTML = data.quote;
        author.innerHTML = data.author;
    })
