import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal.tsx'
import { attributes, defaultValues } from './model/user.ts'
import CommonInput from '../inputs/views/CommonInput.tsx'
import Button from '../inputs/views/Button.tsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/index.ts'
import { updateUser, createUser, fetchUsers } from '../../store/slices/userSlice.ts'
import './styles/manageUser.scss'
import { toast } from 'react-toastify'
import { isValidEmail } from '../../utils/validationUtil.ts'
const ManageUser = (props: any) => {
    const { state, setState } = props;
    const [formData, setFormData] = useState(defaultValues)
    useEffect(() => {
        if (state.row) {
            setFormData(state.row)
        }
        else {
            setFormData(defaultValues)
        }
    }, [state.row])
    const dispatch = useDispatch<AppDispatch>()
    const validateForm = () => {
        if (formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.imageLink === '') {
            toast.error('Please fill all the fields')
            return false
        }
        else if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email')
            return false
        }
        return true
    }
    const save = async () => {
        if (!validateForm()) {
            return
        }
        if (state.isEdit) {
            dispatch(updateUser({ ...formData, id: state.row.id }))
        } else {
            await dispatch(createUser(formData))
            dispatch(fetchUsers())
        }
        setState({ ...state, isOpen: false })
        setFormData(defaultValues)
    }
    return (
        <div>
            <Modal title={`${state?.isEdit ? "Update User" : "Create User"}`} onClose={() => setState({ ...state, isOpen: false })} isOpen={state.isOpen}>
                <div className='manage-user-container'>
                    {attributes.map((attribute) => (
                        <div key={attribute.name}>
                            <div className='input-label'>
                                <label>{attribute.placeholder}</label>
                            </div>
                            <CommonInput
                                key={attribute.name}
                                name={attribute.name}
                                type={attribute.type}
                                placeholder={attribute.placeholder}
                                value={formData[attribute.name]}
                                onChange={(e) => setFormData({ ...formData, [attribute.name]: e.target.value })} />

                        </div>
                    ))}
                    <div className='button-container'>
                        <Button variant='primary' size='small' onClick={save}>{state?.isEdit ? "Update" : "Create"}</Button>
                        <Button variant='secondary' size='small' onClick={() => setState({ ...state, isOpen: false })}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageUser
