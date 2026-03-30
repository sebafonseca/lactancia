import React from "react";

const caseData = {
  status: "ACTIVE",
  goals: [
    { title: "Agarre correcto", status: "done" },
    { title: "Rutina de extraccion", status: "in_progress" }
  ],
  sessions: [
    { date: "2026-02-01", status: "completed", notes: "Mejoramos postura y agarre" },
    { date: "2026-02-15", status: "scheduled", notes: "Seguimiento" }
  ],
  tasks: [
    { title: "Ejercicios de postura", done: true },
    { title: "Registrar tomas", done: false }
  ]
};

export default function DashboardPage() {
  const completedGoals = caseData.goals.filter((g) => g.status === "done").length;

  return (
    <div className="container section">
      <h1>Mi caso</h1>
      <p>Estado general: <strong>{caseData.status}</strong></p>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <div className="card">
          <h3>Objetivos</h3>
          <div className="list">
            {caseData.goals.map((goal) => (
              <div key={goal.title} className="kpi">
                <strong>{goal.title}</strong>
                <span className="badge">{goal.status}</span>
              </div>
            ))}
          </div>
          <p>
            Progreso: {completedGoals}/{caseData.goals.length}
          </p>
        </div>
        <div className="card">
          <h3>Sesiones</h3>
          <div className="list">
            {caseData.sessions.map((session) => (
              <div key={session.date}>
                <strong>{session.date}</strong>
                <p>{session.notes}</p>
                <span className="badge">{session.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Tareas</h3>
          <div className="list">
            {caseData.tasks.map((task) => (
              <label key={task.title}>
                <input type="checkbox" checked={task.done} readOnly /> {task.title}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
