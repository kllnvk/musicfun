import {useCreatePlaylistMutation} from "@/features/playlists/api/playlistsApi";
import type {CreatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {type SubmitHandler, useForm} from "react-hook-form";

export const CreatePlaylistForm = () => {
    const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs["attributes"]>()

    const [createPlaylist] = useCreatePlaylistMutation()

    const onSubmit: SubmitHandler<CreatePlaylistArgs["attributes"]> = data => {
        const body: CreatePlaylistArgs = {
            type: "playlists",
            attributes: {
                title: data.title,
                description: data.description
            }
        }
        createPlaylist(body).unwrap().then(() => {
            reset()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button>create playlist</button>
        </form>
    )
}