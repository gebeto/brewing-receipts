import React from "react";
import { ReceiptDefinition } from "../../receipts";
import { useNavigate } from "react-router";
import { calcReceiptBrewingTime, calcReceiptVolume } from "./utils";
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export const Header: React.FC<{ receipt: ReceiptDefinition }> = ({
  receipt,
}) => {
  const navigate = useNavigate();
  const receiptVolume = React.useMemo(() => {
    return calcReceiptVolume(receipt);
  }, [receipt]);

  const receiptBrewingTime = React.useMemo(() => {
    return calcReceiptBrewingTime(receipt);
  }, [receipt]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h6" color="inherit" component="span">
            {receipt.title}
          </Typography>

          <Divider orientation="vertical" sx={{ mx: 2 }} />

          <Typography variant="h6" color="inherit" component="span">
            Time: {receiptBrewingTime}, {receiptVolume}ml
          </Typography>

          <Divider orientation="vertical" sx={{ mx: 2 }} />

          <Typography variant="h6" color="inherit" component="span">
            Volume: {receiptVolume}ml
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
