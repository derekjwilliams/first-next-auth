import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "./queries/get-note-by-id";
import useSupabase from "./useSupabase";

function useNotesQuery(noteId: number) {
    const client = useSupabase();
    const queryKey = ["notes", noteId]

    const queryFn = async () => {
        return getNoteById(client, noteId)?.then( 
            result => result.data
        )
    }
    return useQuery({queryKey, queryFn})
}

export default useNotesQuery