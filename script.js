'use strict';

const tictactoe = function (element_name) {
    let app = document.querySelector(element_name);
    let container = app.querySelector('.container');
    let moves_key = element_name + "_moves",
        count_key = element_name + "_count";
    let moves = JSON.parse(localStorage.getItem(moves_key));
    console.log(moves);

    if (moves == null) {
        moves = {};
    }

    let count = localStorage.getItem(count_key);
    if (count == null) {
        count = 0;
    }
    this.game_on = true;
    let obj = this;

    this.run = function () {
        this.addLinks();
        this.links = container.querySelectorAll('a');

        app.querySelector('.reset').addEventListener('click', function (event) {
            event.preventDefault();
            count = 0;
            localStorage.setItem(count_key, count);
            moves = {};
            localStorage.setItem(moves_key, '{}');
            for (let a of obj.links) {
                a.textContent = '';
                a.classList = '';
            }
            app.querySelector('.message').textContent = '';
            obj.game_on = true;
        });
    }

    this.addLinks = function () {
        for (let i = 1; i <= 9; i++) {
            let a = document.createElement('a');
            if (moves.hasOwnProperty(i)) {
                a.textContent = moves[i];
            }
            a.setAttribute('href', '#');
            a.addEventListener('click', function(event) {
                event.preventDefault();
                if (obj.game_on) {
                    if (this.textContent == '') {
                        count++;
                        let symbol = (count % 2 == 0) ? 'o': 'x';
                        this.textContent = symbol;
                        obj.checkWinner(symbol);
                        localStorage.setItem(count_key, count);
                        moves[i] = symbol;
                        localStorage.setItem(moves_key, JSON.stringify(moves));
                        app.querySelector('.message').textContent = '';
                    }
                    else {
                        let symbol = (count % 2 == 0) ? 'x': 'o';
                        app.querySelector('.message').textContent = 'It is ' + symbol + ' move.';
                    }
                }
            });
            container.append(a);
        }
    };

    this.checkWinner = function (symbol) {
        let win_combinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
    
            [0,3,6],
            [1,4,7],
            [2,5,8],
    
            [0,4,8],
            [2,4,6]
        ];
    
        for (let c of win_combinations) {
            if (
                this.links[c[0]].textContent == symbol &&
                this.links[c[1]].textContent == symbol &&
                this.links[c[2]].textContent == symbol
            ){
                app.querySelector('.message').textContent = 'Winner is ' + symbol;
                this.game_on = false;
                this.links[c[0]].classList.add('green');
                this.links[c[1]].classList.add('green');
                this.links[c[2]].classList.add('green');
                break;
            }
        }
    };
};

const game = new tictactoe('#app');
game.run();

const game2 = new tictactoe('#tictactoe-2');
game2.run();





