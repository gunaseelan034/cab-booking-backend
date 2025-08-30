// filepath: src/worker.ts
import { Worker } from "@temporalio/worker";
import * as activities from "./activities/booking.activities";

async function run() {
	const worker = await Worker.create({
		workflowsPath: require.resolve("./workflows/booking.workflows"),
		activities,
		taskQueue: "booking",
	});
	await worker.run();
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
