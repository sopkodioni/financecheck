import { v4 as uuidv4 } from 'uuid';

export const asideItemsList = [
    {
        id: uuidv4(),
        title: 'Аналітика',
        path: '/dashboard',
        iconTitle: 'analytics',
        colorClassMod: `analyticsColor`, 
    },  
    {
        id: uuidv4(),
        title: 'Транзакції',
        path: '/dashboard',
        iconTitle: 'transactions',
        colorClassMod: `transactionsColor`, 
        submenuList: [
            {
                id: uuidv4(),
                title: 'Доходи',
                path: '/dashboard/incomes',
                iconTitle: 'transactions', // temp
                colorClassMod: `transactionsColor`, 
            },
            {
                id: uuidv4(),
                title: 'Витрати',
                path: '/dashboard/expencsive',
                iconTitle: 'transactions', // temp
                colorClassMod: `transactionsColor`, 
            },
        ]
    },
    {
        id: uuidv4(),
        title: 'Рахунки',
        path: '/dashboard/wallets',
        iconTitle: 'wallet',
        colorClassMod: `walletColor`, 
    },
]