import React, { createContext, useContext, useState, ReactNode } from 'react';
import Register from '../register/register';

interface UserContextProps {
	children: ReactNode;
}

interface UserContextType {
	loggedUser: boolean;
	setLoggedUser: React.Dispatch<React.SetStateAction<boolean>>;
	showButton: boolean;
	setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: UserContextProps) {
	const [loggedUser, setLoggedUser] = useState(false);
	const [showButton, setShowButton] = useState(false);

	return (
		<UserContext.Provider
			value={{ loggedUser, setLoggedUser, showButton, setShowButton }}
		>
			{loggedUser ? children : <Register />}
		</UserContext.Provider>
	);
}

export function useUserContext(): UserContextType {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error(
			'useUserContext must be used within a UserContextProvider'
		);
	}
	return context;
}
