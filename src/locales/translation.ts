// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        usernameLabel: 'username',
        passwordLabel: 'password',
        nameLabel: 'name',
        surnameLabel: 'surname',
        phoneLabel: 'phone',
        usernamePlaceholder: 'Enter your username',
        passwordPlaceholder: 'Enter your password',
        confirmPasswordPlaceholder: 'Confirm your password',
        namePlaceholder: 'Enter your name',
        surnamePlaceholder: 'Enter your surname',
        phonePlaceholder: 'Enter your phone number',
        register: 'Register',
        back: 'Back',
        submit: 'Submit',
        login: 'Log in',
        registrationSuccess: 'Registration successful! You can now log in.',
        passwordsDoNotMatch: 'Error: Passwords do not match.',
        usernameExists: 'Error: User already exists.',
        wrongCredentials: 'Error: Wrong username or password.',
        loggedInSuccessfully: 'Logged in successfully!',
        pleaseInput: 'Please input your',
        pleaseConfirm: 'Please confirm your',
        pleaseEnterValidPhone: 'Please enter a valid phone number!',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;