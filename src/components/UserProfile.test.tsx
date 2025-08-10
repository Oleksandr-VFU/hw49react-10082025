import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import axios from 'axios';
import UserProfile from './UserProfile';

// Мокую AXIOS
vi.mock('axios');
const mockedAxios = axios as unknown as {
    get: ReturnType<typeof vi.fn>
};

beforeEach(() => {
    vi.clearAllMocks();
})

// Статичний контент, що описує дане завдання
describe('Статичний контент додатку', () => {
    it('відображається інформація про мету завдання', () => {
        mockedAxios.get = vi.fn().mockResolvedValue({
            data: {
                name: 'Chelsey Dietrich',
                email: 'Lucio_Hettinger@annie.ca',
                company: {name: 'Keebler LLC'}
            }
        });
        render(<UserProfile />)
        const staticContent = screen.getByText('Тестування асинхронної логіки React-компонентів з використанням Vitest та React Testing Library');
        expect(staticContent).toBeInTheDocument();
    })  
});

// Індикатор завантаження даних
describe('Індикатор завантаження', () => {
    it('відображається під час виконання запиту', () => {
        mockedAxios.get = vi.fn(() => new Promise(() => {}));
        render(<UserProfile />);
        expect(screen.getByText('Завантаження...')).toBeInTheDocument();
    })
});

// Успішне отримання даних
describe('Успішне отримання даних', () => {
    it('відображає ім\'я, email та назву компанії як результат успішного запиту', async () => {
        mockedAxios.get = vi.fn().mockResolvedValue({
            data: {
                name: 'Chelsey Dietrich',
                email: 'Lucio_Hettinger@annie.ca',
                company: {name: 'Keebler LLC'}
            }
        });
        render(<UserProfile />)
        await waitFor(() => {
            expect(screen.getByText('Ім\'я: Chelsey Dietrich')).toBeInTheDocument();
            expect(screen.getByText('Email: Lucio_Hettinger@annie.ca')).toBeInTheDocument();
            expect(screen.getByText('Компанія: Keebler LLC')).toBeInTheDocument();
        })
    })
});

// Обробка помилки
describe('Обробка помилки', () => {
    it('відображається повідомлення про помилку, при невдалому запиті', async () => {
        mockedAxios.get = vi.fn().mockRejectedValue(new Error('Network Error'));
        render(<UserProfile />)
        await waitFor(() => {
            expect(screen.getByText('Помилка: Network Error')).toBeInTheDocument();
        })
    })
});