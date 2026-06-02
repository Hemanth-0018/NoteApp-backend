import {
    Request,
    Response
} from "express"

import Note from "../models/Note"
import { JwtUser } from "../types/auth"

export const getNotes=
    async (
        req:Request,
        res:Response
    )=>{
        try{
            const user=req.user as JwtUser
            const notes=await Note.find({
                user:user.userId
            }).sort({
                createdAt:-1
            })
            res.status(200).json(notes)
        }
        catch(error){
            res.status(500).json({
                message:"Failed to fetch Notes"
            })
        }
    }
export const createNote= 
    async(
        req:Request,
        res:Response
    )=>{
        try{
            const user=req.user as JwtUser
            const {
                title,
                content
            }=req.body
            if(!title || !content){
                return res.status(400).json({
                    message:"Please fill all fields"
                })
            }
            const note=await Note.create({
                title,
                content,
                user:user.userId
            })
            res.status(201).json(note)
        }
        catch(error){
            res.status(500).json({
                message:"Failed to create note"
            })
        }
    }
export const updateNote=
        async(
            req:Request,
            res:Response
        )=>{
            try{
                const {
                    id
                }=req.params

                const {
                    title,
                    content
                }=req.body
                const user=req.user as JwtUser
                const updatedNote=await Note.findOneAndUpdate(
                    {_id:id,user:user.userId},
                    {
                        title,
                        content
                    },
                    {
                        new: true
                    }
                )
                if(!updatedNote){
                    return res.status(404).json({
                        message:
                            "Note not found"
                    })
                }

                res.status(200).json(
                    updatedNote
                )
            }
            catch(error){
                res.status(500).json({
                    message:
                    "Failed to update note"
                })
            }
        }

export const deleteNote= 
        async(
            req:Request,
            res:Response
        )=>{
            try{
                const {
                    id
                }=req.params
                const user=req.user as JwtUser
                const deletedNote= await Note.findOneAndDelete({_id: id,user:user.userId})
                if(!deletedNote){
                    res.status(404).json({
                    message:
                    "Note not found"
                })
                }
                res.status(200).json({
                    message:
                    "Note deleted"
                })
            }
            catch(error){
                console.log(error)
                res.status(500).json({
                    message:
                    "Failed to delete note"
                })
            }
        }
