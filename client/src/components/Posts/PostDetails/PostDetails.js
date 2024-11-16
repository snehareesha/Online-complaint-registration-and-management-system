import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Typography, Grow, Container } from "@material-ui/core";
import moment from "moment";
import useStyles from "./styles";

const PostDetails = () => {
  const posts = useSelector((state) => state.posts);
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);
  const classes = useStyles();

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={7}>
{            posts && (
            <Grid item lg={12} sm={7}>
              <Typography variant="h3" color="secondary" className={classes.title}>{post.title}</Typography>
              <Typography variant="h6" color="primary" className={classes.creator}>{post.creator}</Typography>
              <Typography variant="body2" className={classes.createdAt}>
                {moment(post.createAt).fromNow()}
              </Typography>
              <Typography variant="body2" className={classes.content}>
                {post.content}
              </Typography>
            </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default PostDetails;
