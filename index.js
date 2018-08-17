const SlackBot = require("slackbots");
const axios = require("axios");

// Initialize JokeBot
const bot = new SlackBot({
  token: "xoxb-414981550259-417598588976-CYRzBPhftJG66skPMXTwKUem",
  name: "Joke Bot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };
  bot.postMessageToChannel(
    "react-doubts",
    "Get ready to Laugh with @JokeBot",
    params
  );
});

// Error Handler
bot.on("error", error => console.log(error));

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

// filter message coming from slack
const handleMessage = message => {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" yomoma")) {
    yoMamaJoke();
  } else if (message.includes(" random")) {
    randomJoke();
  } else if (message.includes(" help")) {
    help();
  }
};

const chuckJoke = () => {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;
    const params = {
      icon_emoji: ":laughing:"
    };
    bot.postMessageToChannel("react-doubts", `Chuck Norris: ${joke}`, params);
  });
};

const yoMamaJoke = () => {
  axios.get("http://api.yomomma.info").then(res => {
    const joke = res.data.joke;
    const params = {
      icon_emoji: ":laughing:"
    };
    bot.postMessageToChannel("react-doubts", `Yo Mama: ${joke}`, params);
  });
};

// Tell a random Joke
const randomJoke = () => {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
};

// show a list of commands
const help = () => {
  const params = {
    icon_emoji: ":question:"
  };
  bot.postMessageToChannel(
    "react-doubts",
    `Tell @JokeBot with either 'chucknorris', 'yomoma' or 'random' to get a Joke`,
    params
  );
};
