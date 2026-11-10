'use client'
import { useState } from 'react'
import Link from 'next/link'
import addData from '@/firebase/firestore/addData'
import useRequireAuth from './useRequireAuth'

import './styles.css'

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Formulario compartido para crear Mandalas y Mixtapes.
export default function CreatePostForm({ collection, label, basePath }) {
  const { user } = useRequireAuth()
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (!user) return null

  const handleForm = async (e) => {
    e.preventDefault()
    const form = e.target
    const slug = slugify(form.slug.value)
    if (!slug) {
      setStatus({ type: 'error', message: 'El slug no es válido.' })
      return
    }

    setSubmitting(true)
    const data = {
      title: form.title.value.trim(),
      content: form.content.value.replace(/\n/g, '<br />'),
      slug,
      storage_slug: form['storage-slug'].value.trim(),
    }
    const { error } = await addData(collection, data)
    setSubmitting(false)

    if (error) {
      setStatus({ type: 'error', message: `No se pudo crear: ${error.message}` })
      return
    }
    setStatus({
      type: 'ok',
      message: `${label} creado. Aparecerá en ${basePath}/${slug} en unos minutos.`,
    })
    form.reset()
  }

  return (
    <div className="container py-5">
      <form onSubmit={handleForm} className="admin-form">
        <h1>Crear {label}</h1>
        <p>Logged in as {user.email}</p>
        <label htmlFor="title">Title</label>
        <input className="form-control" type="text" id="title" name="title" required />
        <label htmlFor="content">Description</label>
        <textarea
          id="content"
          name="content"
          className="form-control"
          placeholder="write your content here"
          rows="5"
          cols="70"
          required
        ></textarea>
        <label htmlFor="slug">Slug for url</label>
        <input className="form-control" type="text" id="slug" name="slug" required />
        <label htmlFor="storage-slug">Slug for Storage link</label>
        <input className="form-control" type="text" id="storage-slug" name="storage-slug" required />
        {status && (
          <p role="status" className={status.type === 'error' ? 'text-danger' : 'text-success'}>
            {status.message}
          </p>
        )}
        <button className="btn btn-primary me-2" type="submit" disabled={submitting}>
          {submitting ? 'Creando…' : 'Create'}
        </button>
        <Link href="/admin" className="btn btn-secondary">Volver</Link>
      </form>
    </div>
  )
}
