let story = null;

async function fetchStory() {
    try {
        const response = await fetch('https://shortstories-api.herokuapp.com');
        const data = await response.json();
        // save the story
        story = data;
        console.info(`Fetched story id- ${data._id}: `, data.title);
        // set quote on dom
        setQuoteOnDOM();
    } catch (error) {
        throw new Error(error);
    }
}

// change dom content
function setQuoteOnDOM() {
    console.info('setting quote')
    const title = document.querySelector('#text-title');
    const body = document.querySelector('#text-body');

    // confirm presence of dom elem + story
    if (story !== null) {
        console.info('title & body elements:', title, body);
        title.innerHTML = story.title;
        body.innerHTML = story.story;
        return;
    }
    throw new Error("Couldn't find dom element or story wasn't loaded")
}

fetchStory();
document.onreadystatechange = () => {
    console.info('ready state changed..', document.readyState);
    if (document.readyState === 'complete') fetchStory();
}