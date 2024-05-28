// src/middleware/auth.js
export default function auth({ next, router }) {
    if (!localStorage.getItem('token')) {
        return router.push({ name: 'signIn' });
    }

    return next();
}