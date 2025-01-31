import React, { useState } from "react";
import axiosInstance from "../../services/api";

const PostForm = () => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(
                "/resources/admin",
                { content },{
                    withCredentials: true,
                }
            );

            console.log("Post created successfully:", response.data);
            setContent("");
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            rows={4}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
                <button type="submit">
                    Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
