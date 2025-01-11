import React from "react";
import { motion } from "motion/react";
import { ReceiptDefinition } from "../receipts";
import { useNavigate } from "react-router";
import { calcReceiptBrewingTime, calcReceiptVolume } from "./utils";
import { Button } from "../components/Button";

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
    <motion.div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        padding: 16,
      }}
    >
      <Button onClick={() => navigate("/")}>{"<"}</Button>
      <motion.div>
        <motion.h3>{receipt.title}</motion.h3>
        <motion.h6>
          Time: {receiptBrewingTime}, {receiptVolume}ml
        </motion.h6>
        <motion.h6>Volume: {receiptVolume}ml</motion.h6>
      </motion.div>
    </motion.div>
  );
};
