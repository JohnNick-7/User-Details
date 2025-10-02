import React, { ChangeEvent, useState } from "react"
import CommonInput from "../inputs/views/CommonInput.tsx"
import Password from "../inputs/views/Password.tsx"
import { formData } from "../types/commonTypes"
import Button from "../inputs/views/Button.tsx"
import './styles/login.scss'
import { useAuth } from "./useAuth.ts"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formData>({
        username: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleLogin = async (e: React.FormEvent) => {
        if (formData.username === '' || formData.password === '') {
            toast.error('Please fill all the fields')
            return
        }
        e.preventDefault();
        const success = await login(formData.username, formData.password);
        if (success) {
            toast.success('Login successful')
            navigate("/app/user-details")
        } else {
            toast.error('Username or password is incorrect')
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-section">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Please sign in to your account</p>
                </div>
                <form className="login-form" >
                    <div className="form-group">
                        <CommonInput
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            fullWidth
                        />
                        <Password
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            fullWidth
                        />
                    </div>
                    <div className="login-button">
                        <Button
                            onClick={handleLogin}
                            variant="primary"
                            size="small"
                            fullWidth
                        >
                            Sign In
                        </Button>
                    </div>
                    <a href="/login" className="forgot-password">Forgot Password?</a>
                </form>
            </div >
        </div >
    )
}

export default Login
