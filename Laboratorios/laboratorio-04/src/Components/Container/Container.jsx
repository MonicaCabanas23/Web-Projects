import React, {useState, useEffect} from "react";
import "./Container.css";
import FormContainer from "./FormContainer/FormContainer";
import CardContainer from "./CardContainer/CardContainer";

// Retornando el contenedor
const Container = () => {
    // Trabajando con notas, si se agrega una nueva nota, en esta primera inicialización de useState se rastreará dicha acción 
    const [note, setNote] = useState("");
    // En esta segunda incialización se utiliza para obtener todas las notas que hayan sido ccreadas
    const [notes, setNotes] = useState([]);
    // Para crear una alerta
    const [showAlert, setShowAlert] = useState(false);

    const addNote = (note) => {
        if (note.length < 1) {
            if (showAlert) {
                return;
            }
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 4000);
            return;
        }

        // Obtener notas del localStorage
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const noteObj = {
            id: Date.now(),
            note,
        };

        notes.push(noteObj);
        localStorage.setItem("notes", JSON.stringify(notes));

        setNotes(notes);
    };

    const deleteNote = (id) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const newNotes = notes.filter((note) => note.id !== id);

        localStorage.setItem("notes", JSON.stringify(newNotes));

        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id);
        });
    };

    const editNote = (id, note) => {
        const notes = JSON.parse(localStorage.getItem("notes") || []);
        const noteIndex = notes.findIndex((note) => note.id === id);

        notes.splice(noteIndex, 1, { id, note });

        localStorage.setItem("notes", JSON.stringify(notes));
        setNotes(notes);
    };

    // Inicialización del Hook useEffect 
    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(notes);
    }, [note]);

    return (
        <div className="container">
          <FormContainer onAddNote={addNote} />
          <CardContainer onNotes={notes} onDelete={deleteNote} onEdit={editNote} />
        </div>
    );
};

export default Container; 