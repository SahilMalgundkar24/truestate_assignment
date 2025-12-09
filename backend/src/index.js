import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// backend routes
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
