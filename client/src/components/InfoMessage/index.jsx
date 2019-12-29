import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  }
}));

export default function InfoMessage(props) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={props.visible}
      onClose={props.onClose}
      autoHideDuration={50000}
    >
      <SnackbarContent
        className={classes[props.variant || "info"]}
        message={<span>{props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={props.onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      ></SnackbarContent>
    </Snackbar>
  );
}
