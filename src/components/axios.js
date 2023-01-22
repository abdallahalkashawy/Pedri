import axios from "axios"

export const api = axios.create({
    baseURL:'http://localhost:3000'
}) 

export const getcourses = async() => {
    const response = await api.get('/viewallcourse_price')
    return response.data
}