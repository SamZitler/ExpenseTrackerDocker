import Express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/transaction.js";
import TransactionRoutes from "./routes/transaction.js";
import AuthApiRoutes from "./routes/AuthApi.js";
import UserApiRoutes from "./routes/UserApi.js";
import CategoryApiRoutes from "./routes/CategoryApi.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

const auth = passport.authenticate("jwt", { session: false });
app.use("/transaction", auth, TransactionRoutes);
app.use("/auth", AuthApiRoutes);
app.use("/user", UserApiRoutes);
app.use("/category", auth, CategoryApiRoutes);
connect();
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
