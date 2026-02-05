import { Container, Typography, Divider, ThemeProvider, createTheme } from '@mui/material'
import Authors from './components/Authors'
import Publications from './components/Publications'

const theme = createTheme()

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Editorial Digital
        </Typography>
        <Authors />
        <Divider sx={{ my: 4 }} />
        <Publications />
      </Container>
    </ThemeProvider>
  )
}
