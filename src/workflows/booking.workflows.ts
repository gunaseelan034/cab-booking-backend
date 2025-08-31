import {
	condition,
	defineSignal,
	proxyActivities,
	setHandler,
} from "@temporalio/workflow";
import type * as activities from "../activities/booking.activities";

const { notifyDrivers } = proxyActivities<
	typeof activities
>({
	startToCloseTimeout: "1 minute",
});

export async function bookingWorkflow() {
	await notifyDrivers();

	let acceptedDriverId: number | undefined;
	let conditionMet = false;
	const driverAccepted = defineSignal<[number]>(
		BookingWorkflowSignalTypes.DRIVER_ACCEPTED,
	);
	setHandler(driverAccepted, (driverId: number) => {
		console.log(
			"Driver accepted the booking",
			JSON.stringify(driverAccepted, null, 2),
			driverId,
		);
		conditionMet = !!driverId;
	});

	await condition(() => conditionMet);

	return { acceptedDriverId };
}

export enum BookingWorkflowSignalTypes {
	DRIVER_ACCEPTED = "driverAccepted",
}
