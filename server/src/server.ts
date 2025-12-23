import app from "./index";
import dotenv from "dotenv";

dotenv.config();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});