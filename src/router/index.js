import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import { useApplicationStore } from '@/stores/application.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            // component: HomeView,
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/requests',
            name: 'Requests',
            component: () => import('../views/RequestsView.vue'),
            meta: { requiresAuth: true }
        },
       
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/LogoutView.vue'),
            meta: { requiresAuth: true }
        },{

            path: '/createrequest',
            name: 'createrequest',
            component: () => import('../views/CreateRequestView.vue'),
            meta: { requiresAuth: true }
        
        },
        {

            path: '/users',
            name: 'users',
            component: () => import('../views/UsersView.vue'),
            meta: { requiresAuth: true }
        
        },
        {

            path: '/edituser:id',
            name: 'edituser',
            component: () => import('../views/EditUserView.vue'),
            meta: { requiresAuth: true }
        
        }, {

            path: '/myrequests',
            name: 'myrequests',
            component: () => import('../views/myrequestsview.vue'),
            meta: { requiresAuth: true }
        
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignupRequest.vue'),

        }
    ]
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useApplicationStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !isAuthenticated) {
        console.log('user not authenticated. redirecting to /login');
        next('/login');
    } else {
        next();
    }
});

export default router;