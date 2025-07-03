const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_E164_REGEX = /^\+[1-9]\d{5,13}$/;

const isValidEmail = (email: string): boolean => strictEmailRegex.test(email);

const isPhoneValid = (phoneNumber: string): boolean =>  PHONE_E164_REGEX.test(phoneNumber.replace(/ /g, ''));

export { isValidEmail, isPhoneValid };
