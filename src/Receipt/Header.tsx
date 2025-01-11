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
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        borderRadius: 0,
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
