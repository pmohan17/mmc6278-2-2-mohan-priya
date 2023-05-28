const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    //need to red file to get quotes and authors.
    const quotes = await fs.readFile(QUOTE_FILE, "utf-8");
    try {
       //Format linebreak
      const lineBreak = quotes.split("\n");
      //randomly select a quote 
      const pickQuote = Math.floor(Math.random() * lineBreak.length);
      const randomSelect = lineBreak[pickQuote];
      //Split quote and author
      const [quote, author] = randomSelect.split("|");
      //Use chalk
      console.log(chalk.white.italic(quote));
      console.log(chalk.blue.bold(author));
    } catch (err) {
      console.log(err);
    }
  });


program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      const addQuote = `${quote} | ${author || "Anonymous"} \n`
      await fs.appendFile(QUOTE_FILE, addQuote, 'utf-8')

      .then (() => {
      console.log(chalk.blue.bold("Congrats! Your quote is added."))
    })

    } catch (err) {
      console.log(err)
    }
  });
    
    // If no author is provided,
    // save the author as "Anonymous".
    // After the quote/author is saved,
    // alert the user that the quote was added.
    // You may style the text with chalk as you wish
    // HINT: You can store both author and quote on the same line using
    // a separator like pipe | and then using .split() when retrieving

program.parse();
