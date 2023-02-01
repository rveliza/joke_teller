const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
    // console.log('tell me: ', joke);
        VoiceRSS.speech({
        key: '',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Disable/Enable Button
const toggleButton = () => {
    button.disabled = !button.disabled;
}

// Get Jokes from Joke API
const getJokes = async() => {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //  Text to Speech
        tellMe(joke);

        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('Whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);