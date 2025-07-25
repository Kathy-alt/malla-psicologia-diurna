const ramos = [
  // Semestre 1
  { id: "historia", nombre: "Historia y Fundamentos de la Psicología", semestre: 1 },
  { id: "neuro", nombre: "Tópicos de Neurobiología", semestre: 1 },
  { id: "sociedad", nombre: "Psicología y Sociedad", semestre: 1 },
  { id: "ingles1", nombre: "Inglés I", semestre: 1 },
  { id: "eje1", nombre: "Eje Interdisciplinario I", semestre: 1 },

  // Semestre 2
  { id: "sistemas", nombre: "Sistemas Psicológicos", semestre: 2 },
  { id: "procesos", nombre: "Procesos Psicológicos y Neurociencias", semestre: 2 },
  { id: "epistemologia", nombre: "Psicología y Epistemología", semestre: 2 },
  { id: "ingles2", nombre: "Inglés II", semestre: 2, requisitos: ["ingles1"] },
  { id: "comunicacion", nombre: "Habilidades Comunicativas", semestre: 2 },

  // Semestre 3
  { id: "psico1", nombre: "Psicoanálisis I", semestre: 3, requisitos: ["sistemas"] },
  { id: "desarrollo1", nombre: "Psicología del Desarrollo I", semestre: 3 },
  { id: "inv1", nombre: "Investigación I", semestre: 3 },
  { id: "ingles3", nombre: "Inglés III", semestre: 3, requisitos: ["ingles2"] },
  { id: "tic", nombre: "Razonamiento Científico y TICs", semestre: 3 },

  // Semestre 4
  { id: "psico2", nombre: "Psicoanálisis II", semestre: 4, requisitos: ["psico1"] },
  { id: "desarrollo2", nombre: "Psicología del Desarrollo II", semestre: 4, requisitos: ["desarrollo1"] },
  { id: "inv2", nombre: "Investigación II", semestre: 4, requisitos: ["inv1"] },
  { id: "ingles4", nombre: "Inglés IV", semestre: 4, requisitos: ["ingles3"] },
  { id: "eje2", nombre: "Eje Interdisciplinario II", semestre: 4 },

  // Semestre 5
  { id: "diag1", nombre: "Psicodiagnóstico Clínico I", semestre: 5, requisitos: ["psico2"] },
  { id: "psicoPat1", nombre: "Psicopatología y Psiquiatría I", semestre: 5 },
  { id: "integracion", nombre: "Taller de Integración", semestre: 5, requisitos: ["inv2"] },
  { id: "social", nombre: "Psicología Social", semestre: 5 },
  { id: "eje3", nombre: "Eje Interdisciplinario III", semestre: 5 },

  // Semestre 6
  { id: "diag2", nombre: "Psicodiagnóstico Clínico II", semestre: 6, requisitos: ["diag1"] },
  { id: "psicoPat2", nombre: "Psicopatología y Psiquiatría II", semestre: 6, requisitos: ["psicoPat1"] },
  { id: "educacional", nombre: "Psicología Educacional", semestre: 6 },
  { id: "social2", nombre: "Diagnóstico e Intervención Social", semestre: 6, requisitos: ["social"] },
  { id: "organizaciones", nombre: "Psicología del Trabajo y las Organizaciones", semestre: 6 },

  // Semestre 7
  { id: "sistemica", nombre: "Clínica Sistémica", semestre: 7 },
  { id: "infanto1", nombre: "Psicopatología Infantojuvenil", semestre: 7 },
  { id: "educacional2", nombre: "Diagnóstico e Intervención Educacional", semestre: 7, requisitos: ["educacional"] },
  { id: "juridica", nombre: "Psicología Jurídica", semestre: 7 },
  { id: "org2", nombre: "Diagnóstico e Intervención Organizacional", semestre: 7, requisitos: ["organizaciones"] },

  // Semestre 8
  { id: "psicoanalitica", nombre: "Clínica Psicoanalítica", semestre: 8 },
  { id: "infanto2", nombre: "Clínica Infantojuvenil", semestre: 8, requisitos: ["infanto1"] },
  { id: "investigacion", nombre: "Integrador I: Taller de Investigación", semestre: 8 },
  { id: "juridica2", nombre: "Diagnóstico e Intervención Jurídica", semestre: 8, requisitos: ["juridica"] },
  { id: "sistemica2", nombre: "Intervención Clínica Sistémica", semestre: 8, requisitos: ["sistemica"] },

  // Semestre 9
  { id: "intervencion", nombre: "Taller de Intervención Clínica", semestre: 9 },
  { id: "salud", nombre: "Psicología y Salud", semestre: 9 },
  { id: "psicosocial", nombre: "Taller de Diagnóstico e Intervención Psicosocial", semestre: 9 },
  { id: "electivo1", nombre: "Electivo de Formación Profesional I", semestre: 9 },
  { id: "electivo2", nombre: "Electivo de Formación Profesional II", semestre: 9 },

  // Semestre 10
  { id: "practica", nombre: "Integrador II: Práctica Profesional", semestre: 10 }
];

const mallaContainer = document.getElementById("malla-container");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.classList.add("ramo");
  div.innerText = ramo.nombre;
  div.dataset.id = ramo.id;
  div.dataset.semestre = ramo.semestre;
  if (ramo.requisitos) div.dataset.requisitos = JSON.stringify(ramo.requisitos);
  if (ramo.requisitos) {
    div.classList.add("locked");
  }
  div.addEventListener("click", () => toggleAprobado(ramo.id));
  return div;
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  for (let semestre = 1; semestre <= 10; semestre++) {
    const semestreRamos = ramos.filter(r => r.semestre === semestre);
    semestreRamos.forEach(ramo => {
      const div = crearRamo(ramo);
      mallaContainer.appendChild(div);
    });
  }
}

function toggleAprobado(id) {
  const el = document.querySelector(`.ramo[data-id="${id}"]`);
  if (el.classList.contains("locked")) return;
  el.classList.toggle("approved");
  actualizarBloqueos();
}

function actualizarBloqueos() {
  ramos.forEach(ramo => {
    const el = document.querySelector(`.ramo[data-id="${ramo.id}"]`);
    if (!ramo.requisitos) {
      el.classList.remove("locked");
      return;
    }
    const requisitosAprobados = ramo.requisitos.every(req => {
      const elReq = document.querySelector(`.ramo[data-id="${req}"]`);
      return elReq && elReq.classList.contains("approved");
    });
    if (requisitosAprobados) {
      el.classList.remove("locked");
    } else {
      el.classList.add("locked");
    }
  });
}

renderMalla();
