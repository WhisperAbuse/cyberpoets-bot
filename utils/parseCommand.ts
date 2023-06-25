export const parseCommand = (commandName: string) => {
  const command = `/${commandName}\\s*([\\s\\S]*)`;
  const regex = new RegExp(command);
  return regex;
};
