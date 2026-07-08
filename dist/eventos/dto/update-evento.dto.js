"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_evento_dto_1 = require("./create-evento.dto");
class UpdateEventoDto extends (0, mapped_types_1.PartialType)(create_evento_dto_1.CreateEventoDto) {
}
exports.UpdateEventoDto = UpdateEventoDto;
//# sourceMappingURL=update-evento.dto.js.map