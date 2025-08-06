import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Code, Search, Terminal, Zap, Filter } from 'lucide-react'
import problemsData from './problems.json'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get unique categories
  const categories = ['All', ...new Set(problemsData.map(problem => problem.category))]

  const filteredProblems = problemsData.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || problem.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-8 w-8 text-purple-400" />
                  <h1 className="text-3xl font-bold text-white">Esprit Decode</h1>
                </div>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Programming Problems
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Code className="h-5 w-5 text-purple-400" />
                <span>{problemsData.length} Problems</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {!selectedProblem ? (
            <>
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Programming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Problems</span>
                </h2>
              </div>

              {/* Search and Filter */}
              <div className="max-w-4xl mx-auto mb-8 space-y-4">
                {/* Search */}
                <div className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search problems..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex items-center justify-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category
                            ? 'bg-purple-500 text-black hover:bg-purple-600'
                            : 'bg-white/10 text-black hover:bg-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Problems Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProblems.map((problem) => (
                  <Card 
                    key={problem.id} 
                    className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg mb-2">
                            {problem.id}. {problem.title}
                          </CardTitle>
                        </div>
                        <Zap className="h-5 w-5 text-purple-400 flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 line-clamp-3">
                        {problem.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No problems found</h3>
                  <p className="text-gray-400">Try adjusting your search terms or category filter</p>
                </div>
              )}
            </>
          ) : (
            /* Problem Detail View */
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedProblem(null)}
                className="mb-6 text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-2"
              >
                <span>← Back to Problems</span>
              </button>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl mb-2">
                        {selectedProblem.id}. {selectedProblem.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-3">Problem Description</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{selectedProblem.description}</p>
                  </div>

                  {/* Code Snippet (for Decode, Intermediate Algorithms and Fuzzy Logic) */}
                  {selectedProblem.code_snippet && (
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">Code</h3>
                      <div className="bg-black/40 p-4 rounded-lg border border-white/10 overflow-x-auto">
                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                          <code>{selectedProblem.code_snippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Examples */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-3">Examples</h3>
                    <div className="space-y-4">
                      {selectedProblem.examples.map((example, index) => (
                        <div key={index} className="bg-black/20 p-4 rounded-lg border border-white/10">
                          <h4 className="text-purple-400 font-semibold mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-400 font-medium">Input: </span>
                              <code className="text-green-400 font-mono">{example.input}</code>
                            </div>
                            <div>
                              <span className="text-gray-400 font-medium">Output: </span>
                              <code className="text-blue-400 font-mono">{example.output}</code>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-3">Constraints</h3>
                    <div className="bg-black/20 p-4 rounded-lg border border-white/10">
                      <ul className="text-gray-300 space-y-1">
                        {selectedProblem.constraints.map((constraint, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            <code className="font-mono text-sm">{constraint}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-400">
              <p>Esprit Decode - Programming Problems Collection</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

