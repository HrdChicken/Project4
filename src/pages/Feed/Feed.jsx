import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostFeed from "../../components/PostFeed/PostFeed";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import { Grid } from "semantic-ui-react";

export default function Feed({ user, handleSignUpOrLogin }) {
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      getPosts();
    } catch (err) {
      console.log(err.message);
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      getPosts();
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
  }

  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postsAPI.create(post);
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      setPosts([...data.posts]);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <Header user={user} handleSignUpOrLogin={handleSignUpOrLogin} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostFeed
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            user={user}
            addLike={addLike}
            loading={loading}
            removeLike={removeLike}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
