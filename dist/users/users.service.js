"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const storage = require("../utils/cloud_storage");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    create(user) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }
    findAll() {
        return this.usersRepository.find({ relations: ['roles'] });
    }
    async update(id, user) {
        console.log('UPDATE DAT: ', user);
        const userFound = await this.usersRepository.findOneBy({ id: id });
        if (!userFound) {
            throw new common_1.HttpException('Usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedUser = Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);
    }
    async updateWithImage(file, id, user) {
        const url = await storage(file, file.originalname);
        console.log('URL: ' + url);
        if (url === undefined && url === null) {
            throw new common_1.HttpException('La imagen no se pudo guardar', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const userFound = await this.usersRepository.findOneBy({ id: id });
        if (!userFound) {
            throw new common_1.HttpException('Usuario no existe', common_1.HttpStatus.NOT_FOUND);
        }
        user.image = url;
        const updatedUser = Object.assign(userFound, user);
        return this.usersRepository.save(updatedUser);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map