import app from './app.js';
import { connectToDb } from './src/db/connect.js';
import { fileURLToPath } from 'url';
import path from 'path';


/**
 * Code Standards for this project:
 * const is used where possible.
 * camelCase is used for all variables.
 * All functions should use arrow notation (const xxx = () -> {} ) explicit return ONLY where needed
 * Async/await is used rather than promises or callbacks
 * ESM export/import syntax is used.
 * 
 * Return JSON http codes after sending an Express response
 * route handlers are for routing, not processing or other logic
 * use consistent JSON error response shapes
 * give safe error msg's to clients, log full errors on server
 * use clear names for http and data concepts
 * validate that config values exist or crash safely
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
// the ? in process.env.NODE_ENV? safely calls toLowerCase() only if not null or undefinded. it is considered a safety feature for null-checks

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

if (!PORT) {
    throw new Error('PORT is not defined. Make sure your local npm scripts reference the .env file with --env-file=.env, or define PORT in your hosted environment settings.');
}

/**
  * Configure Express middleware
  */

///////////////////////////////////////////
//         Developer-Mode setup          //
///////////////////////////////////////////

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});


///////////////////////////////////////////
//            Server-Start               //
///////////////////////////////////////////
const startServer = async() => {

    try {
      connectToDb();

      app.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
      console.log(`Environment: ${NODE_ENV}`);
    });

      } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    }
  };

await startServer();
