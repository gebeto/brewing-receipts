import styled from "@emotion/styled";
import { motion } from "motion/react";

export const Button = styled(motion.button)`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 1.5em 4em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: #fff;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
