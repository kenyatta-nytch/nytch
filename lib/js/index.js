const quoteArea = document.querySelector('#quote-area');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const quote1 = document.querySelector('#quote-1');
const quote2 = document.querySelector('#quote-2');
const quote3 = document.querySelector('#quote-3');
const html = document.querySelector('html');

const quoteWidth = quote1.offsetWidth
let quotes = []

function toggleMode(){
    html.classList.toggle('dark');
}

async function fetchQuotes(){
    const response = await fetch("https://type.fit/api/quotes");

    if(!response.ok) {
        const message = `An Error occured when fetching: ${response.status}`
        throw new Error(message)
    }

    quotes = await response.json();
}

function getSingleQuote() {
    const index = Math.floor(Math.random() * quotes.length);
    const q = quotes[index];
    return q;
}

function changeQuote(element) {
    console.log(`Changing quote for ${element.id}`)
    const children = element.children
    const q = getSingleQuote();

    children[0].innerHTML = q.text
    children[1].innerHTML = q.author
    console.log(`Quote changed for ${element.id}`)
}

function valueWithinHeights(value, element) {
    const elHeight = element.offsetHeight
    const yValues = {
        q1: quote1.offsetTop,
        q2: quote2.offsetTop,
        q3: quote3.offsetTop,
    }

    if (element !== quote1) {
        if (value >= yValues.q1 && value <= (yValues.q1 + quote1.offsetHeight)){
            return true;
        } else if ((value + elHeight) >= yValues.q1 && (value + elHeight) <= (yValues.q1 + quote1.offsetHeight)) {
            return true;
        }
        console.log(`${value} is not within q1 ${yValues.q1} & ${yValues.q1 + quote1.offsetHeight}`)
    }

    if (element !== quote2) {
        if ( value >= yValues.q2 && value <= (yValues.q2 + quote2.offsetHeight)) {
            return true;
        } else if ((value + elHeight) >= yValues.q2 && (value + elHeight) <= (yValues.q2 + quote2.offsetHeight)) {
            return true;
        }
        console.log(`${value} is not within q2 ${yValues.q2} & ${yValues.q2 + quote2.offsetHeight}`)
    }

    if (element !== quote3) {
        if (value >= yValues.q3 && value <= (yValues.q3 + quote3.offsetHeight)) {
            return true;
        } else if ((value + elHeight) >= yValues.q3 && (value + elHeight) <= (yValues.q3 + quote3.offsetHeight)) {
            return true;
        }
        console.log(`${value} is not within q3 ${yValues.q3} & ${yValues.q3 + quote3.offsetHeight}`)
    }

    return false
}

function valueWithinWidths(value) {
    const xValues = {
        q1: quote1.offsetLeft,
        q2: quote2.offsetLeft,
        q3: quote3.offsetLeft,
    }

    if ( value >= xValues.q1 && value <= (xValues.q1 + quoteWidth )){
        console.log(`left point ${value} is within q1 ${xValues.q1} & ${xValues.q1 + quoteWidth}`)
        return true;
    } else if ((value + quoteWidth) >= xValues.q1 && (value + quoteWidth) <= (xValues.q1 + quoteWidth)) {
        console.log(`right point ${value + quoteWidth} is within q1 ${xValues.q1} & ${xValues.q1 + quoteWidth}`)
        return true;
    }

    if ( value >= xValues.q2 && value <= (xValues.q2 + quoteWidth)) {
        console.log(`left point ${value} is within q2 ${xValues.q2} & ${xValues.q2 + quoteWidth}`)
        return true;
    } else if ((value + quoteWidth) >= xValues.q2 && (value + quoteWidth) <= (xValues.q2 + quoteWidth)) {
        console.log(`right point ${value + quoteWidth} is within q2 ${xValues.q2} & ${xValues.q2 + quoteWidth}`)
        return true;
    }

    if ( value >= xValues.q3 && value <= (xValues.q3 + quoteWidth)) {
        console.log(`left point ${value} is within q3 ${xValues.q3} & ${xValues.q3 + quoteWidth}`)
        return true;
    } else if ((value + quoteWidth) >= xValues.q3 && (value + quoteWidth) <= (xValues.q3 + quoteWidth)) {
        console.log(`right point ${value + quoteWidth} is within q3 ${xValues.q3} & ${xValues.q3 + quoteWidth}`)
        return true;
    }

    return false
}

function getCordinates(element) {
    console.log(`getting co-ordinates for ${element.id}`)
    const width = quoteArea.offsetWidth;
    const height = quoteArea.offsetHeight;
    console.log('area width',height)
    console.log('quote width', element.offsetHeight)

    function getXCordinate(){
        let x = 0;

        do {
            x = Math.floor(Math.random() * (width - quoteWidth));
        } while (x === quote1.offsetLeft || x === quote2.offsetLeft || x === quote3.offsetLeft)

        return x;
    }

    function getYCordinate() {
        let y = 0;
        let isWithin = false

        do {
            y = Math.floor(Math.random() * (height - element.offsetHeight));
            isWithin = valueWithinHeights(y, element.offsetHeight)
        } while (y === quote1.offsetTop || y === quote2.offsetTop || y === quote3.offsetTop || isWithin)

        return y;
    }

    const left = getXCordinate()
    const top = getYCordinate()

    console.log(`got co-ordinates for ${element.id}`)
    return { left, top }
}

function setPosition(element) {
    console.log(`Started opp for ${element.id}`)
    const {left, top} = getCordinates(element);
    
    if (element === quote1) {
        quote1.style.top = top + 'px'
        quote1.style.left = left + 'px'
    } else if (element === quote2) {
        quote2.style.top = top + 'px'
        quote2.style.left = left + 'px'
    } else if (element === quote3) {
        quote3.style.top = top + 'px'
        quote3.style.left = left + 'px'
    }

    // getSingleQuote()
    setTimeout(() => { console.log('top value', element.offsetTop) }, 1000)
    changeQuote(element);
    console.log(`Finished opp for ${element.id}`)
}

fetchQuotes().catch(error => { error.message })

const qoute_1 = setInterval(() => {
    console.log('q1 opp launched..')
    setPosition(quote1)
}, 15000)
// setPosition(quote1)

setTimeout(() => {
    setInterval(() =>{
        console.log('q2 opp launched..')
        setPosition(quote2)
    }, 15000)
}, 5000)

setTimeout(() => {
    setInterval(() => {
        console.log('q3 opp launched..')
        setPosition(quote3)
    }, 15000)
}, 10000)

// getQuote()
//     .then(data => {
//         console.log(data);
//         quote.innerHTML = data.quote;
//         author.innerHTML = data.author;
//     })