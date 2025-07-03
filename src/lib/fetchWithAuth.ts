import { getAuth } from 'firebase/auth';

const auth = getAuth();

const fetchWithAuth = async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not logged in');
    }

    const idToken = await user.getIdToken(false);

    const headers = new Headers(init.headers);
    headers.set('Authorization', `Bearer ${idToken}`);
    headers.set('Content-Type', 'application/json');

    return fetch(input, { ...init, headers });
};

export default fetchWithAuth;
