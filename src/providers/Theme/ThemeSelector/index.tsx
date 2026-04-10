'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState, useEffect } from 'react'

import type { Theme } from './types'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

type ThemeOption = Theme | 'auto'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState<ThemeOption>('light') // default light

  const onThemeChange = (themeToSet: ThemeOption) => {
    if (themeToSet === 'auto') {
      setTheme(null)
    } else {
      setTheme(themeToSet)
    }
    setValue(themeToSet)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const preference = window.localStorage.getItem(themeLocalStorageKey) as ThemeOption | null

    if (preference === 'auto') {
      setTheme(null)
      setValue('auto')
    } else if (preference === 'light' || preference === 'dark') {
      setTheme(preference)
      setValue(preference)
    } else {
      // No había preferencia guardada: fijamos y persistimos "light"
      setTheme('light')
      setValue('light')
      window.localStorage.setItem(themeLocalStorageKey, 'light')
    }
  }, [setTheme])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Tema de la interfaz"
        className="h-9 w-auto min-w-[7.5rem] gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm transition-colors hover:bg-muted/60 focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  )
}
