# Minimal LLM Chat Interface

A lightweight, fast-loading chat interface for interacting with LLM APIs. Built with HTML, Tailwind CSS, and Alpine.js.

## Features

- Clean, distraction-free UI
- Responsive design
- Real-time message updates
- Loading states for responses
- Error handling
- No build tools required

## Setup

1. Clone the repository:
```bash
git clone https://github.com/nyxze/fatui.git
cd fatui
```

2. Install dependencies (for development/testing):
```bash
npm install
```

3. Open `index.html` in your browser or serve it using a local server.

## Development

- Run tests:
```bash
npm test
```

- Watch mode for tests:
```bash
npm run test:watch
```

## Customizing the LLM API Endpoint

To connect to your LLM API:

1. Set your API endpoint in the UI
2. Ensure your API follows the OpenAI-compatible format
3. Add any necessary authentication headers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 