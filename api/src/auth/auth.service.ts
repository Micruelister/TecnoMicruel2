// Este archivo define el `AuthService`.
// En NestJS, un "Servicio" es una clase que se encarga de la lógica de negocio.
// Su trabajo es realizar operaciones complejas, cálculos, o interactuar con la base de datos
// (a través de otros servicios o repositorios), manteniendo el "Controlador" limpio y simple.
import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Importamos la librería bcrypt para hashear contraseñas.
import { User } from '../users/entities/user.entity';

// El decorador @Injectable() marca esta clase para que NestJS pueda gestionarla e "inyectarla"
// en otras partes de la aplicación, como en el AuthController.
@Injectable()
export class AuthService {
  // El `constructor` es donde se realiza la "Inyección de Dependencias".
  // En lugar de crear una instancia de UsersService aquí (con `new UsersService()`),
  // NestJS nos la proporciona automáticamente. Esto hace que el código sea más modular y fácil de probar.
  // Ahora, `this.usersService` está disponible en toda la clase para interactuar con los usuarios.
  constructor(private readonly usersService: UsersService) {}

  // Esta es la función principal para registrar un nuevo usuario. Es `async` porque
  // las operaciones de base de datos y el hasheo de contraseñas toman tiempo.
  async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // --- PASO 1: Comprobar si el usuario ya existe ---
    // Antes de crear un nuevo usuario, usamos el `usersService` para buscar en la base de datos
    // si ya existe alguien con el mismo correo electrónico.
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);

    // Si encontramos un usuario, lanzamos una excepción `ConflictException`.
    // NestJS convertirá esto en una respuesta HTTP 409 (Conflicto), informando al cliente
    // que el email ya está en uso.
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // --- PASO 2: Hashear la contraseña ---
    // ¡NUNCA guardamos contraseñas en texto plano! Es una práctica de seguridad terrible.
    // Usamos `bcrypt.hash` para convertir la contraseña en un "hash" ilegible.
    // El segundo argumento, `saltRounds` (10), controla la complejidad del hasheo.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // --- PASO 3: Crear el nuevo usuario ---
    // Ahora que la contraseña es segura, llamamos al `usersService.create`.
    // Le pasamos todos los datos del DTO, pero sobreescribimos la contraseña
    // con nuestra nueva contraseña hasheada.
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // --- PASO 4: Devolver el usuario sin la contraseña ---
    // Por seguridad, aunque la contraseña está hasheada y la columna no se selecciona por defecto,
    // aquí la eliminamos explícitamente del objeto que devolvemos al cliente.
    // Esto asegura que ninguna información sensible se filtre en la respuesta de la API.
    const { password, ...result } = newUser;
    return result;
  }
}