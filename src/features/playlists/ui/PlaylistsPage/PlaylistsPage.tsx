import {useDeletePlaylistMutation, useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import type {PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {CreatePlaylistForm} from "@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm";
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistItem/PlaylistItem";
import {useState} from "react";
import {useForm} from "react-hook-form";
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
    const {data} = useFetchPlaylistsQuery()
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs["attributes"]>()
    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (id: string) => {
        if (confirm(`Are you sure you want to delete playlist?`)) {
            deletePlaylist(id)
        }

    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(tag => tag.id)
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <div className={s.items}>
                {data?.data.map(playlist => {
                    const isEditting = playlist.id === playlistId
                    return (
                        <div className={s.item} key={playlist.id}>
                            {isEditting ? <EditPlaylistForm playlistId={playlistId} setPlaylistId={setPlaylistId} editPlaylist={editPlaylistHandler} register={register} handleSubmit={handleSubmit} />
                                :
                                <PlaylistItem playlist={playlist} editPlaylistHandler={editPlaylistHandler} deletePlaylistHandler={deletePlaylistHandler} />
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}