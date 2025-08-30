# To Stand up Temporal Server with Docker
docker run --rm -d --name temporalio --network host -e TEMPORAL_BROKER_PORT=7233 temporalio/temporal-server:latest