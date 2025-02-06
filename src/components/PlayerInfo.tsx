

export default function PlayerInfo({ isActive, isWinner, id }: {isActive: boolean, isWinner: boolean, id: number}) {
    const className = `${isActive ? null : 'is-blurred'} ${isWinner ? 'winner' : ''}`

    return (
        <h4 className={className}>Player {id + 1}</h4>
    );
}