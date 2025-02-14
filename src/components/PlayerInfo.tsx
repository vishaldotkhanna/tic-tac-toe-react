

export default function PlayerInfo({ isActive, isWinner, id }: {isActive: boolean, isWinner: boolean, id: number}) {
    // const className = `${isActive ? null : 'is-blurred'} ${isWinner ? 'winner' : ''}`
    let className = "";
    if (!isActive) {
        className += " opacity-30"
    }
    if (isWinner) {
        className += " text-green-400"
    }

    return (
        <div className={className}>Player {id + 1}</div>
    );
}