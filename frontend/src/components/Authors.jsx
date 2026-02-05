import { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField, Button, List, ListItem, Typography, Alert } from '@mui/material'

export default function Authors() {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const res = await axios.get('http://localhost:8081/authors')
      setAuthors(res.data)
      setError('')
    } catch (err) {
      setError('Error al cargar autores: ' + err.message)
    }
  }

  const create = async () => {
    if (!name || !email) {
      setError('Nombre y email son requeridos')
      return
    }
    try {
      await axios.post('http://localhost:8081/authors', { name, email })
      setName('')
      setEmail('')
      load()
      setError('')
    } catch (err) {
      setError('Error al crear autor: ' + err.message)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <Typography variant="h6">Autores</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Nombre" value={name} onChange={e => setName(e.target.value)} fullWidth margin="normal" />
      <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" onClick={create} sx={{ mt: 2 }}>Crear</Button>
      <List>
        {authors.map(a => (
          <ListItem key={a.id}>{a.name} - {a.email}</ListItem>
        ))}
      </List>
    </div>
  )
}
