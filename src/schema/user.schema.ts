import {object, string, TypeOf} from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'password is required'
        }).min(6, 'password is too short - should be 6 chars minimum.'),
        confirmPassword: string({
            required_error: 'confirmPassword is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Invalid Email')
    }).refine((data) =>
        data.password === data.confirmPassword, {
            message: 'Passwords do not match!',
            path: ['confirmPassword'],
        }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,"body.confirmPassword">;