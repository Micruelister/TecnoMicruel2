// La directiva 'use client' es específica de Next.js.
// Le dice a Next.js que este componente debe ejecutarse en el navegador (el cliente),
// no en el servidor. Esto es necesario porque usamos "hooks" de React (como useState)
// que requieren interacción del usuario y manipulación del estado en el navegador.
'use client';

// Importamos las herramientas que necesitamos de React y la librería axios.
import { useState, FormEvent } from 'react'; // `useState` para manejar el estado, `FormEvent` para tipar el evento del formulario.
import axios from 'axios'; // `axios` es una librería popular para hacer peticiones HTTP (llamar a nuestra API).

// Este es nuestro componente de React. Un componente es una pieza de UI reutilizable.
// En este caso, `RegisterPage` es un componente que renderiza toda la página de registro.
export default function RegisterPage() {
  // --- GESTIÓN DEL ESTADO ---
  // El "estado" (state) es la información que un componente necesita recordar entre renderizados.
  // Usamos el hook `useState` para crear "piezas de estado".
  // `useState` devuelve un array con dos elementos:
  // 1. El valor actual del estado (ej. `fullName`).
  // 2. Una función para actualizar ese estado (ej. `setFullName`).

  // Estado para cada campo del formulario.
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Estado para manejar la UI durante la comunicación con la API.
  const [error, setError] = useState<string | null>(null); // Para mostrar mensajes de error.
  const [success, setSuccess] = useState<string | null>(null); // Para mostrar un mensaje de éxito.
  const [isLoading, setIsLoading] = useState(false); // Para mostrar un estado de "cargando" y deshabilitar el botón.

  // --- MANEJADOR DEL ENVÍO DEL FORMULARIO ---
  // Esta función se ejecuta cuando el usuario hace clic en el botón "Create Account".
  // Es `async` porque la llamada a la API es una operación asíncrona.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario (que es recargar la página).

    // Reiniciamos el estado de la UI antes de empezar una nueva petición.
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Creamos el objeto con los datos del usuario, siguiendo la estructura que espera nuestra API (el CreateUserDto).
    const userData = {
      fullName,
      email,
      password,
      shippingAddress: {
        country,
        city,
        address,
        postalCode,
        phoneNumber,
      },
    };

    try {
      // --- LLAMADA A LA API ---
      // Leemos la URL de la API desde las variables de entorno.
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        // Si la URL no está configurada, mostramos un error y detenemos la ejecución.
        setError('API URL is not configured. Please contact support.');
        setIsLoading(false);
        return;
      }

      // Usamos `axios.post` para enviar los `userData` al endpoint de registro de nuestra API.
      // `await` pausa la ejecución hasta que la API nos dé una respuesta.
      const response = await axios.post(`${apiUrl}/auth/register`, userData);

      // Si la respuesta de la API tiene un estado 201 (Created), la operación fue un éxito.
      if (response.status === 201) {
        setSuccess('Registration successful! You can now log in.');
        // Limpiamos el formulario para que el usuario pueda registrar a otra persona si quisiera.
        setFullName('');
        setEmail('');
        setPassword('');
        setCountry('');
        setCity('');
        setAddress('');
        setPostalCode('');
        setPhoneNumber('');
      }
    } catch (err: any) {
      // Si `axios` lanza un error (ej. la API devuelve un 409 porque el email ya existe),
      // entramos en este bloque `catch`.
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      // El bloque `finally` se ejecuta siempre, tanto si hubo éxito como si hubo error.
      // Lo usamos para asegurarnos de que el estado de "cargando" se desactive.
      setIsLoading(false);
    }
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  // El `return` de un componente de React contiene el JSX (una sintaxis similar a HTML)
  // que se convertirá en el HTML real que se mostrará en el navegador.
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Create your Account</h1>

        {/* Asociamos nuestra función `handleSubmit` al evento `onSubmit` del formulario. */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Cada `input` está "controlado" por React. Esto significa que:
                  - Su `value` está ligado a una pieza de nuestro estado (ej. `value={fullName}`).
                  - Su evento `onChange` llama a la función que actualiza ese estado (ej. `onChange={(e) => setFullName(e.target.value)}`).
                  Esto asegura que el estado de React y lo que ve el usuario estén siempre sincronizados. */}
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="input-field"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password-register"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Password (min. 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Shipping Address</h2>
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="country" type="text" required className="input-field" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                <input name="city" type="text" required className="input-field" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <input name="address" type="text" required className="input-field" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="postalCode" type="text" required className="input-field" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                <input name="phoneNumber" type="tel" required className="input-field" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
          </div>

          <div>
            {/* El botón se deshabilita cuando `isLoading` es `true` para evitar envíos múltiples. */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          {/* Renderizado condicional: estos párrafos solo se muestran si `error` o `success` tienen un valor. */}
          {error && <p className="mt-2 text-sm text-center text-red-600 dark:text-red-400">{error}</p>}
          {success && <p className="mt-2 text-sm text-center text-green-600 dark:text-green-400">{success}</p>}
        </form>
      </div>
      {/* Usamos un bloque `<style jsx>` para añadir estilos CSS específicos a este componente. */}
      <style jsx>{`
        .input-field {
          position: relative;
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          color: #111827;
          background-color: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          transition: border-color 0.2s;
        }
        .dark .input-field {
          color: #e5e7eb;
          background-color: #374151;
          border-color: #4b5563;
        }
        .input-field:focus {
          outline: none;
          border-color: #4f46e5;
          --tw-ring-color: #4f46e5;
          box-shadow: 0 0 0 2px var(--tw-ring-color);
        }
      `}</style>
    </div>
  );
}