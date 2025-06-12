import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


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

const Connexion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Connexion réussie !", data);
    toast.success("Connexion réussie !");
    navigate('/dashboard');
  };

  return (
    <Container>
      <Title>Connexion</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Identifiant :</Label>
        <Input {...register("identifiant", { required: "Identifiant requis" })} />
        {errors.identifiant && <p style={{ color: "red" }}>{errors.identifiant.message}</p>}

        <Label>Mot de passe :</Label>
        <Input type="password" {...register("motDePasse", { required: "Mot de passe requis" })} />
        {errors.motDePasse && <p style={{ color: "red" }}>{errors.motDePasse.message}</p>}

        <Button type="submit">Se connecter</Button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Connexion;