import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHover } from '../../contexts/HoverContext';
import { useAuth } from '../../contexts/AuthContext';

import {
    StyledNavbar,
    NavContainer,
    Brand,          // Brand est déjà un NavLink de motion
    BrandIcon,
    NavLinks,
    StyledNavLink,  // StyledNavLink est déjà un NavLink de motion
    MenuToggle,
    ToggleSpan,
    NotificationBadge,
    LogoutButton
} from './Navbar.styles';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setIsNavbarHovered } = useHover();
    const { token, logout, isAdmin } = useAuth(); // Assurez-vous d'importer isAdmin

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
                {/* MODIFIÉ : Retiré as={NavLink} car Brand est déjà stylisé comme motion(NavLink) */}
                <Brand to="/">
                    <BrandIcon>🍽️</BrandIcon>
                    <span>YouChef</span>
                </Brand>

                <MenuToggle onClick={toggleMenu} $isOpen={isOpen}>
                    <ToggleSpan />
                    <ToggleSpan />
                    <ToggleSpan />
                </MenuToggle>

                <NavLinks $isOpen={isOpen}>
                    <li>
                        {/* MODIFIÉ : Retiré as={NavLink} car StyledNavLink est déjà stylisé comme motion(NavLink) */}
                        <StyledNavLink
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
                        {/* MODIFIÉ : Retiré as={NavLink} */}
                        <StyledNavLink
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
                                {/* MODIFIÉ : Retiré as={NavLink} */}
                                <StyledNavLink
                                    to="/dashboard"
                                    $isActive={({ isActive }) => isActive}
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Dashboard</span>
                                </StyledNavLink>
                            </li>
                            {isAdmin && ( // Condition pour afficher le lien admin
                                <li>
                                    {/* MODIFIÉ : Retiré as={NavLink} */}
                                    <StyledNavLink
                                        to="/admin-dashboard"
                                        $isActive={({ isActive }) => isActive}
                                        onClick={() => setIsOpen(false)}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>Admin</span>
                                    </StyledNavLink>
                                </li>
                            )}
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
                                {/* MODIFIÉ : Retiré as={NavLink} */}
                                <StyledNavLink
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
                                {/* MODIFIÉ : Retiré as={NavLink} */}
                                <StyledNavLink
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