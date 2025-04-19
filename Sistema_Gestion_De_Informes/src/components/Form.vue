<template>
  <div class="form-container">
    <h1>FORMULARIO GESTIÓN DE INCIDENCIAS</h1>
    <form @submit.prevent="manejarEnvioFormulario">
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" v-model="form.date" />

      <label for="lugar">Lugar:</label>
      <input type="text" id="lugar" v-model="form.place" placeholder="Ej: Recepción, Piscina..." />

      <label for="titulo">Título:</label>
      <input type="text" id="titulo" v-model="form.title" placeholder="Ej: Fuga de agua" />

      <label for="tipo">Tipo de incidencia:</label>
      <select id="tipo" v-model="form.type">
        <option disabled value="">Selecciona un tipo</option>
        <option value="atencion_al_cliente">Atención al cliente</option>
        <option value="fallo_tecnico">Fallo técnico</option>
        <option value="limpieza">Limpieza</option>
        <option value="seguridad">Seguridad</option>
        <option value="comunicaciones">Comunicaciones</option>
        <option value="actividades_canceladas">Actividades canceladas</option>
      </select>

      <label for="descripcion">Descripción:</label>
      <textarea id="descripcion" v-model="form.description" rows="4" placeholder="Describe la incidencia..."></textarea>

      <label for="imagen">Imagen:</label>
      <input type="file" id="imagen" @change="handleImage" />

      <button type="submit">Enviar incidencia</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        date: '',
        place: '',
        title: '',
        type: '',
        description: '',
        image: null,
      },
    };
  },
  methods: {
    handleImage(event) {
      this.form.image = event.target.files[0];
    },
    async manejarEnvioFormulario() {
      const protoIncidencia = { ...this.form };

      // 🔽 Acciones según el tipo (esto está perfecto, lo mantenemos)
      switch (protoIncidencia.type) {
        case "atencion_al_cliente":
          console.log("Incidencia de atención al cliente registrada");
          break;
        case "fallo_tecnico":
          console.log("Enviar notificación al equipo técnico");
          break;
        case "limpieza":
          if (protoIncidencia.image) {
            console.log("Imagen adjunta:", protoIncidencia.image.name);
          }
          break;
        case "seguridad":
          console.log("Incidencia de seguridad, marcar como prioridad alta");
          break;
        case "comunicaciones":
          console.log("Registrar y enviar al departamento de IT");
          break;
        case "actividades_canceladas":
          console.log("Notificar al equipo de animación");
          break;
      }

      // ✅ Aquí sí armamos el FormData para enviarlo al CMS
      const formData = new FormData();
      formData.append('data', JSON.stringify({
        fecha: this.form.date,
        lugar: this.form.place,
        titulo: this.form.title,
        tipo: this.form.type,
        descripcion: this.form.description,
      }));

      if (this.form.image) {
        formData.append('files.imagen', this.form.image);
      }

      try {
        const response = await axios.post('http://localhost:1337/api/incidencias', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Incidencia enviada:', response.data);
        alert("Incidencia enviada correctamente ✅");
        // Opcional: resetear formulario
        this.form = {
          date: '',
          place: '',
          title: '',
          type: '',
          description: '',
          image: null,
        };
      } catch (error) {
        console.error("Error al enviar incidencia:", error);
        alert("Ocurrió un error al enviar la incidencia ❌");
      }
    },
  },
};
</script>


<style scoped>
  .form-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #2c3e50;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

label {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.25rem;
}

input,
select,
textarea {
  padding: 0.9rem 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #fdfdfd;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  outline: none;
}

input[type="file"] {
  padding: 0.4rem;
}

button {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #3498db;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s ease-in-out;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

</style>