# Project Title

Cryptopokemon

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install:

```
ganache (for testing purpose)
metamask chrome extension
solidity
```

## Running the tests

Firstly you need to deploy the smart contract on a network, for testing purpose I highly recommend you to use ganache (super fast though bug-sensitive)

### Using [remix](http://remix.ethereum.org)

1. Copy all the contracts to the browser ide
2. Set up metamask connection and reload the page (make sure you see the right chainId and address in tab Run)
3. Compile and create the contract
4. Copy new contract's address to address variable in init.js

### Run server 

Run a server with django (command below) and play around with the contract with web user interface which built from pure html and javascript.

## What is going on?

### What is cryptopokemon?
First of all we need to gain basic insight about cryptopokemon.

There are 2 kinds of address:
* Admin address: belongs to the one who creates the contract (you just did).
* User address: everyone else.

There are 3 ways to get a pokemon:
* Choosing one of the three starter pokemons: bulbasaur, squirtle and charmander. You can only do this if you have no pokemon.
* Capturing a wild pokemon: there are 4 wild pokemons per day for everyone to catch, each of them will belong to the first one to successfully capture it. The capture mechanism is all about the probability which depends on the catchRate and level of each pokemon.
* Buying one from someone with auction mode.

There are 2 ways to raise stats of a pokemon:
* Feeding food.
* Level up (by exp or direct money). There is a special type of leveling up called evolution which can be triggered in some specific pokemons at specific levels. 

Last but not least, Pokemon can **attack** each other. A battle is a serie of turns. In each turn, two pokemons hit each other with a probability of missing depending on its speed stat and cause a damage proportional to its attack and defense stat. Pokemon with higher speed will go first in each turn and the battle ends when one pokemon runs of of hp.

### How it works?

All the code will be executed on Ethereum Virtual Machine. Django is used as a back-end server which serves front-end files to build user interface. A quick recap of django usage in this project:

* All html and javascript code will be linked with a specific url (specified in urls.py).
* To add a new function to the whole system, we just need to create html files (with javascript included to communicate with smart contracts) and allocate a new url of django to it.
* We do not need any database in this project so let's drop the model stuff of django.
* To run a server with django, run:
```
python manage.py runserver
```
or (optionally) to allow other node in local network to communicate with your server:
```
python manage.py runserver 0.0.0.0:8000
```

The communication between user interface and smart contracts is based on [web3.js](https://github.com/ethereum/web3.js/) (which is injected from metamask so don't worry about installization). Basically, all the functions and public variables of smart contract can be called and accessed with web3js. To learn more about it please check out my js code or take a look at lesson 6 of this brilliant [course](https://cryptozombies.io/en/course)
## Deployment

You totally can deploy this app to the main network if you want to. Just replace the ganache network by the main ethereum network. Of course, it take you money to do that :D

## Authors

[**tailongnguyen**](https://github.com/tailongnguyen)

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
