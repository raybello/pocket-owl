

export default function BoardIdPage({ params: { boardId } }: { params: { boardId: string } }) {
    return (
        <div className="text-white p-2">Board Page {boardId}</div>
    )
}