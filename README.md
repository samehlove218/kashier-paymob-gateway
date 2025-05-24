# Kashier-Paymob-Gateway

This is a Node.js Express application integrating Kashier and Paymob payment gateways.

## Installation

1. Clone the repository and navigate into it:
   ```bash
   git clone <your-repo-url>
   cd kashier-paymob-gateway
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file or set the following variables in your deployment environment:
- `KASHIER_TOKEN`
- `MERCHANT_ID`
- `PAYMOB_TOKEN`

## Running the Server

```bash
npm start
```

The server runs on port 3000 by default.

## API Endpoint

### POST /pay

- **Body Parameters:**
  - `amount`: Number (e.g., 100)
  - `currency`: String (e.g., "EGP")
  - `source`: "kashier" or "paymob"

**Response**: JSON from the payment gateway.
