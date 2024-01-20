const spawn = require('child_process').spawn;
const { logger } = require('./logger');

const handleHook = (hookItem) => {
  const { id, commandPath, workingDirectory } = hookItem;

  const st = Date.now();
  logger.info(`[COMMAND]: Start processing hook ${id}`);

  const hookCommand = spawn(
    'sh',
    [commandPath],
    { cwd: workingDirectory }
  );

  hookCommand.stdout.on('data', (data) => {
    const buff = new Buffer.from(data);
    logger.debug(buff.toString('utf-8'));
  });

  hookCommand.on('close', (code) => {
    if (code !== 0) {
      logger.error(`[COMMAND]: Hook Command process exited with code ${code}`);
    } else {
      const et = Date.now();
      logger.info(`[COMMAND]: Completed processing hook ${id}: ${et - st}ms`);
    }
  });
};

module.exports = {
  handleHook,
}