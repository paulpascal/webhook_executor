# Project Name

Webhook Executor

# Description

This lightweight project facilitates the handling of webhook requests by executing an appropriate command for each webhook. It operates based on configurations provided in the `hooks.json` file.

# Configuration

In the `hooks.json` file, define hooks with the following structure:

```json
[
  {
    "id": "hook_id",
    "commandPath": "/var/www/apps/project/script/deploy.sh",
    "workingDirectory": "/var/www/apps/project"
  }
]
```

Hooks are verified at launch time, and only valid ones (with existing `id`, `commandPath`, and `workingDirectory`) are loaded.

# Environment Variables

Customize the behavior of the project by setting the following environment variables:

```env
PORT=5555 # Specify the port for the webhook server.
MAX_REQUEST_PER_WINDOWS=1 # Set the maximum number of requests allowed in a defined time window.
WINDOWS_SIZE_IN_MS=120000 # Define the size of the time window in milliseconds (2 * 60 * 1000).
```

# Getting Started

1. Clone the repository: git clone https://github.com/paulpascal/webhook_executor.git
2. Install dependencies: npm install
3. Set up the `hooks.json` file with your webhook configurations.
4. Customize environment variables if needed.
5. Start the server: `npm start`

# Contribution Guidelines

Contributions are welcome! Follow these steps:

1. Fork the project.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.

# License

This project is licensed under the Apache License.
