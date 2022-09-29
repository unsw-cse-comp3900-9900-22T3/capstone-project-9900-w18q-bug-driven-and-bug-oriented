import { Box } from "@mui/system";
import React from "react";
import { Button } from "@mui/material";

interface ListProps {
  props1?: string;
  props2?: string;

}

export default function Template({
  props1 = '',
  props2 = '',
  ...props
}: ListProps) {
  return (
    <>
      <Box>{props1}</Box>
      <Button>{props2}</Button>
    </>
  );
}