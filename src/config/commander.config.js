import { Command } from "commander";

const program = new Command();

program.option("-p <port>", "Puerto del servidor", 8080);
program.option("-pers <persistence>", "Modo de persistencia", "mongo")

program.parse();

export default program;