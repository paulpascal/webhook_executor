const path = require('path');
const fs = require('fs');

const command = require('./core/command');
const { logger } = require('./core/logger');

const CONFIG_FILE_NAME = 'hooks.json';

/**
 * Setup all router base on hooks found on hooks config [hooks.json] file
 * @param {Express.Application} app Express application
 * @returns {boolean} - True if all set up
 */
const initializeRouter = (expressApp) => {
  logger.info('[ROUTER]: ⌛️ Router Initializing...');
  if (!hooksConfigExist()) return;

  const hookItems = getHookItems();

  for (const hookItem of hookItems) {
    if (!isHookItemValid(hookItem)) {
      console.log(isHookItemValid(hookItem))
      logger.info(`[ROUTER]: ⛔️ Hook with id=${hookItem?.id} is invalid => skipped`);
      continue;
    };

    const { id } = hookItem;

    expressApp.all(`/${id}`, async (req, res) => {
      // respond to origin server
      res.send(200);
      // handle hook
      command.handleHook(hookItem);
    });
  }

  logger.info(`[ROUTER]: ✅ Router Initializing completed with ${hookItems.length} hooks`);
}


/**
 * Check if hook item is valid (id + command path + workind dir exist)
 * @param {Object} The hook item to check
 * @returns {boolean} True if the hook is valid
 */
const isHookItemValid = (hookItem) => {
  if (!hookItem) return false;

  const { id, commandPath, workingDirectory } = hookItem;

  return id &&
    !!fs.existsSync(commandPath) &&
    !!fs.existsSync(workingDirectory);
};

/**
 * Load the hooks config file and return items
 * @returns {Array.<Object>} Array of hook item
 */
const getHookItems = () => {
  try {
    if (!hooksConfigExist) return [];
    const processDir = process.cwd();
    const configFilePath = path.join(processDir, CONFIG_FILE_NAME);
    const configFileContent = fs.readFileSync(configFilePath);
    return JSON.parse(configFileContent);
  } catch (error) {
    logger.error(error);
    return [];
  }
}

/**
 * Check if hooks config file exists and is a good json file
 * @returns {boolean} True if config file exist
 */
const hooksConfigExist = () => {
  try {
    const processDir = process.cwd();
    const hooksConfigFilePath = path.join(processDir, CONFIG_FILE_NAME);

    if (!fs.existsSync(hooksConfigFilePath)) {
      logger.error(`Hooks config file [${CONFIG_FILE_NAME}] not found.`);
      return false;
    }

    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}


module.exports = {
  initializeRouter
}