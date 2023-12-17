"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DocumentationController_1 = __importDefault(require("../controllers/DocumentationController"));
const api_url = process.env.API;
const documentationHandler = new DocumentationController_1.default();
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const welcomeMessage = `
    <h1>API CSR</h1>
    <p>Bienvenido a la documentación de la API CSR. Aquí se enumeran los endpoints disponibles:</p>

    <h2>Usuarios (Users):</h2>
    <ul>
      <li><strong>POST ${api_url}/users</strong>: Crear un nuevo usuario</li>
      <li><strong>GET ${api_url}/users</strong>: Obtener la lista de usuarios</li>
      <li><strong>GET ${api_url}/users/currentuser/:dni</strong>: Obtener información del usuario actual por DNI</li>
      <li><strong>GET ${api_url}/users/:dni</strong>: Obtener información de un usuario por DNI</li>
      <li><strong>PUT ${api_url}/users/:dni</strong>: Actualizar información de un usuario por DNI</li>
      <li><strong>POST ${api_url}/users/photoprofile/:dni</strong>: Actualizar la foto de perfil de un usuario por DNI</li>
      <li><strong>DELETE ${api_url}/users/:dni</strong>: Eliminar un usuario por DNI</li>
      <li><strong>POST ${api_url}/users/dependents</strong>: Crear un nuevo dependiente para un usuario</li>
      <li><strong>GET ${api_url}/users/:userdni/dependents</strong>: Obtener la lista de dependientes de un usuario por DNI</li>
      <li><strong>PUT ${api_url}/users/dependents/:dependentId</strong>: Actualizar información de un dependiente por ID</li>
      <li><strong>DELETE ${api_url}/users/dependents/:dependentId</strong>: Eliminar un dependiente por ID</li>
    </ul>

    <h2>Pacientes (Patients):</h2>
    <ul>
      <li><strong>GET ${api_url}/patients/searchbydni/:dni</strong>: Buscar paciente por DNI</li>
      <li><strong>POST ${api_url}/patients</strong>: Crear un nuevo paciente</li>
      <li><strong>GET ${api_url}/patients</strong>: Obtener la lista de pacientes</li>
    </ul>

    <h2>Accesos (Access):</h2>
    <ul>
      <li><strong>POST ${api_url}/access/:username</strong>: Crear acceso de usuario</li>
      <li><strong>POST ${api_url}/access</strong>: Iniciar sesión de usuario</li>
      <li><strong>GET ${api_url}/access</strong>: Obtener la lista de accesos</li>
      <li><strong>GET ${api_url}/access/:username</strong>: Obtener información de acceso por nombre de usuario</li>
      <li><strong>PUT ${api_url}/access/:username</strong>: Actualizar información de acceso por nombre de usuario</li>
      <li><strong>PUT ${api_url}/access/accessId/:accessId</strong>: Actualizar información de acceso por ID</li>
    </ul>

    <h2>Colaboradores (Collaborators):</h2>
    <ul>
      <li><strong>POST ${api_url}/collaborators</strong>: Crear un nuevo colaborador</li>
      <li><strong>GET ${api_url}/collaborators</strong>: Obtener la lista de colaboradores</li>
      <li><strong>GET ${api_url}/collaborators/:dni</strong>: Obtener información de un colaborador por DNI</li>
      <li><strong>PUT ${api_url}/collaborators/:dni</strong>: Actualizar información de un colaborador por DNI</li>
      <li><strong>DELETE ${api_url}/collaborators/:dni</strong>: Eliminar un colaborador por DNI</li>
    </ul>

    <h2>InfoDoctors:</h2>
    <ul>
      <li><strong>GET ${api_url}/infodoctors</strong>: Obtener información de todos los doctores</li>
      <li><strong>GET ${api_url}/infodoctors/:cmp</strong>: Obtener información de un doctor por CMP</li>
    </ul>

    <h2>Doctores (Doctors):</h2>
    <ul>
      <li><strong>GET ${api_url}/doctors</strong>: Obtener la lista de doctores</li>
      <li><strong>PUT ${api_url}/doctors/:doctorId</strong>: Actualizar información de un doctor por ID</li>
      <li><strong>GET ${api_url}/doctors/:doctorId/schedule</strong>: Obtener el horario de un doctor por ID</li>
      <li><strong>POST ${api_url}/doctors/schedule</strong>: Crear el horario de un doctor</li>
      <li><strong>PUT ${api_url}/doctors/personalizedPrice/:personalizedPriceId</strong>: Actualizar precio personalizado de un doctor por ID</li>
    </ul>

    <h2>Citas (Appointment):</h2>
    <ul>
      <li><strong>POST ${api_url}/appointment</strong>: Crear una nueva cita</li>
      <li><strong>GET ${api_url}/appointment</strong>: Obtener la lista de citas</li>
      <li><strong>GET ${api_url}/appointment/:appointmentId</strong>: Obtener información de una cita por ID</li>
      <li><strong>GET ${api_url}/appointment/user/:userId</strong>: Obtener la lista de citas de un usuario por ID</li>
      <li><strong>DELETE ${api_url}/appointment/:appointmentId</strong>: Eliminar una cita por ID</li>
    </ul>

    <h2>Pagos (Payment):</h2>
    <ul>
      <li><strong>POST ${api_url}/payment</strong>: Crear un nuevo pago</li>
    </ul>
  `;
    res.send(welcomeMessage);
});
exports.default = router;
