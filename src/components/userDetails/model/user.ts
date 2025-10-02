export const attributes = [
    {
        name: 'firstName',
        type: 'text',
        placeholder: 'First Name',
    },
    {
        name: 'lastName',
        type: 'text',
        placeholder: 'Last Name',
    },
    {
        name: 'email',
        type: 'text',
        placeholder: 'Email',
    },
    {
        name: 'imageLink',
        type: 'text',
        placeholder: 'Image Link',
    }
]

export const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    imageLink: '',
}

export const columns = [
    { id: 'imageLink', header: 'Profile', key: 'imageLink' },
    { id: 'email', header: 'Email', key: 'email' },
    { id: 'firstName', header: 'First Name', key: 'firstName' },
    { id: 'lastName', header: 'Last Name', key: 'lastName' },
    { id: 'actions', header: 'Action', key: 'actions' },
]