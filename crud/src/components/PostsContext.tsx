import {createContext} from "react";
import useJsonFetch from "../hooks/useJsonFetch";


export const PostsContext = createContext(undefined)

export const PostsProvider = ({children}) => {
    const API_URL = 'http://localhost:7070/posts'
    const[posts, loading, error] = useJsonFetch(API_URL, [])

    return (
        <PostsContext.Provider value={{posts, loading, error}}>
            {children}
        </PostsContext.Provider>
    )
}