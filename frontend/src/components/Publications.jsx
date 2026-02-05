import { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, Button, List, ListItem, Typography, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material'

const states = ['DRAFT','IN_REVIEW','APPROVED','PUBLISHED','REJECTED']

export default function Publications() {
  const [list, setList] = useState([])
  const [authors, setAuthors] = useState([])
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [error, setError] = useState('')
  const [selectedPublication, setSelectedPublication] = useState(null)

  const loadPublications = async () => {
    try {
      const res = await axios.get('http://localhost:8082/publications')
      setList(res.data)
      setError('')
    } catch (err) {
      setError('Error al cargar publicaciones: ' + err.message)
    }
  }

  const loadAuthors = async () => {
    try {
      const res = await axios.get('http://localhost:8081/authors')
      setAuthors(res.data)
    } catch (err) {
      setError('Error al cargar autores: ' + err.message)
    }
  }

  const create = async () => {
    if (!title || !authorId) {
      setError('Título y autor son requeridos')
      return
    }
    try {
      await axios.post('http://localhost:8082/publications', { title, authorId })
      setTitle('')
      setAuthorId('')
      loadPublications()
      setError('')
    } catch (err) {
      setError('Error al crear publicación: ' + err.message)
    }
  }

  const change = async (id, st) => {
    try {
      await axios.patch(`http://localhost:8082/publications/${id}/status?st=${st}`)
      loadPublications()
      setError('')
    } catch (err) {
      setError('Error al cambiar estado: ' + err.message)
    }
  }

  const getAuthorName = (id) => {
    const author = authors.find(a => a.id === id)
    return author ? author.name : 'Desconocido'
  }

  useEffect(() => {
    loadPublications()
    loadAuthors()
  }, [])

  return (
    <div>
      <Typography variant="h6">Publicaciones</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} fullWidth margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>Autor</InputLabel>
        <Select value={authorId} onChange={e => setAuthorId(e.target.value)} disabled={authors.length === 0}>
          {authors.map(a => (
            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
          ))}
        </Select>
        {authors.length === 0 && <Typography variant="body2" color="error">No hay autores disponibles. Crea un autor primero.</Typography>}
      </FormControl>
      <Button variant="contained" onClick={create} sx={{ mt: 2 }}>Crear</Button>
      <List>
        {list.map(p => (
          <ListItem key={p.id}>
            {p.title} (Autor: {getAuthorName(p.authorId)}) - {p.status}
            <Button size="small" onClick={() => setSelectedPublication(p)}>Ver Detalle</Button>
            {states.map(s => (
              <Button key={s} size="small" variant={p.status === s ? 'contained' : 'outlined'} onClick={() => change(p.id, s)}>{s}</Button>
            ))}
          </ListItem>
        ))}
      </List>
      {selectedPublication && (
        <Dialog open={!!selectedPublication} onClose={() => setSelectedPublication(null)}>
          <DialogTitle>Detalle de Publicación</DialogTitle>
          <DialogContent>
            <Typography><strong>Título:</strong> {selectedPublication.title}</Typography>
            <Typography><strong>Autor:</strong> {getAuthorName(selectedPublication.authorId)}</Typography>
            <Typography><strong>Email del Autor:</strong> {authors.find(a => a.id === selectedPublication.authorId)?.email || 'N/A'}</Typography>
            <Typography><strong>Estado:</strong> {selectedPublication.status}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedPublication(null)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
