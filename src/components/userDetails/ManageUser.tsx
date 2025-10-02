import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal.tsx'
import { attributes, defaultValues } from './model/user.ts'
import CommonInput from '../inputs/views/CommonInput.tsx'
import Button from '../inputs/views/Button.tsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/index.ts'
import { updateUser, createUser, fetchUsers } from '../../store/slices/userSlice.ts'

const ManageUser = (props: any) => {
    const { state, setState } = props;
    const [formData, setFormData] = useState(defaultValues)
    useEffect(() => {
        if (state.row) {
            setFormData(state.row)
        }
        else{
            setFormData(defaultValues)
        }
    }, [state.row])
    const dispatch = useDispatch<AppDispatch>()
    const save = async () => {
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
            <Modal title='Manage User' onClose={() => setState({ ...state, isOpen: false })} isOpen={state.isOpen}>
                <div>
                    {attributes.map((attribute) => (
                        <CommonInput
                            key={attribute.name}
                            name={attribute.name}
                            type={attribute.type}
                            placeholder={attribute.placeholder}
                            value={formData[attribute.name]}
                            onChange={(e) => setFormData({ ...formData, [attribute.name]: e.target.value })} />
                    ))}
                    <div className='button-container'>
                        <Button variant='primary' size='small' onClick={save}>Save</Button>
                        <Button variant='secondary' size='small' onClick={() => setState({ ...state, isOpen: false })}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ManageUser
