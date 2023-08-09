import React, { createContext, useContext, useState, ReactNode } from 'react';
import Register from '../register/register';
import DebtManagementForm from '../form/DebtManagementForm';
import LoginForm from '../form/LoginForm';

interface UserContextProps {
	children: ReactNode;
}

interface UserContextType {
	loggedUser: boolean;
	setLoggedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: UserContextProps) {
	const [loggedUser, setLoggedUser] = useState(false);

	return (
		<UserContext.Provider value={{ loggedUser, setLoggedUser }}>
			{children}
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
