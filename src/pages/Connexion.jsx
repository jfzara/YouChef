import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from "../contexts/AuthContext";
import axios from "../api/axiosInstance"; // ✅ Assure-toi que ce fichier existe et est bien configuré

// 💅 STYLED COMPONENTS
const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: #f7f7f7;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

// ✅ COMPOSANT PRINCIPAL
const Connexion = () => {
  const { register, handleSubmit } = useForm(); // 👈 utilisé pour les inputs
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/users/login", data);
      login(response.data.token); // Authentifie l’utilisateur
      toast.success("Connexion réussie !");
      navigate("/dashboard");
    } catch  {
      toast.error("Erreur à la connexion");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Connexion</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email</Label>
          <Input type="email" {...register("email")} required />

          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" {...register("password")} required />

          <Button type="submit">Se connecter</Button>
        </form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Connexion;