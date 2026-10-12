import{ useState } from "react";
import API_BASE_URL from "../config";

function CreatePost({onPostCreated}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");
    async function handleSubmit(event) {
        event.preventDefault();
        const newPost = {
            title, 
            content,
            authorId: "6ac4c186e8dca5e897b3b8a3",
        };
        setCreateError("");
        setCreating(true);
        try{
            const response = await fetch(`${API_BASE_URL}/posts`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });
            if(!response.ok){
                throw new Error("Failed to create post");
            }
            const createdPost = await response.json();
            console.log("Created post:", createdPost);
            onPostCreated(createdPost);
            setTitle("");
            setContent("");
        }catch(error){
            console.error("Create Post Error:",error);
            setCreateError("Failed to create post. Please try again.");
        }finally{
            setCreating(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Post-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              placeholder="Post content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            {createError && <p>{createError}</p>}
            <button type="submit" disabled={creating}>
                {creating ? "Creating..." : "Create Post"}
            </button>
        </form>
    );
}

export default CreatePost;