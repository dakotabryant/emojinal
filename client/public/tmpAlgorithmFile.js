//this is a temp file for experimenting with the datastructure and
//algorithm without touching any other files.

//Deck class holds all cards and is what the algorithm touches.

class Deck{
  constructor(data){
    this.deck = makeDeck(data);

  }

  add(data, target, deck){
    if(this.deck[target] === null ){
      //create parent node
      this.deck[target] = this.makeCard(data, this.deck);
  }

  makeCard(obj,parent){
    obj.parent = parent;
    obj.next = null;
    return obj;
  }

  makeDeck(data){
    //makes a tree/queus structure
    let deck = {
      name: data.name,
      subject
      now: null,
      soon: null,
      later: null,
      unstaged: null
    };
    data.forEach(el => {
      let card = makeCard(data);
      this.add(card, "unstaged", deck);
    })
    console.dir(deck);
  }
}

//an idea for a deck
let d = {
  name: "a test deck",
  subject: "Testing the algorithm stuff.",
  cards: [
    {question:"What is love?",
      answer: "Baby don't hurt me"
      wrongAnswers: ["Don't hurt me", "No more"]
    },
    {question:"I'm a...",
      answer: "Smooth Criminal"
      wrongAnswers: ["Bat.  Man.", "Vegan."]
    },
    {question:"Goat's head in the deli case",
      answer: "Oh sweet angel-angel-bearded face"
      wrongAnswers: ["Paper maché parade on at night",
        "That's what you do with no sunlight",
        "In the tropical tropical",
        "Tropical ice-land"]
    }
  ]
}

let test = new Deck;
