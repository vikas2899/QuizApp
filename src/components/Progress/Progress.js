import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";

const Progress = (props) => {
  const progress = props.progress;

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) =>
  //         prevProgress >= 100 ? 0 : prevProgress + 10
  //       );
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        fontSize: 50,
      }}
    >
      <CircularProgress variant="determinate" value={progress} size={50} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{ fontSize: 15 }}
        >
          {`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Progress;
