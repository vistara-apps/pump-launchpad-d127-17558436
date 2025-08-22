
'use client'

import { useState, useEffect } from 'react'
import { Project, Investor, ContributionCurrency } from '../types'
import { mockProjects, mockInvestors } from '../data/mockData'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [investors, setInvestors] = useState<Investor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects)
      setInvestors(mockInvestors)
      setLoading(false)
    }, 1000)
  }, [])

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.projectId === id)
  }

  const getProjectsByStatus = (status: Project['status']): Project[] => {
    return projects.filter(p => p.status === status)
  }

  const getInvestorsByProject = (projectId: string): Investor[] => {
    return investors.filter(i => i.projectId === projectId)
  }

  const createProject = async (projectData: Omit<Project, 'projectId' | 'currentFunds' | 'status'>): Promise<Project> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newProject: Project = {
      ...projectData,
      projectId: (projects.length + 1).toString(),
      currentFunds: 0,
      status: 'pending'
    }
    
    setProjects(prev => [...prev, newProject])
    return newProject
  }

  const contribute = async (
    projectId: string, 
    amount: number, 
    currency: ContributionCurrency,
    walletAddress: string
  ): Promise<void> => {
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Update project funding
    setProjects(prev => prev.map(p => 
      p.projectId === projectId 
        ? { ...p, currentFunds: p.currentFunds + amount }
        : p
    ))
    
    // Add investor record
    const newInvestor: Investor = {
      investorId: (investors.length + 1).toString(),
      projectId,
      walletAddress,
      contributionAmount: amount,
      contributionCurrency: currency,
      timestamp: new Date(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 8)}`
    }
    
    setInvestors(prev => [...prev, newInvestor])
  }

  return {
    projects,
    investors,
    loading,
    getProjectById,
    getProjectsByStatus,
    getInvestorsByProject,
    createProject,
    contribute
  }
}
