import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

// Styled components
const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: #f7f7f7;
  border-radius: 10px;
  cursor: pointer;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;

  color: black;
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #2c3e50;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Inscription = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const motDePasse = watch("motDePasse");
  const confirmation = watch("confirmation");

  const onSubmit = (data) => {
    if (data.motDePasse !== data.confirmation) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    // Logique d'inscription à venir (API etc.)
    console.log("Inscription réussie !", data);
    toast.success("Inscription réussie !");
  };

  return (
    <Container>
      <Title>Créer un compte</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Identifiant :</Label>
        <Input
          {...register("identifiant", { required: "Identifiant requis" })}
        />
        {errors.identifiant && <ErrorText>{errors.identifiant.message}</ErrorText>}

        <Label>Courriel :</Label>
        <Input
          type="email"
          {...register("email", {
            required: "Courriel requis",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Adresse courriel invalide"
            }
          })}
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <Label>Mot de passe :</Label>
        <Input
          type="password"
          {...register("motDePasse", {
            required: "Mot de passe requis",
            minLength: {
              value: 6,
              message: "6 caractères minimum"
            }
          })}
        />
        {errors.motDePasse && <ErrorText>{errors.motDePasse.message}</ErrorText>}

        <Label>Confirmer le mot de passe :</Label>
        <Input
          type="password"
          {...register("confirmation", { required: "Confirmation requise" })}
        />
        {errors.confirmation && <ErrorText>{errors.confirmation.message}</ErrorText>}

        {/* Vérification en temps réel */}
        {confirmation && motDePasse !== confirmation && (
          <ErrorText>Les mots de passe ne correspondent pas</ErrorText>
        )}

        <Button type="submit">Créer un compte</Button>
      </form>

      <StyledLink to="/connexion">Déjà inscrit ? Connectez-vous ici</StyledLink>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Inscription;