import {
	defineSignal,
	proxyActivities,
	setHandler,
} from "@temporalio/workflow";
import type * as activities from "../activities/booking.activities";

const { notifyDrivers } = proxyActivities<typeof activities>({
	startToCloseTimeout: "1 minute",
});

export async function bookingWorkflow() {
	await notifyDrivers();

	let acceptedDriverId: number | undefined;
	const driverAccepted = defineSignal<[number]>("driverAccepted");
	setHandler(driverAccepted, () => {
		console.log(
			"Driver accepted the booking",
			JSON.stringify(driverAccepted, null, 2),
		);
	});

	return { acceptedDriverId };
}

