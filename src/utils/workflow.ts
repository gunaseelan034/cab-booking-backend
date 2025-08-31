import { Connection, WorkflowClient } from "@temporalio/client";
import type express from "express";

export const getWorkflowById = async (id: string) => {
	const connection = await Connection.connect();
	return new WorkflowClient({ connection }).getHandle(id);
};

export const initWorkflowClient = async (app: ReturnType<typeof express>) => {
	const connection = await Connection.connect();
	app.locals.workflowClient = new WorkflowClient({ connection });
};
