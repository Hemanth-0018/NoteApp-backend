import express from "express"

import {

  getNotes,

  createNote,

  updateNote,

  deleteNote

} from "../controllers/noteController"

import protect from "../middleware/authMiddleware"

const router =
  express.Router()

/*
  GET NOTES
*/

router.get(
  "/",
  protect,
  getNotes
)

/*
  CREATE NOTE
*/

router.post(
  "/",
  protect,
  createNote
)

/*
  UPDATE NOTE
*/

router.put(
  "/:id",
  protect,
  updateNote
)

/*
  DELETE NOTE
*/

router.delete(
  "/:id",
  protect,
  deleteNote
)

export default router