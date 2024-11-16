import { Grid, Typography, Grow, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Posts = ({ setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const posts = useSelector((state) =>
    user.result.isAdmin
      ? state.posts
      : state.posts.filter((post) => post.email === user.result.email)
  );
  const classes = useStyles();

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            {!posts.length ? (
              <Grid item xs={12} sm={4}>
                <Container className={classes.notFound}>
                  <Typography variant="h5">There no complaints </Typography>
                  <Link to="/">
                    <Typography variant="h6" color="secondary">
                      Back to the Homepage...
                    </Typography>
                  </Link>
                </Container>
              </Grid>
            ) : (
              <Grid
                className={classes.container}
                container
                alignItems="stretch"
                spacing={3}
              >
                {posts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Posts;
