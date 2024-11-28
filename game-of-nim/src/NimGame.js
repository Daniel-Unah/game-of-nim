import React, { useState, useEffect } from 'react';

function NimGame() {
    const [sticks, setSticks] = useState(17);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("Your turn! Select 1-3 sticks to remove.");

    // CPU's turn logic
    useEffect(() => {
        if (!isPlayerTurn && !gameOver) {
            const timeoutId = setTimeout(() => {
                makeCPUMove();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isPlayerTurn, gameOver]);

    const makeCPUMove = () => {
        if (sticks <= 0) return;

        // Implementing optimal strategy
        // Goal: Leave opponent with a multiple of 4 sticks
        let sticksToRemove;
        
        const remainder = sticks % 4;
        
        if (remainder === 0) {
            // We're at a multiple of 4, we're in a losing position
            // Take 1 stick and hope for player mistake
            sticksToRemove = 1;
        } else {
            // Take sticks to leave a multiple of 4
            sticksToRemove = remainder;
        }

        // Make sure we don't take more than 3 sticks or more than available
        sticksToRemove = Math.min(3, sticksToRemove, sticks);
        
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
        setSticks(17);
        setIsPlayerTurn(true);
        setGameOver(false);
        setMessage("Your turn! Select 1-3 sticks to remove.");
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
                    {[1, 2, 3].map(num => (
                        <button 
                            key={num}
                            onClick={() => handlePlayerMove(num)}
                            style={{
                                padding: '10px 20px',
                                margin: '0 10px',
                                fontSize: '16px',
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
                            Remove {num} Stick{num > 1 ? 's' : ''}
                        </button>
                    ))}
                </div>
            )}

            {gameOver && (
                <div>
                    <button 
                        onClick={resetGame}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
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
