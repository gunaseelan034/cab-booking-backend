import express from "express";

import config from "./config";
import initRoutes from "./routes";

import "./worker";
import { Connection, WorkflowClient } from "@temporalio/client";

const initWorkflowClient = async () => {
	const connection = await Connection.connect();
	app.locals.workflowClient = new WorkflowClient({ connection });
};

const app = express();
const port = config.ENVIROINMENT_VARIABLES.PORT;

initWorkflowClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
	console.log(`Server is running in port ${port}`);
});
