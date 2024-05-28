import { Button } from "~/components/ui/button";
import { deleteBoard } from "~/server/queries";
import { BoardDeleteButton } from "./board-delete";

interface BoardProps {
  name: string;
  id: number;
}

export const Board = ({ name, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>
        Board: {id}-{name}
      </p>
      <BoardDeleteButton />
    </form>
  );
};
