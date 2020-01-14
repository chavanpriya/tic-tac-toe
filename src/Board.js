import React from 'react';
import Square from './Square';

class Board extends React.Component {

    xTurn = true;
    winner = null;

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    handleClick(i) {
        console.log(i);
        if (this.winner == null && this.state.squares[i] == null) {
            if (this.xTurn) {
                let newSquares = this.state.squares.slice();
                newSquares[i] = 'X';
                this.setState({
                    squares: newSquares
                });
                this.xTurn = false;
            } else {
                let newSquares = this.state.squares.slice();
                newSquares[i] = 'O';
                this.setState({
                    squares: newSquares
                });
                this.xTurn = true;
            }
        }
    }

    winnerCheck() {
        //row winner check
        let winner = null;
        for (let i = 0; i < 3; i++) {
            winner = this.state.squares[3 * i];
            if (winner != null && winner == this.state.squares[3 * i + 1] && winner == this.state.squares[3 * i + 2]) {
                return winner;
            }
        }

        //for column
        for (let i = 0; i < 3; i++) {
            winner = this.state.squares[i];
            if (winner != null && winner == this.state.squares[i + 3] && winner == this.state.squares[i + 6]) {
                return winner;
            }
        }

        //diagonal check
        winner = this.state.squares[0];
        if (winner != null && winner == this.state.squares[4] && winner == this.state.squares[8]) {
            return winner;
        }
        winner = this.state.squares[2];
        if (winner != null && winner == this.state.squares[4] && winner == this.state.squares[6]) {
            return winner;
        }
        return null;
    }

    render() {
        this.winner = this.winnerCheck();
        const status = this.xTurn ? 'Next player: X' : 'Next player: O';
        const winnerQuote = this.winner ? 'Winner is : ' + this.winner : '';
        return (
            <div>
                <div className="status">{status}</div>
                <div className="status">{winnerQuote}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;