// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHover } from '../../contexts/HoverContext';
import { useAuth } from '../../contexts/AuthContext';

import {
    StyledNavbar,
    NavContainer,
    Brand,
    BrandIcon,
    NavLinks,
    StyledNavLink,
    MenuToggle,
    ToggleSpan,
    NotificationBadge,
    LogoutButton
} from './Navbar.styles';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setIsNavbarHovered } = useHover();
    const { token, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <StyledNavbar
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
            <NavContainer $isOpen={isOpen}>
                {/* MODIFICATION ICI : On englobe tout le contenu de Brand avec Brand */}
                <Brand as={NavLink} to="/"> 
                    <BrandIcon>🍽️</BrandIcon>
                    <span>Mon Carnet de Recettes</span> {/* Ajout d'un <span> pour englober le texte */}
                </Brand>

                <MenuToggle onClick={toggleMenu} $isOpen={isOpen}>
                    <ToggleSpan />
                    <ToggleSpan />
                    <ToggleSpan />
                </MenuToggle>

                <NavLinks $isOpen={isOpen}>
                    <li>
                        <StyledNavLink
                            as={NavLink}
                            to="/"
                            $isActive={({ isActive }) => isActive}
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Accueil</span>
                        </StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink
                            as={NavLink}
                            to="/recettes"
                            $isActive={({ isActive }) => isActive}
                            onClick={() => setIsOpen(false)}
                            $hasNotificationBadge={true}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>Recettes</span>
                            <NotificationBadge />
                        </StyledNavLink>
                    </li>
                    {token ? (
                        <>
                            <li>
                                <StyledNavLink
                                    as={NavLink}
                                    to="/dashboard"
                                    $isActive={({ isActive }) => isActive}
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Dashboard</span>
                                </StyledNavLink>
                            </li>
                            <li>
                                <LogoutButton
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Déconnexion</span>
                                </LogoutButton>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <StyledNavLink
                                    as={NavLink}
                                    to="/connexion"
                                    $isActive={({ isActive }) => isActive}
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Connexion</span>
                                </StyledNavLink>
                            </li>
                            <li>
                                <StyledNavLink
                                    as={NavLink}
                                    to="/inscription"
                                    $isActive={({ isActive }) => isActive}
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Inscription</span>
                                </StyledNavLink>
                            </li>
                        </>
                    )}
                </NavLinks>
            </NavContainer>
        </StyledNavbar>
    );
};

export default Navbar;