// Este archivo define la "Entidad" User.
// En TypeORM (la librería que usamos para hablar con la base de datos), una entidad es una clase
// que se corresponde directamente con una tabla en la base de datos.
// Cada instancia de esta clase (cada objeto User) representará una fila en esa tabla.
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// El decorador @Entity('users') le dice a TypeORM que esta clase `User`
// debe ser mapeada a una tabla llamada 'users' en nuestra base de datos PostgreSQL.
@Entity('users')
export class User {
  // @PrimaryGeneratedColumn('uuid') define la columna 'id' como la clave primaria.
  // 'uuid' significa que se generará automáticamente un identificador único universal para cada nuevo usuario.
  // Es como el DNI único de cada usuario en la base de datos.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column(...) define una columna estándar en la tabla 'users'.
  // Aquí, 'fullName' será una columna de tipo 'varchar' (texto) con una longitud máxima de 255 caracteres.
  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  // Esta columna para el email también es un 'varchar', pero con una propiedad extra: `unique: true`.
  // Esto asegura que no puedan existir dos usuarios con el mismo correo electrónico en la base de datos.
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // La columna de la contraseña tiene una configuración de seguridad importante: `select: false`.
  // Esto significa que, por defecto, cuando hagamos una consulta para obtener datos de un usuario,
  // la contraseña NUNCA será incluida en el resultado. Es una medida de seguridad para evitar exponerla accidentalmente.
  @Column({ type: 'varchar', select: false })
  password?: string;

  // Esta columna es de tipo 'jsonb', un tipo especial de PostgreSQL para almacenar datos en formato JSON.
  // Es muy flexible y perfecto para guardar objetos complejos como una dirección.
  // `nullable: true` significa que este campo puede estar vacío (un usuario puede registrarse sin dirección de envío).
  @Column({
    type: 'jsonb',
    nullable: true,
  })
  shippingAddress: {
    country: string;
    city: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
  };

  // @CreateDateColumn es un decorador especial de TypeORM.
  // Automáticamente establecerá la fecha y hora actuales cuando se cree un nuevo usuario.
  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn es similar, pero automáticamente actualizará la fecha y hora
  // cada vez que se modifique un registro de usuario existente.
  @UpdateDateColumn()
  updatedAt: Date;
}