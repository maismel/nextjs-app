export const validateForm = (email: string, password: string) => {
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password: string) => {
        return password.length >= 1;
    }
    return validateEmail(email) && validatePassword(password);
}
