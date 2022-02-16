import React from 'react'

const storName = 'userData'

export const useAuth = () => {
    const [userId, setUserId] = React.useState(null)
    const [userName, setUserName] = React.useState(null)

    const login = React.useCallback((id, name) => {
        setUserId(id)
        setUserName(name)

        localStorage.setItem(storName, JSON.stringify({
            id: id, userName: name
        }))
    }, [])

    const logout = React.useCallback(() => {
        setUserId(null)

        localStorage.removeItem(storName)
    }, [])

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storName))

        if (data && data.id && data.userName) {
            login(data.id, data.userName)
        }
    }, [login])

    return { login, logout, userId, userName }
}

