import Role from "../models/Role"

export const Roles = async () => {

    try {
        const count = await Role.estimatedDocumentCount()
        if (count > 0) return
        const values = await Promise.all([
            new Role({ name: "User" }).save(),
            new Role({ name: "admin" }).save()
        ])

        console.log(values)
    } catch (error) {
        console.log(error)
    }

} 
