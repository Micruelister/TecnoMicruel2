// Este archivo define el `AuthController`.
// En NestJS, un "Controlador" es el responsable de recibir las peticiones web entrantes
// y enviar las respuestas correspondientes. Actúa como un "guardia de tráfico" para la API.
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

// El decorador @Controller('auth') define un prefijo de ruta para todos los endpoints
// dentro de esta clase. Esto significa que todas las rutas aquí comenzarán con '/auth'.
// Por ejemplo: http://localhost:3001/auth/register
@Controller('auth')
export class AuthController {
  // Al igual que en el servicio, aquí usamos la Inyección de Dependencias para obtener
  // una instancia del AuthService. El controlador no sabe *cómo* se registra un usuario,
  // solo sabe que debe llamar al `authService` para que haga el trabajo.
  constructor(private readonly authService: AuthService) {}

  // @Post('register') define un endpoint que responde a peticiones HTTP de tipo POST.
  // La ruta completa será la combinación del prefijo del controlador y esta ruta: '/auth/register'.
  // Las peticiones POST se usan comúnmente para crear nuevos recursos (en este caso, un nuevo usuario).

  // @HttpCode(HttpStatus.CREATED) establece que, si la operación es exitosa, el código de estado
  // de la respuesta HTTP será 201 (Created), que es el estándar para la creación de recursos.
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  // El decorador @Body() le dice a NestJS que extraiga los datos del cuerpo (body) de la petición HTTP
  // y los convierta en una instancia de `CreateUserDto`.
  // NestJS también ejecutará automáticamente las validaciones que definimos en `CreateUserDto`.
  // Si los datos no son válidos, la petición ni siquiera llegará a este método.
  register(@Body() createUserDto: CreateUserDto) {
    // El controlador delega toda la lógica de negocio al servicio.
    // Simplemente llama al método `register` del `authService` y devuelve
    // lo que el servicio le retorne. Esto mantiene el controlador limpio y enfocado en su tarea.
    return this.authService.register(createUserDto);
  }
}