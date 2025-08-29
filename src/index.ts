import express from "express";

import config from "./config";
import initRoutes from "./routes";

const app = express();
const port = config.ENVIROINMENT_VARIABLES.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
	console.log(`Server is running in port ${port}`);
});
