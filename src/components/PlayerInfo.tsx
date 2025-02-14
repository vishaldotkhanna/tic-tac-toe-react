

export default function PlayerInfo({ isActive, isWinner, id }: {isActive: boolean, isWinner: boolean, id: number}) {
    const className = `${isActive ? '' : 'opacity-30'} ${isWinner ? 'text-green-400' : ''}`

    return (
        <div className={className}>Player {id + 1}</div>
    );
}