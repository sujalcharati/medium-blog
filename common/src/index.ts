import z from "zod";

export const signupInput =z.object({
    username: z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()

})

export type signupInput = z.infer< typeof signupInput>

export const signinInput =z.object({
    username: z.string().email(),
    password :z.string().min(6)
})
export type signinInput = z.infer< typeof signinInput>

export const createBlogInput = z.object({
    title :z.string(),
    content :z.string(),
})


export const UpdateBlogInput = z.object({
    title :z.string(),
    content :z.string(),
    id: z.number()
})

export type UpdateBlogInput = z.infer< typeof UpdateBlogInput >