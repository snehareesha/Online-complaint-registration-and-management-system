import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/post";
import background from "../../../images/background.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { updatePost } from "../../../actions/post";

const Post = ({ post, setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [priority, setPriority] = useState(post.priority);
  const [state, setState] = useState(post.state);
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateMenu, setStateMenu] = useState(null);
  const [postData, setPostData] = useState({
    priority: post.priority,
    state: post.state,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStateClick = (event) => {
    setStateMenu(event.currentTarget);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStateClose = () => {
    setStateMenu(null);
  };

  const handlePriority = (noPriority) => {
    setPriority(noPriority);
    setPostData({ ...postData, priority: noPriority });
    dispatch(updatePost(post._id, postData));
    handleClose();
  };

  const handleState = async (status) => {
    await setPostData({ ...postData, state: status });
    dispatch(updatePost(post._id, postData));
    setState(status);
    handleStateClose();
  };

  return (
    <Card className={classes.card}>
      <Link to={`/details/${post._id}`}>
        <CardMedia
          className={classes.media}
          image={background}
          title={post.title}
        />
      </Link>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        { (post.email === user.result.email && post.state === 'Pending') && <Button
          color="secondary"
          size="small"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="default" />
        </Button>}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {post.title}
      </Typography>
      <CardActions className={classes.cardActions}>
        { (user.result.isAdmin) &&
          <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          {!priority
            ? "Low Priority"
            : priority === 1
            ? "Medium Priority"
            : "High Priority"}
        </Button>}

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem onClick={() => handlePriority(2)}>
            <ListItemIcon>
              <PriorityHighIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="High Priority" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handlePriority(1)}>
            <ListItemIcon>
              <SettingsEthernetIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Medium Priority" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handlePriority(0)}>
            <ListItemIcon>
              <LowPriorityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Low Priority" />
          </StyledMenuItem>
        </StyledMenu>

        <Button
          aria-controls="status-menu"
          aria-haspopup="true"
          variant="contained"
          color="secondary"
          disabled={ !user.result.isAdmin }
          onClick={handleStateClick}
        >
          {state}
        </Button>
        <StyledMenu
          id="status-menu"
          anchorEl={stateMenu}
          keepMounted
          open={Boolean(stateMenu)}
          onClose={handleStateClose}
        >
          <StyledMenuItem onClick={() => handleState("Resolved")}>
            <ListItemIcon>
              <TrendingUpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Resolved" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handleState("Pending")}>
            <ListItemIcon>
              <MoreHorizIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Pending" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handleState("Dismissed")}>
            <ListItemIcon>
              <NotInterestedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dismissed" />
          </StyledMenuItem>
        </StyledMenu>
      </CardActions>
    </Card>
  );
};

export default Post;
