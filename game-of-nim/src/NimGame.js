import React, { useState, useEffect } from 'react';

function NimGame() {
    const [sticks, setSticks] = useState(11); 
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Your turn! Select 1 or 2 sticks to remove.");

    // CPU's turn logic
    useEffect(() => {
        if (!isPlayerTurn && !gameOver) {
            // Add a small delay to make CPU's move feel more natural
            const timeoutId = setTimeout(() => {
                makeCPUMove();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isPlayerTurn, gameOver]);

    const makeCPUMove = () => {
        if (sticks <= 0) return;

        // Implementing optimal strategy
        // Goal: Leave opponent with a number of sticks that is a multiple of 3 plus 1
        let sticksToRemove;
        
        switch (sticks) {
            case 11: // Remove 2 to leave 9
            case 10: // Remove 1 to leave 9
            case 9:  // Remove 2 to leave 7
            case 8:  // Remove 1 to leave 7
            case 7:  // Remove 2 to leave 5
            case 6:  // Remove 1 to leave 5
            case 5:  // Remove 1 to leave 4
            case 3:  // Remove 2 to leave 1
            case 2:  // Remove 1 to leave 1
                sticksToRemove = sticks % 3 === 0 ? 1 : (sticks - (sticks - 1) % 3 - 1) % 3 || 1;
                break;
            default: // If something unexpected, take 1 stick
                sticksToRemove = 1;
        }

        const newSticks = sticks - sticksToRemove;
        
        setMessage(`CPU removed ${sticksToRemove} stick${sticksToRemove > 1 ? 's' : ''}`);
        setSticks(newSticks);

        if (newSticks <= 0) {
            setGameOver(true);
            setMessage("Game Over! CPU wins!");
        } else {
            setIsPlayerTurn(true);
        }
    };

    const handlePlayerMove = (amount) => {
        if (!isPlayerTurn || gameOver) return;

        const newSticks = sticks - amount;
        setSticks(newSticks);
        
        if (newSticks <= 0) {
            setGameOver(true);
            setMessage("Game Over! You win!");
        } else {
            setMessage(`You removed ${amount} stick${amount > 1 ? 's' : ''}`);
            setIsPlayerTurn(false);
        }
    };

    const resetGame = () => {
        setSticks(11);
        setIsPlayerTurn(true);
        setGameOver(false);
        setMessage("Your turn! Select 1 or 2 sticks to remove.");
    };

    const renderSticks = () => {
        const sticksArray = [];
        for (let i = 0; i < sticks; i++) {
            sticksArray.push(
                <span 
                    key={i}
                    style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '60px',
                        backgroundColor: '#4caf50',
                        margin: '0 3px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transform: 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'rotate(5deg)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'rotate(0deg)';
                    }}
                />
            );
        }
        return sticksArray;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>{isPlayerTurn ? "Your Turn" : "CPU's Turn"}</h2>
            <div style={{ marginBottom: '20px', color: '#fff' }}>{message}</div>
            
            <div style={{ 
                margin: '30px 0', 
                minHeight: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2px'
            }}>
                {renderSticks()}
            </div>

            <div style={{ marginBottom: '10px', color: '#fff' }}>
                Sticks remaining: {sticks}
            </div>
            
            {!gameOver && isPlayerTurn && (
                <div style={{ margin: '20px 0' }}>
                    <button 
                        onClick={() => handlePlayerMove(1)}
                        style={{
                            padding: '10px 20px',
                            margin: '0 10px',
                            fontSize: '16px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Remove 1 Stick
                    </button>
                    <button 
                        onClick={() => handlePlayerMove(2)}
                        style={{
                            padding: '10px 20px',
                            margin: '0 10px',
                            fontSize: '16px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Remove 2 Sticks
                    </button>
                </div>
            )}

            {gameOver && (
                <div>
                    <button 
                        onClick={resetGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default NimGame;
