import { useState, useEffect } from 'react'
import apiClient from '../api/client'

export function useSubjects() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await apiClient.get('/subjects')
        setSubjects(response.data)
      } catch (err) {
        setError('Failed to fetch subjects')
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])

  return { subjects, loading, error }
}