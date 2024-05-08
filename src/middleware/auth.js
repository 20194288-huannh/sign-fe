// src/middleware/auth.js
export default function auth({ next, router }) {
    console.log(1)
    if (!localStorage.getItem('token')) {
        return router.push({ name: 'signIn' });
    }

    return next();
}