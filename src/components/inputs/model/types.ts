import { ChangeEvent } from "react";

export interface InputProps {
    name: string,
    type?: string,
    placeholder?: string,
    formData: {
        [key: string]: any
    }
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}