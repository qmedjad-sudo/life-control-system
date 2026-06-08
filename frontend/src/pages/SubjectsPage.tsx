import { useState, useEffect } from 'react'
import apiClient from '../api/client'

interface Subject {
  id: string
  name: string
  description?: string
  color?: string
}

export function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newSubject, setNewSubject] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await apiClient.get('/subjects')
      setSubjects(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch subjects')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubject.name.trim()) return

    try {
      const response = await apiClient.post('/subjects', newSubject)
      setSubjects([...subjects, response.data])
      setNewSubject({ name: '', description: '' })
    } catch (err) {
      setError('Failed to add subject')
      console.error(err)
    }
  }

  const handleDeleteSubject = async (id: string) => {
    try {
      await apiClient.delete(`/subjects/${id}`)
      setSubjects(subjects.filter((s) => s.id !== id))
    } catch (err) {
      setError('Failed to delete subject')
      console.error(err)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Subjects</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Subject Form */}
      <form
        onSubmit={handleAddSubject}
        className="bg-white rounded-lg shadow p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Subject name"
            value={newSubject.name}
            onChange={(e) =>
              setNewSubject({ ...newSubject, name: e.target.value })
            }
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={newSubject.description}
            onChange={(e) =>
              setNewSubject({ ...newSubject, description: e.target.value })
            }
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Subject
        </button>
      </form>

      {/* Subjects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.length === 0 ? (
          <p className="text-gray-500">No subjects yet. Add one to get started!</p>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{subject.name}</h3>
              {subject.description && (
                <p className="text-gray-600 text-sm mt-2">{subject.description}</p>
              )}
              <button
                onClick={() => handleDeleteSubject(subject.id)}
                className="mt-4 text-red-600 hover:text-red-800 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
