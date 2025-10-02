# Real-Time Stock Price Ticker

## Tech Stack

**Backend:**
* Java 17 & Spring Boot 3
* Apache Kafka
* Spring WebSockets (with STOMP)
* Spring Data JPA
* PostgreSQL

**Frontend:**
* React 18 with Vite
* TypeScript
* Tailwind CSS
* Recharts (for graphs)
* StompJS & SockJS-Client


## Setup and Installation

### Prerequisites

* JDK 17+
* Maven 3.8+
* Node.js 18+
* Docker & Docker Compose
* A free API Key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

### 1. Configure the Backend

Before running the application, you need to set up your environment variables.

1.  Navigate to `stock.price/src/main/resources/`.
2.  Rename `application.properties.example` to `application.properties`.
3.  Open the new `application.properties` file and add your Alpha Vantage API key:
    ```properties
    alpha.vantage.api.key=YOUR_ALPHA_VANTAGE_API_KEY_HERE
    ```

### 2. Run the Application

The entire application stack (database, message broker, backend, frontend) can be started with a few commands.

1.  **Run the Backend Server:**
    In a new terminal, from the `stock.price` directory, run:
    ```bash
    cd stock.price
    mvn spring-boot:run
    ```
    The server will be running on `http://localhost:8080`.

2.  **Run the Frontend Application:**
    In a third terminal, from the `frontend` directory, run:
    ```bash
    # Navigate into the frontend folder
    cd frontend

    # Install dependencies first
    npm install

    # Start the dev server
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.
