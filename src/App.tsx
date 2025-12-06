import { HashRouter as Router, Routes, Route, Link } from "react-router";

import { receipts } from "./receipts";
import { Receipt } from "./Receipt";
import { Weights } from "./Weights";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { WeightsProvider } from "./components/weights";

function App() {
  return (
    <WeightsProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Paper sx={{ mt: 3 }}>
                  <List>
                    {receipts.map((receipt, index) => (
                      <ListItemButton
                        component={Link}
                        to={`/receipt/${index}`}
                        key={index}
                      >
                        <ListItemText primary={receipt.title} />
                      </ListItemButton>
                    ))}
                    <Divider />
                    <ListItem component={Link} to={`/weights`}>
                      <ListItemText primary={"Weights"} />
                    </ListItem>
                  </List>
                </Paper>
              </>
            }
          />
          <Route path="/receipt/:id" element={<Receipt />} />
          <Route path="/weights" element={<Weights />} />
        </Routes>
      </Router>
    </WeightsProvider>
  );
}

export default App;
