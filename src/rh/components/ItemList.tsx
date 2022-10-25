import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

type Props = {
  text: string;
  open: boolean;
  children: React.ReactNode;
};

export const ItemList = ({ text, open, children }:Props) => {
  return (
    <ListItem
      // key={text}
      disablePadding
      sx={{
        display: "block",
      }}
      // onClick={(props)=>changePage(props)}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {children}
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            opacity: open ? 1 : 0,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};
