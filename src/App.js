import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import {compareHand, generateRandomHand} from './utils';
import {useState} from "react";

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
    const comparison = compareHand(me, other);
    if (comparison > 0) return '승리';
    if (comparison < 0) return '패배';
    return '무승부';
}

function App() {
    const [hand, setHand] = useState(INITIAL_VALUE)
    const [otherHand, setOtherHand] = useState(INITIAL_VALUE)
    const [gameHistory, setGameHistory] = useState([]);

    const handleButtonClick = (nextHand) => {
        const nextOtherHand = generateRandomHand();
        setOtherHand(nextOtherHand);
        const nextHistoryItem = getResult(nextHand, nextOtherHand)
        setHand(nextHand);
        // setOtherHand(generateRandomHand());
        setGameHistory([...gameHistory, nextHistoryItem]);
    };
    const handleClearClick = () => {
        setHand(INITIAL_VALUE)
        setOtherHand(INITIAL_VALUE)
        setGameHistory([]);
    };

    return (
        <div>
            <Button onClick={handleClearClick}>처음부터</Button>
            <p>{getResult(hand, otherHand)}</p>
            <div>
                <HandIcon value={hand}/>
                VS
                <HandIcon value={otherHand}/>
            </div>
            <p>승부 기록: {gameHistory.join(', ')}</p>
            <div>
                <HandButton value="rock" onClick={handleButtonClick}/>
                <HandButton value="scissor" onClick={handleButtonClick}/>
                <HandButton value="paper" onClick={handleButtonClick}/>
            </div>
        </div>
    );
}

export default App;
