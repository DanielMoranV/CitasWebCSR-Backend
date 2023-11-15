"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Iniciar el servidor HTTP (Express)
            app_1.server.listen(app_1.app.get("port"), () => {
                console.log(`Server init at http://localhost:${app_1.app.get("port")} `);
            });
        }
        catch (error) {
            console.log("Unable to connect to the database");
        }
    });
}
main();
