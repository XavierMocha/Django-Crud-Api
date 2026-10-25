export type TransactionType = 'income' | 'expense'

export type CategoryId =
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'housing'
  | 'food'
  | 'transport'
  | 'utilities'
  | 'health'
  | 'entertainment'
  | 'shopping'
  | 'other'

export interface Category {
  id: CategoryId
  label: string
  type: TransactionType | 'both'
  color: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  category: CategoryId
  date: string
  account: string
}

export interface Budget {
  category: CategoryId
  limit: number
}

export interface Account {
  id: string
  name: string
  balance: number
  type: 'checking' | 'savings' | 'cash'
}
