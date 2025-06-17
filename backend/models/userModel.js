import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  // Identifiant unique de l'utilisateur
  identifiant: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Adresse email unique
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  // Mot de passe hashé (champ "password" obligatoire)
  password: {
    type: String,
    required: true,
  },
  // Rôle utilisateur (user/admin)
  role: {
    type: String,
    default: 'user',
  },
});

// Middleware Mongoose avant sauvegarde pour hasher le mot de passe
userSchema.pre('save', async function (next) {
  // Si le mot de passe n'est pas modifié, ne rien faire
  if (!this.isModified('password')) return next();

  try {
    // Générer un salt (sel)
    const salt = await bcrypt.genSalt(10);
    // Hasher le mot de passe avec le sel
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode d'instance pour comparer un mot de passe donné avec le hash en base
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;