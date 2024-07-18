import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export default function LoaderSpinner() {
  return (
 <Box className="d-flex align-items-center justify-content-center">
    <CircularProgress/>
 </Box>
  )
}
