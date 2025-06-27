import React, { useState } from "react"; // ✅ Import de useState
import { useAuth } from "../contexts/AuthContext";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify"; // ✅ Import de toast pour les notifications

const RecetteForm = () => {
  const { token } = useAuth();
  const [nom, setNom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/recettes",
        { nom },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Recette ajoutée !");
    } catch (err) {
      toast.error("Erreur lors de l'ajout");
      console.error(err); // 🔍 Optionnel : utile pour le debug
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={nom} onChange={(e) => setNom(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default RecetteForm;